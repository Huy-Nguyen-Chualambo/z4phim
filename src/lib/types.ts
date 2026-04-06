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
// Phim API (KKPhim) Types
export interface PhimApiPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface PhimApiMovieListItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  modified: {
    time: string;
  };
}

export interface PhimApiMovieListResponse {
  status: boolean;
  items: PhimApiMovieListItem[];
  pagination: PhimApiPagination;
}

export interface PhimApiMovieDetail {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  year: number;
  actor: string[];
  director: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
  modified: {
    time: string;
  };
}

export interface PhimApiEpisodeItem {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface PhimApiEpisodeServer {
  server_name: string;
  server_data: PhimApiEpisodeItem[];
}

export interface PhimApiMovieDetailResponse {
  status: boolean;
  movie: PhimApiMovieDetail;
  episodes: PhimApiEpisodeServer[];
}

export interface PhimApiCategoryItem {
  _id: string;
  name: string;
  slug: string;
}

export interface PhimApiCountryItem {
  _id: string;
  name: string;
  slug: string;
}
