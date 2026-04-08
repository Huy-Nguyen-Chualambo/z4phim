import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return <MovieGridSkeleton title="Đang tải phim theo năm phát hành..." count={10} />;
}
