export default function Footer() {
    return (
        <footer style={{ marginTop: "4rem", padding: "4rem 0 2rem", borderTop: "1px solid var(--card-border)", background: "rgba(0,0,0,0.2)" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                    <div>
                        <h2 className="logo" style={{ marginBottom: "1rem" }}>Z4PHIM</h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                            Trang web xem phim trực tuyến miễn phí, cập nhật nhanh nhất các bộ phim hot nhất hiện nay.
                        </p>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Liên kết</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            <li>Phim mới cập nhật</li>
                            <li>Phim lẻ mới nhất</li>
                            <li>Phim bộ mới nhất</li>
                            <li>Phim đang chiếu</li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Hỗ trợ</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách bảo mật</li>
                            <li>Khiếu nại bản quyền</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>
                </div>
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--card-border)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    &copy; {new Date().getFullYear()} Z4PHIM. All rights reserved. Built with Next.js.
                </div>
            </div>
        </footer>
    );
}
