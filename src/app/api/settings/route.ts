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
  services: JSON.stringify([
    { title: "Pulido de Vehículos", desc: "Eliminamos micro-rayones, oxidación y contaminación de la pintura con técnicas profesionales de pulido. Restauramos el brillo original de tu carrocería.", price: "Desde $80.000" },
    { title: "Sellado Cerámico", desc: "Recubrimiento nanotecnológico con marcas Carpro, Koch Chemie y Sonax. Protección duradera contra UV, lluvia ácida y agentes químicos. Hidrofóbico extremo.", price: "Desde $160.000" },
    { title: "Full Interior", desc: "Limpieza profunda del habitáculo: tapizados, plásticos, cuero, moqueta y techo. Desinfección y acondicionamiento con productos Vonixx y AutoAmerica.", price: "Desde $70.000" },
    { title: "Servicio Pre-Venta", desc: "Preparación integral diseñada para maximizar el precio de venta de tu vehículo. Interior + exterior + descontaminación completa.", price: "Desde $120.000" },
    { title: "Mantención Automotriz", desc: "Cuidado preventivo y correctivo del motor con lubricantes y filtros de categoría profesional. Diagnóstico incluido.", price: "Desde $120.000" },
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
