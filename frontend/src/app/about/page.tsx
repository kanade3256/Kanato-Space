import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutLinksSection } from "@/components/about/AboutLinksSection";
import { InterestsSection } from "@/components/about/InterestsSection";
import { ProfileSummary } from "@/components/about/ProfileSummary";
import { ProjectsSection } from "@/components/about/ProjectsSection";
import { ResearchSection } from "@/components/about/ResearchSection";
import { SkillsSection } from "@/components/about/SkillsSection";

export const metadata: Metadata = {
  title: "About | Kanato Space",
  description: "Kanato Space の運営者について。経歴、スキル、研究、開発プロジェクトをまとめています。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProfileSummary />
      <SkillsSection />
      <ProjectsSection />
      <ResearchSection />
      <InterestsSection />
      <AboutLinksSection />
    </>
  );
}
