export type ContactLinkIcon = "github" | "qiita" | "blog" | "lab";

export const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/kanade3256",
    external: true,
    icon: "github",
  },
  {
    label: "Qiita",
    href: "https://qiita.com/kanade3256",
    external: true,
    icon: "qiita",
  },
  {
    label: "Blog",
    href: "/blog",
    external: false,
    icon: "blog",
  },
  {
    label: "TransMediaTechLab",
    href: "https://www.transmedia-tech-lab.jp/",
    external: true,
    icon: "lab",
  },
] as const;

export const contactNoticeText = [
  "送信された内容は、お問い合わせ対応の目的でのみ使用します。",
  "現在は送信機能を準備中のため、フォームからの送信はまだ行えません。",
] as const;

export const privacySections = [
  {
    title: "取得する情報",
    body: "お問い合わせフォームでは、お名前、メールアドレス、件名、お問い合わせ内容を取得します。",
  },
  {
    title: "利用目的",
    body: "お問い合わせへの返信、内容確認、必要な連絡のためにのみ利用します。",
  },
  {
    title: "保存期間",
    body: "取得した情報は、対応完了後の確認期間を含め、原則180日を目安に保存し、その後削除対象とします。",
  },
  {
    title: "第三者提供",
    body: "法令に基づく場合を除き、第三者へ提供しません。運用ログと個人情報は分離して扱います。",
  },
  {
    title: "削除方針",
    body: "保存期間を過ぎた情報は、必要性を確認したうえで削除します。",
  },
  {
    title: "お問い合わせ",
    body: "個人情報の取り扱いに関するご質問は、Contactページからご連絡ください。",
  },
] as const;

export const termsSections = [
  {
    title: "このサイトについて",
    body: "Kanato Space は、個人のポートフォリオ、技術ログ、研究記録をまとめる個人サイトです。",
  },
  {
    title: "禁止事項",
    body: "不正アクセス、フォームの悪用、サイト運営を妨げる行為を禁止します。",
  },
  {
    title: "免責事項",
    body: "掲載情報の正確性や完全性を保証しません。内容は参考情報としてご利用ください。",
  },
  {
    title: "外部リンク",
    body: "外部サイトの内容や利用条件について、当サイトは責任を負いません。",
  },
  {
    title: "掲載情報の取り扱い",
    body: "掲載内容は個人の見解や記録を含み、予告なく変更される場合があります。",
  },
  {
    title: "変更について",
    body: "本規約は必要に応じて改定されることがあります。改定後は最新の内容が適用されます。",
  },
] as const;
