export const aboutProfileParagraphs = [
  "東京工科大学 コンピュータサイエンス学部で学びながら、Webアプリケーション開発、AWSを用いたバックエンド設計、研究活動に取り組んでいます。",
  "現場の課題を起点に、設計・実装・運用改善まで考える開発を重視しています。",
] as const;

export const aboutSkills = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend / Cloud",
    items: ["AWS Lambda", "API Gateway", "SQS", "S3", "RDS", "CloudWatch"],
  },
  {
    category: "Data / Research",
    items: ["Python", "MediaPipe", "Time-series Analysis", "Clustering", "DTW"],
  },
  {
    category: "Tools",
    items: ["GitHub", "GitHub Actions", "Docker", "Markdown"],
  },
] as const;

export const aboutProjects = [
  {
    title: "Komeda Portal",
    description:
      "シフト提出や通知を支援するWebアプリケーション。現場の課題を起点に、LINE連携やAWS構成を含めて設計・改善しています。",
    linkLabel: "Labを見る",
    href: "/lab",
  },
  {
    title: "Kanato Space",
    description:
      "技術の実験場、ポートフォリオ、成長ログを兼ねる個人サイト。Markdown運用とAWS学習を前提に継続更新できる構造を目指しています。",
    linkLabel: "Labを見る",
    href: "/lab",
  },
] as const;

export const aboutResearchKeywords = [
  "MediaPipe",
  "Skeleton Time-series",
  "DTW",
  "Clustering",
  "Explainable AI",
] as const;

export const aboutInterests = [
  "現場課題を起点にしたWeb開発",
  "AWSを用いた小規模サービス運用",
  "時系列データと説明可能AI",
] as const;
