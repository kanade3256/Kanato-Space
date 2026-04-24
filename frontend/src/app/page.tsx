import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { SectionCards } from "@/components/home/SectionCards";
import { WhyBuild } from "@/components/home/WhyBuild";

export const metadata: Metadata = {
  title: "Kanato Space | 技術の実験場",
  description: "Kanato Space は、技術の実験場・ポートフォリオ・成長ログを兼ねる個人サイトです。",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionCards />
      <LatestUpdates />
      <WhyBuild />
    </>
  );
}
