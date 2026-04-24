export const homeSectionCards = [
  {
    title: "About",
    description: "人物像・経歴・スキル・研究テーマを短くまとめています。",
    href: "/about",
  },
  {
    title: "Blog",
    description: "日々の気づき、振り返り、学びを残すログです。",
    href: "/blog",
  },
  {
    title: "Lab",
    description: "開発・検証・改善の過程を記録する実験場です。",
    href: "/lab",
  },
] as const;

export const whyBuildItems = [
  {
    icon: "purpose",
    title: "技術は目的ではなく手段",
    description: "課題を解決するために、技術をどう使うかを記録します。",
  },
  {
    icon: "design",
    title: "設計と運用まで考える",
    description: "作って終わりではなく、保守・監視・改善まで含めて考えます。",
  },
  {
    icon: "improve",
    title: "継続的改善に価値がある",
    description: "小さな改善と試行錯誤を積み上げる過程を残します。",
  },
] as const;

export type WhyBuildIconKey = (typeof whyBuildItems)[number]["icon"];
