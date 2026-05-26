import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Creates admin if none exists, or resets password if one does.
export async function POST() {
  try {
    const password = await bcrypt.hash("CleanSchile2025!", 12);
    const existing = await prisma.admin.findFirst();

    if (existing) {
      await prisma.admin.update({
        where: { id: existing.id },
        data: { email: "nicolas@cleanschile.cl", password },
      });
      return NextResponse.json({ ok: true, action: "updated", email: "nicolas@cleanschile.cl", password: "CleanSchile2025!" });
    }

    await prisma.admin.create({
      data: { email: "nicolas@cleanschile.cl", password },
    });
    return NextResponse.json({ ok: true, action: "created", email: "nicolas@cleanschile.cl", password: "CleanSchile2025!" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
