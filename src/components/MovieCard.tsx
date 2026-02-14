import Link from "next/link";
import { MovieListItem } from "@/lib/types";

export default function MovieCard({ movie }: { movie: MovieListItem }) {
    return (
        <Link href={`/phim/${movie.slug}`} className="movie-card fade-in">
            <div className="movie-card-inner">
                <div className="movie-card-img-container">
                    <img
                        src={movie.thumb_url}
                        alt={movie.name}
                        className="movie-card-img"
                        loading="lazy"
                    />
                    <div className="movie-card-overlay"></div>

                    {movie.quality && (
                        <div className="badge-quality">
                            {movie.quality}
                        </div>
                    )}

                    {movie.current_episode && (
                        <div className="badge-episode">
                            {movie.current_episode}
                        </div>
                    )}
                </div>

                <div className="movie-card-info">
                    <h3 className="movie-card-title" title={movie.name}>
                        {movie.name}
                    </h3>
                    <p className="movie-card-subtitle">
                        {movie.original_name}
                    </p>
                </div>
            </div>
        </Link>
    );
}
