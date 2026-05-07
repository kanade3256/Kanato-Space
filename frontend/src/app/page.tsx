import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { SectionCards } from "@/components/home/SectionCards";
import { WhyBuild } from "@/components/home/WhyBuild";

export const metadata: Metadata = {
  title: "Murayama Kanato",
  description:
    "Murayama Kanato のポートフォリオサイト。研究、開発、AWSを用いたWebアプリ開発、AIを活用した歩行解析などの活動をまとめています。",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Murayama Kanato",
    url: "https://kanato-space.com",
    description:
      "Murayama Kanato のポートフォリオサイト。研究、開発、AWSを用いたWebアプリ開発、AIを活用した歩行解析などの活動をまとめています。",
    jobTitle: "Software Engineer / Researcher",
    sameAs: [
      "https://github.com/kanade3256",
      "https://qiita.com/kanade3256",
      "https://www.wantedly.com/id/murayama_kanato",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <SectionCards />
      <LatestUpdates />
      <WhyBuild />
    </>
  );
}
