import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.savedMovie.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const movieSlug = String(body?.movieSlug ?? "").trim();
  const movieName = String(body?.movieName ?? "").trim();
  const thumbUrl = body?.thumbUrl ? String(body.thumbUrl) : null;
  const posterUrl = body?.posterUrl ? String(body.posterUrl) : null;

  if (!movieSlug || !movieName) {
    return NextResponse.json({ error: "Thiếu thông tin phim." }, { status: 400 });
  }

  await prisma.savedMovie.upsert({
    where: {
      userId_movieSlug: {
        userId: session.user.id,
        movieSlug,
      },
    },
    update: {
      movieName,
      thumbUrl,
      posterUrl,
      updatedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      movieSlug,
      movieName,
      thumbUrl,
      posterUrl,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const movieSlug = String(body?.movieSlug ?? "").trim();

  if (!movieSlug) {
    return NextResponse.json({ error: "Thiếu movieSlug." }, { status: 400 });
  }

  await prisma.savedMovie.deleteMany({
    where: {
      userId: session.user.id,
      movieSlug,
    },
  });

  return NextResponse.json({ ok: true });
}
