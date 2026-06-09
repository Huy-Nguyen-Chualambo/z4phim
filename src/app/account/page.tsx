import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type SavedMovieItem = {
  id: string;
  movieSlug: string;
  movieName: string;
  thumbUrl: string | null;
  posterUrl: string | null;
};

type WatchHistoryItem = {
  id: string;
  movieSlug: string;
  movieName: string;
  thumbUrl: string | null;
  posterUrl: string | null;
  lastEpisodeSlug: string | null;
  lastEpisodeName: string | null;
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="container" style={{ padding: "3rem 1rem" }}>
        <div className="glass" style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Bạn chưa đăng nhập</h1>
          <p style={{ color: "var(--text-muted)" }}>Vui lòng đăng nhập để xem phim đã lưu và lịch sử xem.</p>
          <Link href="/login" className="button-small" style={{ display: "inline-block", marginTop: "1rem" }}>
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  const [savedMovies, allHistory] = await Promise.all([
    prisma.savedMovie.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 50,
    }),
    prisma.watchHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { lastWatchedAt: "desc" },
    }),
  ]);

  const history = allHistory.slice(0, 5) as WatchHistoryItem[];
  const historyMap = new Map(allHistory.map(h => [h.movieSlug, h]));

  const savedMoviesWithHistory = savedMovies.map(item => {
    const hist = historyMap.get(item.movieSlug);
    return {
      ...item,
      lastEpisodeSlug: hist?.lastEpisodeSlug || null,
      lastEpisodeName: hist?.lastEpisodeName || null,
    };
  });

  return (
    <div className="container account-page-shell">
      <h1 className="account-title">Tài khoản của bạn</h1>
      <p className="account-subtitle">
        Đăng nhập bằng: <strong>{session.user.email}</strong>
      </p>

      <section className="glass account-panel">
        <h2 className="account-section-title">Lịch sử xem gần nhất (5 phim)</h2>
        {history.length === 0 ? (
          <p className="account-empty">Bạn chưa xem phim nào sau khi đăng nhập.</p>
        ) : (
          <div className="account-movie-list">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/phim/${item.movieSlug}${item.lastEpisodeSlug ? `?episode=${item.lastEpisodeSlug}` : ""}`}
                className="account-movie-card"
              >
                <img
                  src={item.thumbUrl || item.posterUrl || "https://placehold.co/140x200?text=No+Image"}
                  alt={item.movieName}
                  className="account-movie-thumb"
                />
                <div className="account-movie-info">
                  <h3>{item.movieName}</h3>
                  <p>
                    {item.lastEpisodeName ? `Tập gần nhất: ${item.lastEpisodeName}` : "Phim lẻ / chưa có tập"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="glass account-panel">
        <h2 className="account-section-title">Phim đã lưu</h2>
        {savedMoviesWithHistory.length === 0 ? (
          <p className="account-empty">Bạn chưa lưu phim nào.</p>
        ) : (
          <div className="account-movie-list">
            {savedMoviesWithHistory.map((item) => (
              <Link
                key={item.id}
                href={`/phim/${item.movieSlug}${item.lastEpisodeSlug ? `?episode=${item.lastEpisodeSlug}` : ""}`}
                className="account-movie-card"
              >
                <img
                  src={item.thumbUrl || item.posterUrl || "https://placehold.co/140x200?text=No+Image"}
                  alt={item.movieName}
                  className="account-movie-thumb"
                />
                <div className="account-movie-info">
                  <h3>{item.movieName}</h3>
                  <p>
                    {item.lastEpisodeName ? `Tập gần nhất: ${item.lastEpisodeName}` : "Chưa xem tập nào / Phim lẻ"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
