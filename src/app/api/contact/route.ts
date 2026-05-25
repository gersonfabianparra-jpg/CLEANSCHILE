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

    // Send email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "CleanSchile <noreply@cleanschile.cl>",
        to: ["contacto@cleanschile.cl"],
        subject: `Nueva consulta de ${name}`,
        html: `
          <h2>Nueva consulta en CleanSchile</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>
          <p><strong>Servicio:</strong> ${service || "No especificado"}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
