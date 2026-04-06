import { getMovies, getMoviesByCategory, getMoviesByGenre } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { MovieListItem } from "@/lib/types";

// Helper to safely fetch data
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// Genre/Country/Year data for browsing sections
const genres = [
  { name: "Hành Động", slug: "hanh-dong", icon: "💥" },
  { name: "Tình Cảm", slug: "tinh-cam", icon: "💕" },
  { name: "Hài Hước", slug: "hai-huoc", icon: "😂" },
  { name: "Kinh Dị", slug: "kinh-di", icon: "👻" },
  { name: "Viễn Tưởng", slug: "vien-tuong", icon: "🚀" },
  { name: "Tâm Lý", slug: "tam-ly", icon: "🧠" },
  { name: "Hoạt Hình", slug: "hoat-hinh", icon: "🎨" },
  { name: "Phiêu Lưu", slug: "phieu-luu", icon: "🗺️" },
  { name: "Hình Sự", slug: "hinh-su", icon: "🔍" },
  { name: "Cổ Trang", slug: "co-trang", icon: "⚔️" },
  { name: "Chiến Tranh", slug: "chien-tranh", icon: "🎖️" },
  { name: "Thể Thao", slug: "the-thao", icon: "⚽" },
];

const countries = [
  { name: "Âu Mỹ", slug: "au-my", flag: "🇺🇸" },
  { name: "Hàn Quốc", slug: "han-quoc", flag: "🇰🇷" },
  { name: "Trung Quốc", slug: "trung-quoc", flag: "🇨🇳" },
  { name: "Nhật Bản", slug: "nhat-ban", flag: "🇯🇵" },
  { name: "Thái Lan", slug: "thai-lan", flag: "🇹🇭" },
  { name: "Việt Nam", slug: "viet-nam", flag: "🇻🇳" },
  { name: "Đài Loan", slug: "dai-loan", flag: "🇹🇼" },
  { name: "Ấn Độ", slug: "an-do", flag: "🇮🇳" },
];

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

// Themed collections
const collections = [
  { name: "Siêu Anh Hùng", icon: "🦸", slug: "hanh-dong", desc: "Marvel, DC & more" },
  { name: "Anime Hay", icon: "🎌", slug: "hoat-hinh", desc: "Phim hoạt hình Nhật Bản" },
  { name: "Kinh Điển", icon: "🎬", slug: "co-trang", desc: "Phim kinh điển mọi thời đại" },
  { name: "Lãng Mạn", icon: "💝", slug: "tinh-cam", desc: "Phim tình cảm lãng mạn" },
  { name: "Gay Cấn", icon: "🔥", slug: "hinh-su", desc: "Hình sự & trinh thám" },
  { name: "Gia Đình", icon: "👨‍👩‍👧‍👦", slug: "gia-dinh", desc: "Phim dành cho gia đình" },
];

export default async function Home() {
  // Fetch data in parallel
  const [
    latestData,
    seriesData,
    singleData,
    theatreData,
    upcomingData,
    actionData,
    romanceData,
  ] = await Promise.all([
    safeFetch(() => getMovies(1), null),
    safeFetch(() => getMoviesByCategory("phim-bo", 1), null),
    safeFetch(() => getMoviesByCategory("phim-le", 1), null),
    safeFetch(() => getMoviesByCategory("phim-dang-chieu", 1), null),
    safeFetch(() => getMoviesByCategory("phim-sap-chieu", 1), null),
    safeFetch(() => getMoviesByGenre("hanh-dong", 1), null),
    safeFetch(() => getMoviesByGenre("tinh-cam", 1), null),
  ]);

  const hotMovies = latestData?.items?.slice(0, 10) || [];
  const featuredMovies = actionData?.items?.slice(0, 5) || latestData?.items?.slice(10, 15) || [];
  const seriesMovies = seriesData?.items?.slice(0, 10) || [];
  const singleMovies = singleData?.items?.slice(0, 10) || [];
  const theatreMovies = theatreData?.items?.slice(0, 10) || [];
  const upcomingMovies = upcomingData?.items?.slice(0, 10) || [];

  return (
    <div className="homepage">
      {/* === HERO BANNER === */}
      {hotMovies.length > 0 && (
        <section className="hero-section">
          <HeroBanner movie={hotMovies[0]} />
        </section>
      )}

      <div className="container">
        {/* === PHIM ĐANG HOT === */}
        <section className="home-section">
          <SectionHeader title="Phim đang hot 🔥" href="/danh-sach/phim-moi" />
          <div className="movie-scroll-container">
            <div className="movie-scroll">
              {hotMovies.map((movie, i) => (
                <div key={movie.slug} className="movie-scroll-item fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === PHIM ĐỀ CỬ === */}
        {featuredMovies.length > 0 && (
          <section className="home-section">
            <SectionHeader title="Phim đề cử ⭐" href="/danh-sach/phim-moi" />
            <div className="featured-grid">
              {featuredMovies.map((movie, i) => (
                <FeaturedCard key={movie.slug} movie={movie} rank={i + 1} />
              ))}
            </div>
          </section>
        )}

        {/* === BỘ SƯU TẬP THEO CHỦ ĐỀ === */}
        <section className="home-section">
          <SectionHeader title="Bộ sưu tập theo chủ đề 🎯" />
          <div className="collections-grid">
            {collections.map((c) => (
              <Link key={c.slug} href={`/the-loai/${c.slug}`} className="collection-card glass">
                <div className="collection-icon">{c.icon}</div>
                <div className="collection-info">
                  <div className="collection-name">{c.name}</div>
                  <div className="collection-desc">{c.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* === THỂ LOẠI === */}
        <section className="home-section">
          <SectionHeader title="Thể loại phim 🎭" />
          <div className="tags-grid">
            {genres.map((g) => (
              <Link key={g.slug} href={`/the-loai/${g.slug}`} className="tag-chip">
                <span className="tag-icon">{g.icon}</span>
                {g.name}
              </Link>
            ))}
          </div>
        </section>

        {/* === QUỐC GIA === */}
        <section className="home-section">
          <SectionHeader title="Quốc gia 🌍" />
          <div className="tags-grid">
            {countries.map((c) => (
              <Link key={c.slug} href={`/quoc-gia/${c.slug}`} className="tag-chip country-chip">
                <span className="tag-icon">{c.flag}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* === NĂM PHÁT HÀNH === */}
        <section className="home-section">
          <SectionHeader title="Năm phát hành 📅" />
          <div className="tags-grid">
            {years.map((y) => (
              <Link key={y} href={`/nam-phat-hanh/${y}`} className="tag-chip year-chip">
                {y}
              </Link>
            ))}
          </div>
        </section>

        {/* === PHIM CHIẾU RẠP MỚI === 
        {theatreMovies.length > 0 && (
          <section className="home-section">
            <SectionHeader title="Phim chiếu rạp mới 🎬" href="/danh-sach/phim-dang-chieu" />
            <div className="movie-scroll-container">
              <div className="movie-scroll">
                {theatreMovies.map((movie, i) => (
                  <div key={movie.slug} className="movie-scroll-item fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}*/}

        {/* === PHIM SẮP CHIẾU === */}
        {upcomingMovies.length > 0 && (
          <section className="home-section">
            <SectionHeader title="Phim sắp chiếu 🔜" href="/danh-sach/phim-sap-chieu" />
            <div className="movie-scroll-container">
              <div className="movie-scroll">
                {upcomingMovies.map((movie, i) => (
                  <div key={movie.slug} className="movie-scroll-item fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === PHIM LẺ MỚI CẬP NHẬT === */}
        {singleMovies.length > 0 && (
          <section className="home-section">
            <SectionHeader title="Phim lẻ mới cập nhật 🎞️" href="/danh-sach/phim-le" />
            <div className="movie-grid">
              {singleMovies.map((movie) => (
                <MovieCard key={movie.slug} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* === PHIM BỘ MỚI CẬP NHẬT === */}
        {seriesMovies.length > 0 && (
          <section className="home-section">
            <SectionHeader title="Phim bộ mới cập nhật 📺" href="/danh-sach/phim-bo" />
            <div className="movie-grid">
              {seriesMovies.map((movie) => (
                <MovieCard key={movie.slug} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ========== SUB-COMPONENTS ========== */

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {href && (
        <Link href={href} className="see-all-btn">
          Xem tất cả →
        </Link>
      )}
    </div>
  );
}

function HeroBanner({ movie }: { movie: MovieListItem }) {
  return (
    <Link href={`/phim/${movie.slug}`} className="hero-banner">
      <div className="hero-bg">
        <img src={movie.poster_url || movie.thumb_url} alt={movie.name} />
        <div className="hero-gradient"></div>
      </div>
      <div className="container hero-content">
        <div className="hero-badge">⚡ Đang Hot</div>
        <h1 className="hero-title">{movie.name}</h1>
        <p className="hero-original">{movie.original_name}</p>
        <div className="hero-meta">
          {movie.quality && <span className="hero-quality">{movie.quality}</span>}
          {movie.current_episode && <span className="hero-episode">{movie.current_episode}</span>}
          {movie.time && <span className="hero-time">⏱ {movie.time}</span>}
        </div>
        {movie.description && (
          <p className="hero-desc">
            {movie.description.replace(/<[^>]*>/g, '').slice(0, 180)}...
          </p>
        )}
        <div className="hero-cta">
          <span className="hero-btn-primary">▶ Xem ngay</span>
          <span className="hero-btn-secondary">Chi tiết</span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ movie, rank }: { movie: MovieListItem; rank: number }) {
  return (
    <Link href={`/phim/${movie.slug}`} className="featured-card">
      <div className="featured-rank">{rank}</div>
      <div className="featured-img">
        <img src={movie.thumb_url} alt={movie.name} />
        <div className="featured-overlay"></div>
        {movie.quality && <span className="badge-quality">{movie.quality}</span>}
      </div>
      <div className="featured-info">
        <h3 className="featured-name">{movie.name}</h3>
        <p className="featured-original">{movie.original_name}</p>
        <div className="featured-meta">
          {movie.current_episode && <span>{movie.current_episode}</span>}
        </div>
      </div>
    </Link>
  );
}
