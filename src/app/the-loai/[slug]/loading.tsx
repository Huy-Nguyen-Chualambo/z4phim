import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return <MovieGridSkeleton title="Đang tải phim theo thể loại..." count={10} />;
}
