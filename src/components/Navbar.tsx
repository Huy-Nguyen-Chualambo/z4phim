"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { smartSearchMovies } from "@/lib/api";
import { MovieListItem } from "@/lib/types";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState<MovieListItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    // Debounce search suggestions
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (keyword.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const result = await smartSearchMovies(keyword.trim(), { limit: 6 });
                    setSuggestions(result.items);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current && !searchRef.current.contains(event.target as Node) &&
                mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
            setShowSuggestions(false);
            setIsMenuOpen(false);
        }
    };

    const handleSuggestionClick = (slug: string) => {
        router.push(`/phim/${slug}`);
        setShowSuggestions(false);
        setKeyword("");
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header>
            <div className="container flex items-center justify-between">
                <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                    Z4PHIM
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav flex items-center gap-6">
                    <Link href="/">Trang chủ</Link>
                    <Link href="/danh-sach/phim-dang-chieu">Phim đang chiếu</Link>
                    <Link href="/danh-sach/phim-bo">Phim bộ</Link>
                    <Link href="/danh-sach/phim-le">Phim lẻ</Link>
                    <Link href="/danh-sach/phim-moi">Phim mới cập nhật</Link>
                </nav>

                <div className="nav-right flex items-center gap-4">
                    <div className="search-container desktop-search" ref={searchRef}>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                className="search-input"
                            />
                            {isLoading && <div className="search-loader"></div>}
                        </form>

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown fade-in">
                                {suggestions.map((movie) => (
                                    <div
                                        key={movie.slug}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(movie.slug)}
                                    >
                                        <div className="suggestion-thumb">
                                            <img src={movie.thumb_url} alt={movie.name} />
                                        </div>
                                        <div className="suggestion-info">
                                            <div className="suggestion-name">{movie.name}</div>
                                            <div className="suggestion-meta">
                                                {movie.quality} • {movie.modified.split(' ')[0]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="suggestion-footer" onClick={handleSearch}>
                                    Xem tất cả kết quả cho "{keyword}"
                                </div>
                            </div>
                        )}
                    </div>

                    {status === "authenticated" ? (
                        <div className="flex items-center gap-2 nav-auth-group">
                            <Link href="/account" className="nav-auth-btn nav-auth-btn--ghost">Tài khoản</Link>
                            <button
                                type="button"
                                className="nav-auth-btn nav-auth-btn--danger"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 nav-auth-group">
                            <Link href="/login" className="nav-auth-btn nav-auth-btn--ghost">Đăng nhập</Link>
                            <Link href="/register" className="nav-auth-btn nav-auth-btn--solid">Đăng ký</Link>
                        </div>
                    )}

                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="search-container mobile-search" ref={mobileSearchRef}>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                className="search-input"
                            />
                            {isLoading && <div className="search-loader"></div>}
                        </form>

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown fade-in">
                                {suggestions.map((movie) => (
                                    <div
                                        key={movie.slug}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(movie.slug)}
                                    >
                                        <div className="suggestion-thumb">
                                            <img src={movie.thumb_url} alt={movie.name} />
                                        </div>
                                        <div className="suggestion-info">
                                            <div className="suggestion-name">{movie.name}</div>
                                            <div className="suggestion-meta">
                                                {movie.quality} • {movie.modified.split(' ')[0]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <nav className="mobile-nav flex flex-col gap-4">
                        <Link href="/danh-sach/phim-dang-chieu" onClick={() => setIsMenuOpen(false)}>Phim đang chiếu</Link>
                        <Link href="/danh-sach/phim-bo" onClick={() => setIsMenuOpen(false)}>Phim bộ</Link>
                        <Link href="/danh-sach/phim-le" onClick={() => setIsMenuOpen(false)}>Phim lẻ</Link>
                        <Link href="/danh-sach/phim-moi" onClick={() => setIsMenuOpen(false)}>Phim mới</Link>
                        {status === "authenticated" ? (
                            <>
                                <Link href="/account" onClick={() => setIsMenuOpen(false)}>Tài khoản ({session?.user?.email})</Link>
                                <button
                                    type="button"
                                    className="mobile-auth-btn"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>Đăng ký</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

