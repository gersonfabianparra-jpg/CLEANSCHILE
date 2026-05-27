import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone: phone || null, service: service || null, message },
    });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const setting = await prisma.setting.findUnique({ where: { key: "contact_email" } });
      const toEmail = setting?.value || "nicolas@cleanschile.cl";
      const date = new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      await resend.emails.send({
        from: "CleanSchile <onboarding@resend.dev>",
        to: [toEmail],
        subject: `📩 Nueva consulta de ${name} — CleanSchile`,
        html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr><td style="background:#07071a;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#06B6D4;text-transform:uppercase;font-weight:600;">CleanSchile</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Nueva consulta recibida</h1>
          <p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">${date}</p>
        </td></tr>

        <!-- Client info -->
        <tr><td style="background:#0d0d24;padding:28px 40px;border-bottom:1px solid rgba(255,255,255,0.05);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:48px;vertical-align:top;">
                <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#06B6D4,#3B82F6);text-align:center;line-height:44px;font-size:16px;font-weight:700;color:#fff;">
                  ${name.charAt(0).toUpperCase()}
                </div>
              </td>
              <td style="padding-left:14px;vertical-align:top;">
                <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
                <p style="margin:3px 0 0;font-size:12px;color:rgba(255,255,255,0.35);">Cliente potencial</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Contact details -->
        <tr><td style="background:#0d0d24;padding:24px 40px;border-bottom:1px solid rgba(255,255,255,0.05);">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);width:100px;">
                <span style="font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;">Email</span>
              </td>
              <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <a href="mailto:${email}" style="font-size:14px;color:#06B6D4;text-decoration:none;">${email}</a>
              </td>
            </tr>
            ${phone ? `<tr>
              <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;">Teléfono</span>
              </td>
              <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <a href="tel:${phone}" style="font-size:14px;color:#06B6D4;text-decoration:none;">${phone}</a>
              </td>
            </tr>` : ""}
            ${service ? `<tr>
              <td style="padding:8px 0;">
                <span style="font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;">Servicio</span>
              </td>
              <td style="padding:8px 0;">
                <span style="display:inline-block;padding:3px 10px;border-radius:999px;background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.25);font-size:12px;color:#EAB308;font-weight:600;">${service}</span>
              </td>
            </tr>` : ""}
          </table>
        </td></tr>

        <!-- Message -->
        <tr><td style="background:#0d0d24;padding:24px 40px 32px;">
          <p style="margin:0 0 12px;font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;">Mensaje</p>
          <div style="background:#07071a;border-left:3px solid #06B6D4;border-radius:0 10px 10px 0;padding:18px 20px;">
            <p style="margin:0;font-size:15px;line-height:1.8;color:rgba(203,213,225,0.75);">${message}</p>
          </div>
        </td></tr>

        <!-- CTA buttons -->
        <tr><td style="background:#0d0d24;padding:0 40px 36px;text-align:center;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding-right:8px;">
                <a href="mailto:${email}?subject=Re: Consulta CleanSchile"
                  style="display:inline-block;padding:13px 24px;background:linear-gradient(135deg,#06B6D4,#3B82F6);color:#fff;text-decoration:none;border-radius:12px;font-size:13px;font-weight:600;">
                  Responder por email
                </a>
              </td>
              ${phone ? `<td>
                <a href="https://wa.me/${phone.replace(/\D/g, "")}"
                  style="display:inline-block;padding:13px 24px;background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.3);color:#25D366;text-decoration:none;border-radius:12px;font-size:13px;font-weight:600;">
                  WhatsApp
                </a>
              </td>` : ""}
            </tr>
          </table>
          <p style="margin:14px 0 0;font-size:11px;color:rgba(255,255,255,0.2);">También puedes ver este mensaje en el panel de admin.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#07071a;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">CleanSchile · La Cisterna, Santiago · <a href="https://cleanschile.vercel.app" style="color:rgba(255,255,255,0.3);text-decoration:none;">cleanschile.vercel.app</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
