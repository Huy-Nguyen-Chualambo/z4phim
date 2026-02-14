import { getMoviesByCategory } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page = "1" } = await searchParams;
    const currentPage = parseInt(page);

    try {
        const data = await getMoviesByCategory(slug, currentPage);
        const movies = data.items;
        const pagination = data.paginate;

        const titleMap: Record<string, string> = {
            "phim-dang-chieu": "Phim đang chiếu",
            "phim-bo": "Phim bộ",
            "phim-le": "Phim lẻ",
            "phim-moi": "Phim mới bổ sung",
        };

        const titleStr = titleMap[slug] || "Danh sách phim";

        return (
            <div className="container" style={{ paddingTop: "2rem" }}>
                <h2 className="section-title">{titleStr}</h2>

                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.slug} movie={movie} />
                    ))}
                </div>

                {/* Pagination */}
                {pagination.total_page > 1 && (
                    <div className="flex gap-2 justify-center" style={{ marginTop: "3rem", paddingBottom: "3rem", flexWrap: "wrap" }}>
                        {currentPage > 1 && (
                            <Link href={`/danh-sach/${slug}?page=${currentPage - 1}`} className="page-btn">Trước</Link>
                        )}

                        {Array.from({ length: Math.min(5, pagination.total_page) }, (_, i) => {
                            let pageNum: number;
                            const total = pagination.total_page;
                            if (total <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= total - 2) {
                                pageNum = total - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            if (pageNum <= 0 || pageNum > total) return null;

                            return (
                                <Link
                                    key={pageNum}
                                    href={`/danh-sach/${slug}?page=${pageNum}`}
                                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}

                        {currentPage < pagination.total_page && (
                            <Link href={`/danh-sach/${slug}?page=${currentPage + 1}`} className="page-btn">Sau</Link>
                        )}
                    </div>
                )}

                <style dangerouslySetInnerHTML={{
                    __html: `
          .page-btn {
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--card-border);
            transition: all 0.2s;
            font-weight: 500;
          }
          .page-btn:hover {
            background: rgba(255,255,255,0.1);
            border-color: var(--primary);
          }
          .page-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            box-shadow: 0 0 15px rgba(0, 112, 243, 0.4);
          }
          .justify-center { justify-content: center; }
        `}} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>Lỗi khi tải danh sách phim.</div>;
    }
}
