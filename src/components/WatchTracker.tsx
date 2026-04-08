"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface WatchTrackerProps {
  movieSlug: string;
  movieName: string;
  thumbUrl?: string;
  posterUrl?: string;
  lastEpisodeSlug?: string;
  lastEpisodeName?: string;
}

export default function WatchTracker(props: WatchTrackerProps) {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const controller = new AbortController();

    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
      signal: controller.signal,
    }).catch(() => {
      // Ignore silent tracking errors
    });

    return () => controller.abort();
  }, [status, props]);

  return null;
}
