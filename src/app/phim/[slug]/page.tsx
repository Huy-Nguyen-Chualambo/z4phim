import { getMovieDetail } from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ server?: string; episode?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const data = await getMovieDetail(slug);
        return {
            title: `${data.movie.name} - Z4PHIM`,
            description: data.movie.description.substring(0, 160),
        };
    } catch {
        return { title: "Phim không tìm thấy - Z4PHIM" };
    }
}

export default async function MovieDetailPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { server: serverIdx = "0", episode: epSlug } = await searchParams;

    try {
        const data = await getMovieDetail(slug);
        const movie = data.movie;
        if (!movie) throw new Error("Movie data not found");

        const servers = movie.episodes || [];
        if (servers.length === 0) {
            return (
                <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
                    <h2>Phim hiện chưa có tập nào.</h2>
                    <Link href="/" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>Về trang chủ</Link>
                </div>
            );
        }

        const currentServerIdx = parseInt(serverIdx);
        const currentServer = servers[currentServerIdx] || servers[0];

        if (!currentServer || !currentServer.items || currentServer.items.length === 0) {
            return (
                <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
                    <h2>Nguồn phim hiện không sẵn dụng.</h2>
                    <Link href="/" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>Về trang chủ</Link>
                </div>
            );
        }

        const currentEpisode = epSlug
            ? (currentServer.items.find(item => item.slug === epSlug) || currentServer.items[0])
            : currentServer.items[0];

        return (
            <div className="container" style={{ padding: "2rem 1rem" }}>
                {/* Player Section */}
                <div className="glass fade-in" style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                    <iframe
                        src={currentEpisode.embed}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        title={`${movie.name} - ${currentEpisode.name}`}
                    />
                </div>

                <div className="detail-grid">
                    <div className="detail-main flex" style={{ flexDirection: "column", gap: "2rem" }}>
                        {/* Info Header */}
                        <div className="glass" style={{ padding: "2rem" }}>
                            <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem", background: "linear-gradient(to right, #fff, #aaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                {movie.name}
                            </h1>
                            <p style={{ color: "var(--accent)", fontSize: "1.2rem", fontWeight: "500", marginBottom: "1.5rem" }}>
                                {movie.original_name}
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                                <span className="badge">{movie.quality}</span>
                                <span className="badge">{movie.language}</span>
                                <span className="badge">{movie.time}</span>
                                <span className="badge">{movie.current_episode}</span>
                            </div>

                            <div style={{ lineHeight: "1.8", color: "var(--text-muted)", fontSize: "1.1rem" }}>
                                <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Nội dung phim</h3>
                                <p>{movie.description}</p>
                            </div>
                        </div>

                        {/* Cast & Director */}
                        <div className="glass" style={{ padding: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                            <div>
                                <h3 style={{ marginBottom: "1rem" }}>Diễn viên</h3>
                                <p style={{ color: "var(--text-muted)" }}>{movie.casts || "Đang cập nhật"}</p>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: "1rem" }}>Đạo diễn</h3>
                                <p style={{ color: "var(--text-muted)" }}>{movie.director || "Đang cập nhật"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="detail-sidebar">
                        {/* Servers Section */}
                        {servers.length > 1 && (
                            <div className="glass" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                                <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Chọn Server</h3>
                                <div className="flex gap-2">
                                    {servers.map((s, idx) => (
                                        <Link
                                            key={s.server_name}
                                            href={`/phim/${slug}?server=${idx}`}
                                            className={`button-small ${idx === currentServerIdx ? 'active' : ''}`}
                                        >
                                            {s.server_name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Episodes List */}
                        <div className="glass" style={{ padding: "1.5rem" }}>
                            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Danh sách tập</h3>
                            <div className="episode-list">
                                {currentServer.items.map((ep) => (
                                    <Link
                                        key={ep.slug}
                                        href={`/phim/${slug}?server=${currentServerIdx}&episode=${ep.slug}`}
                                        className={`episode-item ${ep.slug === currentEpisode.slug ? 'active' : ''}`}
                                    >
                                        {ep.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
          .detail-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          @media (min-width: 1024px) {
            .detail-grid {
              grid-template-columns: 1fr 350px;
            }
          }
          .badge {
            background: rgba(255,255,255,0.1);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            border: 1px solid var(--card-border);
          }
          .button-small {
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            background: rgba(255,255,255,0.05);
            font-size: 0.85rem;
            border: 1px solid var(--card-border);
            transition: all 0.2s;
          }
          .button-small.active {
            background: var(--primary);
            border-color: var(--primary);
          }
          .episode-list {
            max-height: 600px;
            overflow-y: auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
            gap: 0.6rem;
          }
          .episode-item {
            padding: 0.6rem;
            border-radius: 8px;
            background: rgba(255,255,255,0.05);
            text-align: center;
            font-size: 0.9rem;
            font-weight: 600;
            border: 1px solid var(--card-border);
            transition: all 0.2s;
          }
          .episode-item:hover {
            background: rgba(255,255,255,0.15);
            border-color: var(--primary);
          }
          .episode-item.active {
            background: var(--primary);
            border-color: var(--primary);
            box-shadow: 0 0 15px rgba(0, 112, 243, 0.4);
          }
        `}} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
                <h2 style={{ color: "#ff4444" }}>Phim không tồn tại hoặc đã bị gỡ bỏ</h2>
                <Link href="/" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>Về trang chủ</Link>
            </div>
        );
    }
}
