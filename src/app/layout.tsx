import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Z4PHIM - Xem Phim Trực Tuyến Miễn Phí",
  description: "Z4PHIM là website xem phim trực tuyến miễn phí, cập nhật nhanh nhất các bộ phim bộ, phim lẻ, phim hành động, hoạt hình hấp dẫn.",
  keywords: "xem phim, phim moi, phim le, phim bo, phim hay, z4phim",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Z4PHIM - Xem Phim Trực Tuyến Miễn Phí",
    description: "Cập nhật phim mới mỗi ngày tại Z4PHIM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 70px - 300px)" }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
