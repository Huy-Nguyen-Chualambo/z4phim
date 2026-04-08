"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const callbackUrl =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("callbackUrl") || "/account"
        : "/account";

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="container auth-page-shell">
      <div className="glass auth-card">
        <h1 className="auth-title">Đăng nhập</h1>
        <form onSubmit={onSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="auth-input"
          />
          {error && <p style={{ color: "#ff7b7b", margin: 0 }}>{error}</p>}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
          Chưa có tài khoản? <Link href="/register" style={{ color: "var(--primary)" }}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
