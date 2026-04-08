import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return <MovieGridSkeleton title="Đang tìm kiếm phim..." count={10} showHeaderMeta />;
}
