import { searchMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

interface Props {
    searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
    const { keyword = "" } = await searchParams;

    if (!keyword) {
        return (
            <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
                <h2>Vui lòng nhập từ khóa để tìm kiếm</h2>
            </div>
        );
    }

    try {
        const data = await searchMovies(keyword);
        const movies = data.items;

        return (
            <div className="container" style={{ paddingTop: "2rem" }}>
                <h2 className="section-title">Kết quả tìm kiếm cho: "{keyword}"</h2>

                {movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.slug} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: "4rem 0", textAlign: "center", color: "var(--text-muted)" }}>
                        <h3>Không tìm thấy phim nào phù hợp với từ khóa của bạn.</h3>
                        <p style={{ marginTop: "1rem" }}>Hãy thử tìm kiếm với từ khóa khác.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>Lỗi khi tìm kiếm phim.</div>;
    }
}
