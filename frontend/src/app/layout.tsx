import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteName, siteUrl } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kanato Space",
    template: "%s | Kanato Space",
  },
  description: "Murayama Kanato のポートフォリオサイト。自分の研究や趣味などの活動をまとめています。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kanato Space",
    description: "Murayama Kanato のポートフォリオサイト。自分の研究や趣味などの活動をまとめています。",
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanato Space",
    description: "Murayama Kanato のポートフォリオサイト。自分の研究や趣味などの活動をまとめています。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJp.variable} bg-white text-primary antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
