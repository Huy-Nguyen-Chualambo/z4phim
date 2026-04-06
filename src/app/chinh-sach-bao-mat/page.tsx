import Link from "next/link";

export const metadata = {
    title: "Chính sách bảo mật - Z4PHIM",
    description: "Các quy định về bảo mật thông tin người dùng tại Z4PHIM.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
            <h1 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Chính sách bảo mật</h1>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>1. Thu thập thông tin</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Z4PHIM không yêu cầu đăng ký tài khoản cho việc sử dụng cơ bản. Chúng tôi có thể thu thập các thông tin phi cá nhân từ bạn khi bạn tương tác với trang web của chúng tôi, bao gồm nhưng không giới hạn ở:</p>
                    <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem", listStyleType: "disc" }}>
                        <li>Địa chỉ IP (Internet Protocol).</li>
                        <li>Loại trình duyệt và hệ điều hành.</li>
                        <li>Thời gian và các trang bạn đã truy cập trên Z4PHIM.</li>
                        <li>Các liên kết bạn nhấp vào.</li>
                    </ul>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>2. Sử dụng Cookies</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Z4PHIM sử dụng "cookies" để cải thiện trải nghiệm người dùng. Cookies là các tệp nhỏ được trình duyệt lưu trữ trên máy tính của bạn để ghi nhớ các tùy chọn trang web của bạn. Bạn có thể vô hiệu hóa cookies trong cài đặt trình duyệt của mình nếu muốn.</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>3. Sử dụng thông tin</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Mọi thông tin chúng tôi thu thập được sử dụng để:</p>
                    <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem", listStyleType: "disc" }}>
                        <li>Cá nhân hóa trải nghiệm của bạn trên trang web.</li>
                        <li>Cải thiện chất lượng trang web và nội dung chúng tôi cung cấp.</li>
                        <li>Phân tích xu hướng truy cập và hành vi người dùng.</li>
                    </ul>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>4. Bảo mật thông tin</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ dữ liệu của mình. Tuy nhiên, xin lưu ý rằng không có phương thức truyền dữ liệu qua Internet hoặc phương thức lưu trữ điện tử nào là an toàn 100%.</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>5. Liên kết bên thứ ba</h2>
                <div style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                    <p>Trang web của chúng tôi chứa các liên kết đến các trang web khác (nguồn video, quảng cáo, v.v.). Z4PHIM không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các trang web bên thứ ba đó. Bạn nên xem xét chính sách bảo mật của các trang web đó trước khi cung cấp bất kỳ thông tin nào.</p>
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
