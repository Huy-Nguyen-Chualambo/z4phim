"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [keyword, setKeyword] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
            setIsMenuOpen(false);
        }
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
                    <Link href="/danh-sach/phim-dang-chieu">Phim đang chiếu</Link>
                    <Link href="/danh-sach/phim-bo">Phim bộ</Link>
                    <Link href="/danh-sach/phim-le">Phim lẻ</Link>
                    <Link href="/danh-sach/phim-moi">Phim mới</Link>
                </nav>

                <div className="nav-right flex items-center gap-4">
                    <form onSubmit={handleSearch} className="search-form desktop-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="search-input"
                        />
                    </form>

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
                    <form onSubmit={handleSearch} className="search-form mobile-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="search-input"
                        />
                    </form>
                    <nav className="mobile-nav flex flex-col gap-4">
                        <Link href="/danh-sach/phim-dang-chieu" onClick={() => setIsMenuOpen(false)}>Phim đang chiếu</Link>
                        <Link href="/danh-sach/phim-bo" onClick={() => setIsMenuOpen(false)}>Phim bộ</Link>
                        <Link href="/danh-sach/phim-le" onClick={() => setIsMenuOpen(false)}>Phim lẻ</Link>
                        <Link href="/danh-sach/phim-moi" onClick={() => setIsMenuOpen(false)}>Phim mới</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
