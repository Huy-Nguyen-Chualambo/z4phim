import {
    PhimApiMovieListItem,
    PhimApiMovieListResponse,
    PhimApiMovieDetailResponse,
    PhimApiCategoryItem,
    PhimApiCountryItem,
    MovieListItem,
    MovieDetail,
    MovieListResponse,
    MovieDetailResponse
} from "./types";

const PHIMAPI_BASE_URL = process.env.NEXT_PUBLIC_PHIMAPI_URL || "";
const PHIMAPI_IMAGE_PROXY = process.env.NEXT_PUBLIC_PHIMAPI_IMAGE_PROXY || "";

/**
 * Helper to map PhimApi movie item to common MovieListItem
 */
export function mapPhimApiToCommonItem(item: PhimApiMovieListItem): MovieListItem {
    return {
        name: item.name,
        slug: item.slug,
        original_name: item.origin_name,
        thumb_url: item.thumb_url,
        poster_url: item.poster_url,
        created: "", // Not provided in list
        modified: item.modified.time,
        description: "", // Not provided in list
        total_episodes: 0, // Not provided in list
        current_episode: "", // Not provided in list
        time: "", // Not provided in list
        quality: "", // Not provided in list
        language: "", // Not provided in list
        director: null,
        casts: null,
    };
}

/**
 * Helper to map PhimApi movie detail to common MovieDetail
 */
export function mapPhimApiToCommonDetail(data: PhimApiMovieDetailResponse): MovieDetailResponse {
    const { movie, episodes } = data;
    return {
        status: "success",
        movie: {
            name: movie.name,
            slug: movie.slug,
            original_name: movie.origin_name,
            thumb_url: movie.thumb_url,
            poster_url: movie.poster_url,
            created: movie.modified.time, // Fallback
            modified: movie.modified.time,
            description: movie.content,
            total_episodes: parseInt(movie.episode_total) || 0,
            current_episode: movie.episode_current,
            time: movie.time,
            quality: movie.quality,
            language: movie.lang,
            director: movie.director.join(", "),
            casts: movie.actor.join(", "),
            category: {
                // Mapping PhimApi flat categories to NguonC grouped structure is tricky,
                // but we'll try to provide a generic group
                "1": {
                    group: { id: "1", name: "Thể loại" },
                    list: movie.category.map(c => ({ id: c.id, name: c.name }))
                }
            },
            episodes: episodes.map(server => ({
                server_name: server.server_name,
                items: server.server_data.map(item => ({
                    name: item.name,
                    slug: item.slug,
                    embed: item.link_embed,
                    m3u8: item.link_m3u8
                }))
            }))
        }
    };
}

export async function getPhimApiMovies(page: number = 1): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies from PhimAPI");
    return res.json();
}

export async function getPhimApiMovieDetail(slug: string): Promise<PhimApiMovieDetailResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/phim/${slug}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movie detail from PhimAPI");
    return res.json();
}

export async function getPhimApiByList(typeList: string, page: number = 1, limit: number = 10): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/v1/api/danh-sach/${typeList}?page=${page}&limit=${limit}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${typeList} from PhimAPI`);
    return res.json();
}

export async function searchPhimApi(keyword: string, page: number = 1, limit: number = 10): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to search movies on PhimAPI");
    return res.json();
}

export async function getPhimApiByYear(year: number | string, page: number = 1, limit: number = 10): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/v1/api/nam/${year}?page=${page}&limit=${limit}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch year ${year} from PhimAPI`);
    return res.json();
}

export async function getPhimApiByCategory(category: string, page: number = 1, limit: number = 10): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/v1/api/the-loai/${category}?page=${page}&limit=${limit}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch category ${category} from PhimAPI`);
    return res.json();
}

export async function getPhimApiByCountry(country: string, page: number = 1, limit: number = 10): Promise<PhimApiMovieListResponse> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/v1/api/quoc-gia/${country}?page=${page}&limit=${limit}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch country ${country} from PhimAPI`);
    return res.json();
}

export async function getPhimApiCategories(): Promise<PhimApiCategoryItem[]> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/the-loai`);
    if (!res.ok) throw new Error("Failed to fetch categories from PhimAPI");
    return res.json();
}

export async function getPhimApiCountries(): Promise<PhimApiCountryItem[]> {
    const res = await fetch(`${PHIMAPI_BASE_URL}/quoc-gia`);
    if (!res.ok) throw new Error("Failed to fetch countries from PhimAPI");
    return res.json();
}

/**
 * Proxy image to bypass cross-origin or for WebP conversion
 */
export function getProxiedImageUrl(url: string): string {
    if (!url) return "";
    return `${PHIMAPI_IMAGE_PROXY}${encodeURIComponent(url)}`;
}
