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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function clean(node) {
                  if (node.nodeType !== 1) return;
                  if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                  if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
                  for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    if (attr && attr.name.startsWith('__processed_') && attr.name.endsWith('__')) {
                      node.removeAttribute(attr.name);
                      i--;
                    }
                  }
                }
                const observer = new MutationObserver((mutations) => {
                  for (let i = 0; i < mutations.length; i++) {
                    const mutation = mutations[i];
                    if (mutation.type === 'attributes') {
                      const name = mutation.attributeName;
                      if (name === 'bis_skin_checked' || name === 'bis_register' || (name.startsWith('__processed_') && name.endsWith('__'))) {
                        mutation.target.removeAttribute(name);
                      }
                    }
                    for (let j = 0; j < mutation.addedNodes.length; j++) {
                      const node = mutation.addedNodes[j];
                      if (node.nodeType === 1) {
                        clean(node);
                        const descNodes = node.querySelectorAll('*');
                        for (let k = 0; k < descNodes.length; k++) {
                          clean(descNodes[k]);
                        }
                      }
                    }
                  }
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true
                });
              })();
            `
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
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
