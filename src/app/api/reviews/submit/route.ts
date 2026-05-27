import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, carModel, text } = body;

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: "Nombre y reseña son requeridos" }, { status: 400 });
    }

    const ratingNum = Math.min(5, Math.max(1, Number(rating) || 5));
    const stars = "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);

    await prisma.review.create({
      data: {
        name: name.trim(),
        rating: ratingNum,
        carModel: carModel?.trim() || null,
        text: text.trim(),
        featured: false,
        published: false,
      },
    });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const setting = await prisma.setting.findUnique({ where: { key: "review_email" } });
      const toEmail = setting?.value || "nicolas@cleanschile.cl";
      const nameTrimmed = name.trim();
      const textTrimmed = text.trim();
      const carTrimmed = carModel?.trim() || "";
      const date = new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      await resend.emails.send({
        from: "CleanSchile <onboarding@resend.dev>",
        to: [toEmail],
        subject: `⭐ Nueva reseña de ${nameTrimmed} — CleanSchile`,
        html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo / Header -->
        <tr><td style="background:#07071a;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#EAB308;text-transform:uppercase;font-weight:600;">CleanSchile</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Nueva reseña recibida</h1>
          <p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">${date}</p>
        </td></tr>

        <!-- Stars banner -->
        <tr><td style="background:linear-gradient(135deg,#1a1a3e,#0f0f2a);padding:20px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0;font-size:28px;letter-spacing:4px;color:#EAB308;">${stars}</p>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.35);">${ratingNum} de 5 estrellas</p>
        </td></tr>

        <!-- Author info -->
        <tr><td style="background:#0d0d24;padding:28px 40px;border-bottom:1px solid rgba(255,255,255,0.05);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:48px;vertical-align:top;">
                <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#8B5CF6);display:flex;align-items:center;justify-content:center;text-align:center;line-height:44px;font-size:16px;font-weight:700;color:#fff;">
                  ${nameTrimmed.charAt(0).toUpperCase()}
                </div>
              </td>
              <td style="padding-left:14px;vertical-align:top;">
                <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${nameTrimmed}</p>
                ${carTrimmed ? `<p style="margin:3px 0 0;font-size:12px;color:rgba(255,255,255,0.35);">🚗 ${carTrimmed}</p>` : ""}
                <p style="margin:4px 0 0;font-size:11px;color:rgba(74,222,128,0.7);font-weight:600;letter-spacing:0.05em;">✓ CLIENTE VERIFICADO</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Review text -->
        <tr><td style="background:#0d0d24;padding:0 40px 32px;">
          <div style="background:#07071a;border-left:3px solid #EAB308;border-radius:0 10px 10px 0;padding:20px 22px;">
            <p style="margin:0;font-size:15px;line-height:1.8;color:rgba(203,213,225,0.8);font-style:italic;">"${textTrimmed}"</p>
          </div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:#0d0d24;padding:0 40px 36px;text-align:center;">
          <a href="https://cleanschile.vercel.app/admin/resenas"
            style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);color:#ffffff;text-decoration:none;border-radius:12px;font-size:14px;font-weight:600;letter-spacing:0.02em;">
            Revisar y aprobar reseña →
          </a>
          <p style="margin:14px 0 0;font-size:11px;color:rgba(255,255,255,0.2);">La reseña quedará pendiente hasta que la apruebes.</p>
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

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
