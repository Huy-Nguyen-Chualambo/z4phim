export interface Paginate {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
}

export interface MovieListItem {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string | null;
  casts: string | null;
}

export interface MovieListResponse {
  status: string;
  paginate: Paginate;
  items: MovieListItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategoryGroup {
  group: {
    id: string;
    name: string;
  };
  list: CategoryItem[];
}

export interface EpisodeItem {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}

export interface EpisodeServer {
  server_name: string;
  items: EpisodeItem[];
}

export interface MovieDetail {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category: Record<string, CategoryGroup>;
  episodes: EpisodeServer[]; // Moved here
}

export interface MovieDetailResponse {
  status: string;
  movie: MovieDetail;
}
