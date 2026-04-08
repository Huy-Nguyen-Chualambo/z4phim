import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return <MovieGridSkeleton title="Đang tải danh sách phim..." count={10} />;
}
