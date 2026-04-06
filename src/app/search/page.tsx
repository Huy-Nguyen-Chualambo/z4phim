import { searchMovies, getMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

interface Props {
    searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
    const { keyword = "" } = await searchParams;

    if (!keyword) {
        return (
            <div className="container" style={{ padding: "8rem 1rem", textAlign: "center" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🔍</div>
                <h2 style={{ fontSize: "1.8rem" }}>Vui lòng nhập từ khóa để tìm kiếm</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Bạn có thể tìm theo tên phim, diễn viên hoặc đạo diễn.</p>
            </div>
        );
    }

    try {
        const data = await searchMovies(keyword);
        const movies = data.items;
        const totalItems = data.paginate.total_items;

        return (
            <div className="container" style={{ paddingTop: "2.5rem" }}>
                <div className="search-header" style={{ marginBottom: "2.5rem" }}>
                    <h2 className="section-title">Kết quả tìm kiếm cho: <span style={{ color: "var(--accent)" }}>"{keyword}"</span></h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        Tìm thấy <strong>{totalItems}</strong> phim phù hợp.
                    </p>
                </div>

                {movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.slug} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results-container">
                        <div style={{ padding: "4rem 0", textAlign: "center" }}>
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😟</div>
                            <h3 style={{ fontSize: "1.5rem" }}>Không tìm thấy phim nào phù hợp.</h3>
                            <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
                                Hãy thử kiểm tra lại chính tả hoặc tìm kiếm bằng từ khóa ngắn gọn hơn.
                            </p>
                        </div>

                        <div className="recommendations" style={{ marginTop: "3rem" }}>
                            <h2 className="section-title">Phim mới cập nhật có thể bạn quan tâm</h2>
                            <MovieGridFallback />
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
                <h3>Lỗi khi tìm kiếm phim.</h3>
                <p>Vui lòng thử lại sau.</p>
            </div>
        );
    }
}

async function MovieGridFallback() {
    try {
        const data = await getMovies(1);
        const movies = data.items.slice(0, 5); // Just top 5

        return (
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.slug} movie={movie} />
                ))}
            </div>
        );
    } catch (error) {
        return null;
    }
}

