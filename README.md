# Kanato Space

「技術の実験場・ポートフォリオ・成長ログ」を兼ねる、継続更新前提の個人サイト。

## プロジェクト概要

Kanato Space は、技術的な試行錯誤、改善プロセス、そして成果物を継続的に蓄積・可視化するためのポートフォリオサイトです。

### 目指すもの

- **実績と設計力の提示** - 実装例と構造の工夫を示す
- **継続改善の姿勢** - 失敗と改善の履歴を記録
- **技術的思考過程の可視化** - 仮説、検証、再試行の痕跡を残す

---

## ディレクトリ構成

```
Kanato-Space/
├── frontend/              # Next.js + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/          # App Router pages & layouts
│   │   ├── components/   # UI components
│   │   ├── features/     # Feature-specific logic
│   │   ├── lib/          # Utilities & helpers
│   │   └── types/        # TypeScript type definitions
│   ├── public/           # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── .eslintrc.json
│
├── backend/               # Backend services (microservices structure)
│   ├── api/              # API definitions & entry points
│   ├── functions/        # Lambda handlers & serverless functions
│   ├── infra/            # Infrastructure as Code (CDK / Terraform)
│   └── package.json
│
├── content/               # Markdown-based content
│   ├── blog/             # Daily logs & thought posts
│   │   └── first-post/
│   │       └── text.md
│   ├── lab/              # Technical experiments & explorations
│   │   └── first-lab/
│   │       └── text.md
│   └── note/             # Quick notes & insights
│       └── first-note/
│           └── text.md
│
├── mock_images/          # UI/UX reference mockups
├── AGENT.md              # AI assistant guidelines & specifications
└── README.md             # This file
```

---

## コンテンツ構成

### Blog
日常ログと思考ログ。技術特化ではなく、個人的な記録や改善の振り返りを含めます。

### Lab
技術検証と成果物の中核。実験結果、開発ログ、ツール、失敗と再試行の記録などを蓄積します。

### Note
短編ノート。気軽に更新できる形式のコンテンツ。

**記事構成:** 1記事 1ディレクトリ、本文ファイル名は `text.md`

**Frontmatter:**
```markdown
---
title: "記事タイトル"
date: "YYYY-MM-DD"
type: "Blog" | "Lab" | "Note"
slug: "article-slug"
draft: false
summary: "簡潔な説明"
---
```

---

## 開発開始方法

### 必要なもの
- Node.js 18+
- npm または yarn

### 初期セットアップ

```bash
# frontend の依存関係をインストール
cd frontend
npm install

# backend の依存関係をインストール (workspace構成)
cd ../backend
npm install

# または全体をインストール
cd ..
npm install --workspaces
```

---

## frontend の起動方法

```bash
cd frontend

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### ビルド

```bash
# 本番用にビルド
npm run build

# ビルド済みアプリを起動
npm start
```

### 型チェック

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

---

## 実装状況

### ✅ Step 1 (現在地)
- [x] プロジェクト土台作成
- [x] frontend: Next.js + TypeScript + Tailwind CSS
- [x] backend: 雛形ディレクトリ構成
- [x] content: blog / lab / note サンプル記事
- [x] トップページ: 最小実装
- [x] README: 完成

### 🚀 Step 2 (予定)
- [ ] Markdown 読み込みロジック実装
- [ ] Blog/Lab/Note 一覧ページ
- [ ] 記事詳細ページ
- [ ] About ページ詳細実装
- [ ] SEO 対応 (メタタグ、サイトマップ)

### 📋 Step 3 (以降)
- [ ] Contact フォーム実装
- [ ] LINE 通知機能
- [ ] API Gateway / Lambda 実装
- [ ] OGP 詳細設定
- [ ] アニメーション・インタラクション

---

## 設計方針

### 責務分離
- **frontend** - サイト表示とユーザーインタラクション
- **backend** - API、通知、問い合わせ処理
- **content** - マークダウン記事の管理

### ファイル構成の原則
- UI と ビジネスロジックを分離
- 1つの責務を 1か所に集約
- 将来の機能追加に容易に対応できる構造

### 技術スタック
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, App Router
- **Backend:** Node.js (API/Lambda), AWS CDK
- **Content:** Markdown + Frontmatter
- **Infrastructure:** AWS (Lambda, API Gateway, CloudFormation via CDK)

---

## トーン・ブランド

Kanato Space は「空白のキャンバス」「個人の実験空間」を示します。

- 静かで整理された雰囲気
- 余白を重視し読みやすさを優先
- 派手さより洗練
- 技術者らしい構造美
- 実装だけでなく運用も含めた設計

---

## ライセンス

個人プロジェクト。詳細は `Contact` ページを参照。

---

## 参考ドキュメント

- [AGENT.md](./AGENT.md) - AI アシスタント向けガイドライン
- `frontend/README.md` - フロントエンド詳細
- `backend/api/README.md` - API 詳細
- `backend/functions/README.md` - Lambda 関数詳細
- `backend/infra/README.md` - インフラストラクチャ詳細

---

最終更新: 2026年4月23日
