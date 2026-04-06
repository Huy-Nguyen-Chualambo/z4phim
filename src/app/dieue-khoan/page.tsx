import Link from "next/link";

export const metadata = {
    title: "Điều khoản sử dụng - Z4PHIM",
    description: "Các điều khoản và quy định khi sử dụng dịch vụ tại Z4PHIM.",
};

export default function TermsPage() {
    return (
        <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
            <h1 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Điều khoản sử dụng</h1>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>1. Chấp nhận các điều khoản</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Bằng việc truy cập và sử dụng Z4PHIM, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng trang web của chúng tôi.</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>2. Miễn trừ trách nhiệm (Disclaimer)</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Đây là phần quan trọng nhất về việc sử dụng dịch vụ:</p>
                    <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem", listStyleType: "disc" }}>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <strong>Nguồn nội dung:</strong> Z4PHIM là một công cụ tìm kiếm và tổng hợp các liên kết video từ các nguồn lưu trữ bên thứ ba (như Youtube, DailyMotion, Google Drive, v.v.). Chúng tôi <strong>không lưu trữ</strong> bất kỳ tệp tin video nào trên máy chủ của mình.
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <strong>Bản quyền:</strong> Vì chúng tôi không kiểm soát các nội dung được lưu trữ bởi bên thứ ba, chúng tôi không chịu trách nhiệm về tính pháp lý hoặc tính bản quyền của nội dung đó. Mọi khiếu nại về bản quyền vui lòng liên hệ với các bên cung cấp lưu trữ gốc.
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <strong>Độ chính xác:</strong> Chúng tôi không đảm bảo tính chính xác, đầy đủ hoặc chất lượng của bất kỳ nội dung nào được cung cấp thông qua các liên kết.
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <strong>Rủi ro:</strong> Người dùng tự chịu mọi rủi ro khi truy cập và sử dụng các nội dung này. Z4PHIM không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc sử dụng trang web.
                        </li>
                    </ul>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>3. Quyền sở hữu trí tuệ</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Logo, giao diện và các tài sản thương hiệu của Z4PHIM thuộc sở hữu của chúng tôi. Các tên phim, hình ảnh poster và video thuộc sở hữu của các chủ sở hữu bản quyền tương ứng.</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>4. Thay đổi điều khoản</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Chúng tôi có quyền thay đổi các điều khoản này bất cứ lúc nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng trang web sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.</p>
                </div>
            </section>

            <div style={{ marginTop: "4rem", textAlign: "center" }}>
                <Link href="/" className="glass" style={{ padding: "0.8rem 2rem", borderRadius: "30px", border: "1px solid var(--primary)" }}>
                    Quay lại trang chủ
                </Link>
            </div>
        </div>
    );
}
