import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DEFAULTS: Record<string, string> = {
  contact_email: "nicolas@cleanschile.cl",
  review_email: "nicolas@cleanschile.cl",
  site_phone: "+569 520 95 222",
  site_whatsapp: "56952095222",
  site_address: "Uruguay #530, La Cisterna, RM",
  site_email_public: "contacto@cleanschile.cl",
  hero_tagline: "Nanotecnología y precisión. Tu vehículo transformado al nivel que merece.",
  google_reviews_count: "5",
  services: JSON.stringify([
    { title: "Detallado Exterior",    desc: "Protegemos y devolvemos el brillo original a la carrocería. Descontaminamos la pintura, eliminamos micro-rayas y aplicamos selladores de alta calidad para un acabado espejo duradero.", price: "Desde $80.000" },
    { title: "Sellado Cerámico",      desc: "Máxima protección de nivel nanotecnológico contra agentes químicos, rayos UV y marcas de agua. Aporta un brillo profundo insuperable y propiedades hidrofóbicas extremas.", price: "Desde $160.000" },
    { title: "Detallado Interior",    desc: "Una renovación profunda y detallada del habitáculo. Desinfectamos, eliminamos manchas difíciles y acondicionamos plásticos, cuero y textiles con productos de grado profesional.", price: "Desde $70.000" },
    { title: "Pulido de Focos",       desc: "Recupera la transparencia, estética y seguridad de tu vehículo. Eliminamos el tono amarillento y opaco de los focos, restaurando la máxima capacidad de iluminación nocturna.", price: "Desde $35.000" },
    { title: "Tratamiento Pre-Venta", desc: "Preparamos tu vehículo de manera estratégica para destacar en el mercado. Un refresco estético completo diseñado para maximizar su valor comercial y acelerar la venta.", price: "Desde $120.000" },
    { title: "Mantención Automotriz", desc: "Cuidado preventivo y técnico para asegurar el rendimiento óptimo de tu motor. Servicios de mantenimiento express realizados con lubricantes y filtros de grado premium.", price: "Desde $120.000" },
  ]),
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body: Record<string, string> = await req.json();

  await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
