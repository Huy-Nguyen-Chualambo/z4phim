"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
        }
    };

    return (
        <header>
            <div className="container flex items-center justify-between">
                <Link href="/" className="logo">
                    Z4PHIM
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/danh-sach/phim-dang-chieu">Phim đang chiếu</Link>
                    <Link href="/danh-sach/phim-bo">Phim bộ</Link>
                    <Link href="/danh-sach/phim-le">Phim lẻ</Link>
                    <Link href="/danh-sach/phim-moi">Phim mới</Link>
                </nav>

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="search-input"
                    />
                </form>
            </div>
        </header>
    );
}
