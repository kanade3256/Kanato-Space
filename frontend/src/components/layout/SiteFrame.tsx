"use client";

import { usePathname } from "next/navigation";

import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AnalyticsTracker />}
    </div>
  );
}