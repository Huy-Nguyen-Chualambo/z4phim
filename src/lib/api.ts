import { MovieDetailResponse, MovieListItem, MovieListResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getMovies(page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/phim-moi-cap-nhat?page=${page}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
}

export async function getMoviesByCategory(slug: string, page: number = 1): Promise<MovieListResponse> {
    const url = slug === "phim-moi"
        ? `${API_BASE_URL}/films/phim-moi-cap-nhat?page=${page}`
        : `${API_BASE_URL}/films/danh-sach/${slug}?page=${page}`;

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies by category");
    return res.json();
}

export async function getMovieDetail(slug: string): Promise<MovieDetailResponse> {
    const res = await fetch(`${API_BASE_URL}/film/${slug}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movie detail");
    return res.json();
}

export async function getMoviesByGenre(slug: string, page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/the-loai/${slug}?page=${page}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies by genre");
    return res.json();
}

export async function getMoviesByCountry(slug: string, page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/quoc-gia/${slug}?page=${page}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies by country");
    return res.json();
}

export async function getMoviesByYear(slug: string, page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/nam-phat-hanh/${slug}?page=${page}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch movies by year");
    return res.json();
}

export async function searchMovies(keyword: string, page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    if (!res.ok) throw new Error("Failed to search movies");
    return res.json();
}

function normalizeText(input: string): string {
    return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

function buildFallbackQueries(keyword: string): string[] {
    const normalized = normalizeText(keyword);
    const tokens = normalized.split(" ").filter((token) => token.length >= 2);

    const queries = new Set<string>();

    if (tokens.length >= 2) {
        queries.add(`${tokens[0]} ${tokens[1]}`);
    }

    for (const token of tokens) {
        if (token.length >= 3) {
            queries.add(token);
        }
    }

    return Array.from(queries).slice(0, 3);
}

function scoreMovie(movie: MovieListItem, normalizedKeyword: string, tokens: string[]): number {
    const haystack = normalizeText(`${movie.name} ${movie.original_name}`);

    if (!haystack) return 0;

    let score = 0;

    if (haystack.includes(normalizedKeyword)) {
        score += 120;
    }

    const matchedTokens = tokens.filter((token) => haystack.includes(token)).length;

    score += matchedTokens * 20;

    if (tokens.length > 0 && matchedTokens === tokens.length) {
        score += 60;
    }

    return score;
}

function dedupeMovies(items: MovieListItem[]): MovieListItem[] {
    const map = new Map<string, MovieListItem>();

    for (const item of items) {
        map.set(item.slug, item);
    }

    return Array.from(map.values());
}

export interface SmartSearchOptions {
    fetchAllPages?: boolean;
    limit?: number;
}

export interface SmartSearchResult {
    items: MovieListItem[];
    totalItems: number;
}

export async function smartSearchMovies(
    keyword: string,
    options: SmartSearchOptions = {}
): Promise<SmartSearchResult> {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
        return { items: [], totalItems: 0 };
    }

    const { fetchAllPages = false, limit } = options;
    const normalizedKeyword = normalizeText(trimmedKeyword);
    const tokens = normalizedKeyword.split(" ").filter(Boolean);

    const firstPageData = await searchMovies(trimmedKeyword, 1);
    let candidates = [...firstPageData.items];

    if (fetchAllPages && firstPageData.paginate.total_page > 1) {
        const otherPages = await Promise.all(
            Array.from({ length: firstPageData.paginate.total_page - 1 }, (_, i) => searchMovies(trimmedKeyword, i + 2))
        );
        candidates = candidates.concat(otherPages.flatMap((page) => page.items));
    }

    if (candidates.length < 8) {
        const fallbackQueries = buildFallbackQueries(trimmedKeyword);
        for (const fallbackQuery of fallbackQueries) {
            const fallbackData = await searchMovies(fallbackQuery, 1);
            candidates = candidates.concat(fallbackData.items);
        }
    }

    const ranked = dedupeMovies(candidates)
        .map((movie) => ({ movie, score: scoreMovie(movie, normalizedKeyword, tokens) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.movie);

    const finalItems = typeof limit === "number" ? ranked.slice(0, limit) : ranked;

    return {
        items: finalItems,
        totalItems: ranked.length,
    };
}
