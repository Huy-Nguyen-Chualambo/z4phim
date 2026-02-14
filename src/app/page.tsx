import { getMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  try {
    const data = await getMovies(1);
    const movies = data.items;

    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <section>
          <h2 className="section-title">Phim mới cập nhật</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>
        </section>

        {/* We can add more sections here later if the API supports it */}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h2 style={{ color: "#ff4444" }}>Đã xảy ra lỗi khi tải dữ liệu</h2>
        <p>Vui lòng thử lại sau.</p>
      </div>
    );
  }
}
