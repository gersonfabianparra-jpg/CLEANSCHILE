import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const DEMO_REVIEWS = [
  { name: "Carlos Muñoz", rating: 5, carModel: "Toyota Corolla 2021", text: "Increíble trabajo el sellado cerámico. Quedó como nuevo, el agua resbala sola y el brillo es espectacular. Nicolás es un profesional de verdad.", featured: true, published: true },
  { name: "Andrea Soto", rating: 5, carModel: "Hyundai Tucson 2020", text: "El pulido exterior dejó mi camioneta impecable. Eliminaron rayones que tenía hace años. Súper recomendado, atención de primera.", featured: true, published: true },
  { name: "Rodrigo Herrera", rating: 5, carModel: "Mazda 3 2019", text: "Hice el full interior y quedé maravillado. El interior huele a nuevo y está impecable. El precio es justo para la calidad que entregan.", featured: false, published: true },
  { name: "Valentina Lagos", rating: 5, carModel: "Honda Civic 2022", text: "Vendí mi auto 2 millones más caro gracias al servicio pre-venta. Inversión que se pagó sola. 100% recomendado.", featured: true, published: true },
  { name: "Felipe Contreras", rating: 4, carModel: "Volkswagen Golf 2018", text: "Muy buen trabajo en el mantenimiento automotriz. Diagnóstico completo y rápido. El auto quedó funcionando perfecto.", featured: false, published: true },
  { name: "Camila Reyes", rating: 5, carModel: "Kia Sportage 2023", text: "La cerámica quedó perfecta, el agua literalmente patina. Nicolás explicó cada paso del proceso. Fui con dudas y salí convencida totalmente.", featured: true, published: true },
  { name: "Matías Vega", rating: 5, carModel: "Subaru Forester 2020", text: "Tercera vez que llevo el auto y siempre quedo satisfecho. Puntualidad, limpieza y profesionalismo en todo momento. Mi taller de confianza.", featured: false, published: true },
];

export async function POST() {
  try {
    const password = await bcrypt.hash("CleanSchile2025!", 12);
    const existing = await prisma.admin.findFirst();
    if (existing) {
      await prisma.admin.update({ where: { id: existing.id }, data: { email: "nicolas@cleanschile.cl", password } });
    } else {
      await prisma.admin.create({ data: { email: "nicolas@cleanschile.cl", password } });
    }

    // Seed demo reviews if none exist
    const reviewCount = await prisma.review.count();
    let reviewsSeeded = 0;
    if (reviewCount === 0) {
      await prisma.review.createMany({ data: DEMO_REVIEWS });
      reviewsSeeded = DEMO_REVIEWS.length;
    }

    return NextResponse.json({ ok: true, email: "nicolas@cleanschile.cl", password: "CleanSchile2025!", reviewsSeeded });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
