"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  movieSlug: string;
  movieName: string;
  thumbUrl?: string;
  posterUrl?: string;
  initialSaved: boolean;
}

export default function SaveButton({
  movieSlug,
  movieName,
  thumbUrl,
  posterUrl,
  initialSaved,
}: SaveButtonProps) {
  const { status } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        const res = await fetch("/api/saved", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieSlug }),
        });
        if (!res.ok) throw new Error("Delete failed");
        setSaved(false);
      } else {
        const res = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieSlug, movieName, thumbUrl, posterUrl }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaved(true);
      }
    } catch {
      alert("Không thể cập nhật danh sách lưu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`save-movie-btn ${saved ? "is-saved" : ""}`}
    >
      {loading ? "Đang xử lý..." : saved ? "Đã lưu phim" : "Lưu phim"}
    </button>
  );
}
