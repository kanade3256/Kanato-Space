"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ページアクセスをトラッキングするコンポーネント
 * layout.tsx に組み込んで使用
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // /admin 配下は除外（本来なら管理画面ではトラッキングしない）
    if (pathname.startsWith("/admin")) {
      return;
    }

    const trackAccess = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch (error) {
        // エラーが発生しても、ページ表示に影響しないようにする
        console.debug("Analytics tracking failed (non-critical)", error);
      }
    };

    // 少し遅延させてからトラッキング（他の処理を優先させる）
    const timer = setTimeout(trackAccess, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
