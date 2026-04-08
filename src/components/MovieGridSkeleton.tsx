interface MovieGridSkeletonProps {
  title?: string;
  count?: number;
  showHeaderMeta?: boolean;
}

export default function MovieGridSkeleton({
  title = "Đang tải danh sách phim...",
  count = 10,
  showHeaderMeta = false,
}: MovieGridSkeletonProps) {
  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <div className="skeleton-header-wrap">
        <h2 className="section-title">{title}</h2>
        {showHeaderMeta && <div className="skeleton-line skeleton-meta" />}
      </div>

      <div className="movie-grid">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="movie-card-skeleton glass">
            <div className="movie-card-skeleton-image skeleton-shimmer" />
            <div className="movie-card-skeleton-content">
              <div className="skeleton-line skeleton-title skeleton-shimmer" />
              <div className="skeleton-line skeleton-subtitle skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
