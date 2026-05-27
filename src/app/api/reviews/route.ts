import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const all = url.searchParams.get("all") === "true";

    if (all) {
      const session = await getServerSession(authOptions);
      if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json(reviews);
    }

    const reviews = await prisma.review.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, rating, carModel, text, featured, published } = body;

    if (!name || !text) {
      return NextResponse.json({ error: "Nombre y texto son requeridos" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        rating: Number(rating) || 5,
        carModel: carModel || null,
        text,
        featured: Boolean(featured),
        published: published !== false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
