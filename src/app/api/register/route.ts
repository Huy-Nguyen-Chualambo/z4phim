import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");
    const name = String(body?.name ?? "").trim();

    if (!email || !password) {
      return NextResponse.json({ error: "Email và mật khẩu là bắt buộc." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Mật khẩu phải có ít nhất 6 ký tự." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email đã được sử dụng." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Register API error:", error);

    const message = error instanceof Error ? error.message : String(error);
    if (message.toLowerCase().includes("tenant or user not found")) {
      return NextResponse.json(
        { error: "Cau hinh ket noi database chua dung (Tenant/User Supabase)." },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Không thể tạo tài khoản." }, { status: 500 });
  }
}
