import Link from "next/link";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="logo">Z4PHIM</Link>
                        <p>
                            Trang xem phim trực tuyến với giao diện vui mắt, cập nhật nhanh các bộ phim đang được quan tâm.
                        </p>
                    </div>

                    <div>
                        <h3>Liên kết</h3>
                        <ul className="footer-links">
                            <li><Link href="/danh-sach/phim-dang-chieu">Phim đang chiếu</Link></li>
                            <li><Link href="/danh-sach/phim-le">Phim lẻ mới nhất</Link></li>
                            <li><Link href="/danh-sach/phim-bo">Phim bộ mới nhất</Link></li>
                            <li><Link href="/danh-sach/phim-moi">Phim mới cập nhật</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Hỗ trợ</h3>
                        <ul className="footer-links">
                            <li><Link href="/dieue-khoan">Điều khoản sử dụng</Link></li>
                            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
                            <li><Link href="/dieue-khoan#dmca">Khiếu nại bản quyền</Link></li>
                            <li><Link href="mailto:contact@z4phim.com">Liên hệ</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-feedback glass">
                    <div>
                        <p className="footer-feedback-title">Bạn thấy Z4PHIM thế nào?</p>
                        <p>Góp ý nhanh để trải nghiệm xem phim ngày càng mượt hơn.</p>
                    </div>
                    <a
                        href="https://forms.gle/b3asBfBhmpZrn27x5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-feedback-btn"
                    >
                        Đánh giá & góp ý
                    </a>
                </div>

                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} Z4PHIM. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
