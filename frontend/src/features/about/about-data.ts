export const aboutProfileParagraphs = [
  "名前：Kanato Murayama",
  "所属：東京工科大学 コンピュータサイエンス学部 人工知能専攻",
  "（2023年4月〜2026年9月卒業予定）",
  "所属研究室：Trans Media Tech Lab (中西研究室)",
  "研究テーマ：MediaPipeを用いたSkeleton Time-seriesの分析と説明可能AIへの応用",
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
    title: "シフト提出WEBアプリケーション",
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
  "AI",
] as const;
