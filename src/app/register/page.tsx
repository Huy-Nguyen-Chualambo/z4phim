"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const registerJson = await registerRes.json();
      if (!registerRes.ok) {
        setError(registerJson?.error || "Không thể đăng ký.");
        setLoading(false);
        return;
      }

      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (loginRes?.error) {
        router.push("/login");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setLoading(false);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container auth-page-shell">
      <div className="glass auth-card">
        <h1 className="auth-title">Tạo tài khoản</h1>
        <form onSubmit={onSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Tên hiển thị (tùy chọn)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
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
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="auth-input"
          />
          {error && <p style={{ color: "#ff7b7b", margin: 0 }}>{error}</p>}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
          Đã có tài khoản? <Link href="/login" style={{ color: "var(--primary)" }}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
