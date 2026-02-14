import { MovieDetailResponse, MovieListResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://phim.nguonc.com/api";

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

export async function searchMovies(keyword: string): Promise<MovieListResponse> {
    const res = await fetch(`${API_BASE_URL}/films/search?keyword=${keyword}`);
    if (!res.ok) throw new Error("Failed to search movies");
    return res.json();
}
