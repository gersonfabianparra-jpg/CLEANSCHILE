import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PLACE_ID = "ChIJG0ypt7DRYpYRxdDiJIs-Xqg";

export const revalidate = 3600;

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return NextResponse.json({ reviews: [], rating: 5, total: 0 });

  let count = 5;
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "google_reviews_count" } });
    if (setting) count = Math.min(5, Math.max(1, parseInt(setting.value) || 5));
  } catch {}

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=es&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (data.status !== "OK") return NextResponse.json({ reviews: [], rating: 5, total: 0 });

    const reviews = (data.result.reviews || []).slice(0, count).map((r: {
      author_name: string;
      profile_photo_url: string;
      rating: number;
      text: string;
      relative_time_description: string;
    }) => ({
      author:   r.author_name,
      photo:    r.profile_photo_url,
      rating:   r.rating,
      text:     r.text,
      time:     r.relative_time_description,
    }));

    return NextResponse.json({
      reviews,
      rating: data.result.rating,
      total:  data.result.user_ratings_total,
    });
  } catch {
    return NextResponse.json({ reviews: [], rating: 5, total: 0 });
  }
}
