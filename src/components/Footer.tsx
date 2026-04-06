import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{ marginTop: "4rem", padding: "4rem 0 2rem", borderTop: "1px solid var(--card-border)", background: "rgba(0,0,0,0.2)" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                    <div>
                        <Link href="/" className="logo" style={{ marginBottom: "1rem", display: "inline-block" }}>Z4PHIM</Link>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                            Trang web xem phim trực tuyến miễn phí, cập nhật nhanh nhất các bộ phim hot nhất hiện nay.
                        </p>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Liên kết</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            <li><Link href="/danh-sach/phim-dang-chieu">Phim đang chiếu</Link></li>
                            <li><Link href="/danh-sach/phim-le">Phim lẻ mới nhất</Link></li>
                            <li><Link href="/danh-sach/phim-bo">Phim bộ mới nhất</Link></li>
                            <li><Link href="/danh-sach/phim-moi">Phim mới cập nhật</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Hỗ trợ</h3>
                        <ul className="footer-links" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            <li><Link href="/dieue-khoan">Điều khoản sử dụng</Link></li>
                            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
                            <li><Link href="/dieue-khoan#dmca">Khiếu nại bản quyền</Link></li>
                            <li><Link href="mailto:contact@z4phim.com">Liên hệ</Link></li>
                        </ul>
                    </div>
                </div>
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--card-border)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    &copy; {new Date().getFullYear()} Z4PHIM. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

