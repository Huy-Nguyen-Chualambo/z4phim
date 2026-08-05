import {
    PhimApiMovieListItem,
    PhimApiMovieListResponse,
    PhimApiMovieDetailResponse,
    PhimApiCategoryItem,
    PhimApiCountryItem,
    MovieListItem,
    MovieDetailResponse
} from "./types";

const DEFAULT_PHIMAPI_BASE_URL = "https://phimapi.com";
const PHIMAPI_BASE_URL = process.env.NEXT_PUBLIC_PHIMAPI_URL?.trim() || DEFAULT_PHIMAPI_BASE_URL;
const PHIMAPI_IMAGE_PROXY = process.env.NEXT_PUBLIC_PHIMAPI_IMAGE_PROXY || "";

export interface PhimApiListFilters {
    category?: string;
    country?: string;
    year?: number | string;
    sort_field?: "modified.time" | "_id" | "year";
    sort_type?: "desc" | "asc";
    sort_lang?: "vietsub" | "thuyet-minh" | "long-tieng";
}

interface PhimApiV1ListResponse {
    status: boolean | string;
    items?: PhimApiMovieListItem[];
    pagination?: Partial<PhimApiMovieListResponse["pagination"]>;
    data?: {
        items?: PhimApiMovieListItem[];
        params?: {
            pagination?: Partial<PhimApiMovieListResponse["pagination"]>;
        };
    };
}

function buildPhimApiUrl(path: string, params: Record<string, string | number | undefined> = {}): string {
    const url = new URL(`${PHIMAPI_BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`);

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== "") {
            url.searchParams.set(key, String(value));
        }
    }

    return url.toString();
}

function buildListParams(
    page: number,
    limit: number | undefined,
    filters: PhimApiListFilters = {}
): Record<string, string | number | undefined> {
    return {
        page,
        limit,
        category: filters.category,
        country: filters.country,
        year: filters.year,
        sort_field: filters.sort_field,
        sort_type: filters.sort_type,
        sort_lang: filters.sort_lang,
    };
}

function normalizePhimApiListResponse(payload: PhimApiV1ListResponse): PhimApiMovieListResponse {
    const pagination = payload.pagination || payload.data?.params?.pagination || {};

    return {
        status: payload.status === true || payload.status === "success",
        items: payload.items || payload.data?.items || [],
        pagination: {
            totalItems: pagination.totalItems || 0,
            totalItemsPerPage: pagination.totalItemsPerPage || 10,
            currentPage: pagination.currentPage || 1,
            totalPages: pagination.totalPages || 1,
        },
    };
}

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
        created: "",
        modified: item.modified.time,
        description: "",
        total_episodes: 0,
        current_episode: "",
        time: "",
        quality: "",
        language: "",
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
            created: movie.modified.time,
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
                "1": {
                    group: { id: "1", name: "Thể loại" },
                    list: movie.category.map((category) => ({ id: category.id, name: category.name }))
                }
            },
            episodes: episodes.map((server) => ({
                server_name: server.server_name,
                items: server.server_data.map((item) => ({
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
    const res = await fetch(buildPhimApiUrl("danh-sach/phim-moi-cap-nhat", { page }), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies from PhimAPI");
    return normalizePhimApiListResponse(await res.json());
}

export async function getPhimApiMovieDetail(slug: string): Promise<PhimApiMovieDetailResponse> {
    const res = await fetch(buildPhimApiUrl(`phim/${slug}`), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movie detail from PhimAPI");
    return res.json();
}

export async function getPhimApiHome(): Promise<unknown> {
    const res = await fetch(buildPhimApiUrl("v1/api/home"), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch home data from PhimAPI");
    return res.json();
}

export async function getPhimApiByList(
    typeList?: string,
    page: number = 1,
    limit: number = 10,
    filters: PhimApiListFilters = {}
): Promise<PhimApiMovieListResponse> {
    const path = typeList ? `v1/api/danh-sach/${typeList}` : "v1/api/danh-sach";
    const res = await fetch(buildPhimApiUrl(path, buildListParams(page, limit, filters)), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${typeList || "movies"} from PhimAPI`);
    return normalizePhimApiListResponse(await res.json());
}

export async function searchPhimApi(
    keyword: string,
    page: number = 1,
    limit: number = 10,
    filters: PhimApiListFilters = {}
): Promise<PhimApiMovieListResponse> {
    const res = await fetch(buildPhimApiUrl("v1/api/tim-kiem", {
        keyword,
        ...buildListParams(page, limit, filters),
    }));
    if (!res.ok) throw new Error("Failed to search movies on PhimAPI");
    return normalizePhimApiListResponse(await res.json());
}

export async function getPhimApiByYear(
    year: number | string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<PhimApiListFilters, "year"> = {}
): Promise<PhimApiMovieListResponse> {
    const res = await fetch(buildPhimApiUrl(`v1/api/nam/${year}`, buildListParams(page, limit, filters)), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch year ${year} from PhimAPI`);
    return normalizePhimApiListResponse(await res.json());
}

export async function getPhimApiByCategory(
    category: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<PhimApiListFilters, "category"> = {}
): Promise<PhimApiMovieListResponse> {
    const res = await fetch(buildPhimApiUrl(`v1/api/the-loai/${category}`, buildListParams(page, limit, filters)), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch category ${category} from PhimAPI`);
    return normalizePhimApiListResponse(await res.json());
}

export async function getPhimApiByCountry(
    country: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<PhimApiListFilters, "country"> = {}
): Promise<PhimApiMovieListResponse> {
    const res = await fetch(buildPhimApiUrl(`v1/api/quoc-gia/${country}`, buildListParams(page, limit, filters)), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch country ${country} from PhimAPI`);
    return normalizePhimApiListResponse(await res.json());
}

export async function getPhimApiCategories(): Promise<PhimApiCategoryItem[]> {
    const res = await fetch(buildPhimApiUrl("the-loai"));
    if (!res.ok) throw new Error("Failed to fetch categories from PhimAPI");
    return res.json();
}

export async function getPhimApiCountries(): Promise<PhimApiCountryItem[]> {
    const res = await fetch(buildPhimApiUrl("quoc-gia"));
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
