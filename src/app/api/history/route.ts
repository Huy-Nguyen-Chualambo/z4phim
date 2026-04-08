import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.watchHistory.findMany({
    where: { userId: session.user.id },
    orderBy: { lastWatchedAt: "desc" },
    take: 5,
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
  const lastEpisodeSlug = body?.lastEpisodeSlug ? String(body.lastEpisodeSlug) : null;
  const lastEpisodeName = body?.lastEpisodeName ? String(body.lastEpisodeName) : null;

  if (!movieSlug || !movieName) {
    return NextResponse.json({ error: "Thiếu thông tin phim." }, { status: 400 });
  }

  await prisma.watchHistory.upsert({
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
      lastEpisodeSlug,
      lastEpisodeName,
      lastWatchedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      movieSlug,
      movieName,
      thumbUrl,
      posterUrl,
      lastEpisodeSlug,
      lastEpisodeName,
      lastWatchedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
