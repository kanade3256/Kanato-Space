import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { SectionCards } from "@/components/home/SectionCards";
import { WhyBuild } from "@/components/home/WhyBuild";

export const metadata: Metadata = {
  title: "Murayama Kanato | Kanato Space",
  description:
    "Murayama Kanato のポートフォリオサイト。自分の研究や趣味などの活動をまとめています。",
  alternates: {
    canonical: "https://kanato-space.com/",
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
