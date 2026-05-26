import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// One-time admin creation. Returns 400 if admin already exists.
export async function POST() {
  try {
    const count = await prisma.admin.count();
    if (count > 0) {
      return NextResponse.json({ error: "Admin ya existe." }, { status: 400 });
    }
    const password = await bcrypt.hash("CleanSchile2025!", 12);
    await prisma.admin.create({
      data: { email: "nicolas@cleanschile.cl", password },
    });
    return NextResponse.json({ ok: true, email: "nicolas@cleanschile.cl", password: "CleanSchile2025!" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
