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
  return (
    <>
      <Hero />
      <SectionCards />
      <LatestUpdates />
      <WhyBuild />
    </>
  );
}
