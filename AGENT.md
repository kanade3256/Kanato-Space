# AGENT.md

## ミッション
あなたは Kanato Space のAIアシスタント。
このサイトは「技術の実験場」「ポートフォリオ」「成長ログ」を兼ねる、継続更新前提の個人サイトである。

この文書の目的は、提案・実装・改善の判断基準を統一すること。

---

## 成果目標
このサイトで最終的に伝えるべき価値は次の3点

- 実績と設計力
- 継続して改善する姿勢
- 技術的な試行錯誤と思考過程

想定読者ごとの主目的。

- 就活担当: 実績、継続力、設計力、改善姿勢を短時間で理解できること
- エンジニア: 設計意図、構成、失敗と改善の履歴が追えること
- 将来の自分: 当時の判断、試行、失敗、学びを再利用できること

---

## 判断優先順位
提案や実装で迷ったときは上から順に優先する。

1. ユーザー意図の正確な把握
2. 伝わる情報設計（構造、導線、可読性）
3. 更新しやすさ（運用しやすい構造）
4. 長期保守性（拡張性、責務分離、再利用性）
5. 技術的な妥当性（セキュリティ、性能、コスト）

---

## ブランドとトーン
Kanato Space は「空白のキャンバス」「個人の実験空間」を示す。
作品集に閉じず、記録と改善を蓄積する場として設計する。

目指す印象。

- 静かで整理されている
- 余白があり読みやすい
- 派手さより洗練
- 技術者らしい構造美
- 実装だけでなく運用まで考えている

---

## 情報設計

### Home
役割は「概要提示と導線」。情報を詰め込む場所ではない。

- 最優先メッセージ: このサイトは何か、何が見られるか、更新され続けているか
- 固定構成: Header、Hero、About / Blog / Lab導線、Latest Updates、Why I build、Footer
- ルール: 1セクション1メッセージ、短文中心、視線が自然に流れる配置
- Homeの具体値・制約は「ホーム画面実装仕様（固定値）」を最優先で適用する

### About
固定情報の集約ページ。

責務。

- 自己紹介・経歴・スキル・関心領域・研究テーマを要約し、人物像と専門性を短時間で伝える
- 長期的に大きく変わらない情報を中心に置き、更新頻度は低〜中を想定する
- 「何をしてきたか」と「何に取り組む人か」を明確にし、LabやBlogへの導線を担う

- 自己紹介
- 経歴
- スキル
- プロジェクト
- プロジェクトは概要レベルに留め、詳細はLabへ誘導する
- 研究概要
- 興味関心

### Blog
日常ログと思考ログのページ。

- 日常、振り返り、気づき、継続記録を含める
- 技術記事一辺倒にしない
- Qiita は技術特化、Blog は個人ログ寄りで住み分ける

### Lab
技術検証と成果物の中核ページ。

責務。

- 実験・開発・検証・改善ログ・成果物を蓄積し、試行錯誤の過程を再現可能な形で残す
- 成果だけでなく、仮説、失敗、再試行、改善判断を記録し、技術的な思考過程を示す
- 更新頻度は高めを想定し、最新の取り組みを可視化する主戦場とする

- 成果物
- 実験結果
- 開発ログ
- ツール
- AWS構成や改善記録
- 失敗と再試行の記録

### Contact
連絡窓口と外部導線。

補足。

- 利用規約は削除しない。問い合わせ手段・外部リンク利用時の前提条件、禁止事項、免責範囲を明示するために必要
- 利用規約には免責事項（情報の正確性保証なし、外部リンク責任範囲）を含める
- Privacy Policy（プライバシーポリシー）は必須。問い合わせ時に取得するデータの目的、保存期間、削除方針、第三者提供有無を明記する
- 問い合わせデータは最小限収集を原則とし、運用監視目的のログと個人情報を分離して扱う
- 個人情報を含むデータと運用ログはストレージ・アクセス権限を分離する

- 問い合わせフォーム
- GitHub / SNS リンク
- プライバシーポリシー
- 利用規約

---

## ホーム画面実装仕様（固定値）
この章は Home 実装時の最優先仕様とする。
ポートフォリオモック画面.png の構成と雰囲気を基準にする。

### 1. レイアウト仕様（最優先）

コンテナと幅。

- 最大コンテンツ幅: 1100px
- 左右padding: 24px（mobile: 16px）
- 中央寄せ: margin 0 auto

セクション間隔。

- セクション間: 80px
- Hero下: 64px
- カード間: 24px

グリッド。

- PC: 3カラム
- Tablet: 2カラム（768px〜）
- Mobile: 1カラム（〜767px）
- gap: 24px

Heroレイアウト。

- PC: 左テキスト50%、右ビジュアル50%、横並び
- Mobile: 縦並び、テキスト → ビジュアル

### 2. タイポグラフィ（重要）

- 英字フォント: Inter / system-ui
- 日本語フォント: Noto Sans JP

見出し・本文。

- H1: 48px〜56px、700、letter-spacing -0.02em
- H2: 24px、600
- 本文: 16px、line-height 1.7
- 補足テキスト: 14px、#6b7280

### 3. カラー設計

- 背景: #ffffff
- メイン文字: #111827
- サブ文字: #6b7280
- ボーダー: #e5e7eb
- アクセント: #3b82f6

ボタンカラー。

- Primary: 背景 #111827、文字 #ffffff
- Secondary: 背景 transparent、border 1px solid #e5e7eb

### 4. コンポーネント仕様

ボタン。

- 高さ: 40px
- padding: 0 16px
- border-radius: 8px
- アイコンあり時のgap: 8px
- hover: opacity 0.9

カード。

- border: 1px solid #e5e7eb
- border-radius: 12px
- padding: 24px
- hover: shadow md、translateY(-2px)、transition 0.2s

Latest Updates。

- 形式: リスト
- 構造: [タグ] タイトル ---------------- 日付
- タグ色: Lab=青、Blog=緑、Note=黄
- hover: underline

ヘッダー。

- 高さ: 64px
- position: sticky
- top: 0
- 左: サイト名
- 右: About / Blog / Lab / Contact、GitHubアイコン、テーマ切替

### 5. Hero詳細（重要）

- タイトル: Kanato Space.
- サブ: 技術で人の課題を解決するための試行錯誤と改善の記録
- CTA: About、Labを見る、最新の更新
- CTA配置: 横並び、gap 16px

### 6. セクション構造（固定）

1. Header
2. Hero
3. About / Blog / Lab 導線（カード3つ）
4. Latest Updates
5. Why I build（思想）
6. Footer

### 7. Why I build（思想セクション）

- 項目数は3
- 各項目は [アイコン] タイトル + 説明テキスト
- Why I build は将来的にCMSまたはデータファイルから管理可能な構造とする

内容例。

- 技術は目的ではなく手段
- 設計と運用まで考える
- 継続的改善に価値がある

### 8. ビジュアル要素

- Hero右上にSVG線画（モノクロ、幾何学、立方体など）を置く
- 役割は装飾のみ（情報要素にしない）
- 視線バランス調整のために使う

### 9. データ構造（重要）

```ts
type Post = {
  title: string
  type: "Blog" | "Lab" | "Note"
  date: string
  slug: string
  summary: string
  tags?: string[]
  cover?: string
  draft: boolean
  updatedAt?: string
}
```

### 10. 制約（デザイン崩壊防止）

- Heroにカードを置かない
- 1セクション最大3要素
- カードは最大6つまで
- 長文は禁止（3行以内）

### 11. レスポンシブ

breakpoints。

- sm: 640px
- md: 768px
- lg: 1024px

ルール。

- Hero: PC横並び / mobile縦並び
- カード: 3 → 2 → 1
- paddingはmobileで縮小

### 12. アニメーション

- 使用は最小限
- 許可: hover、fade-in（0.3s）
- 禁止: パララックス、派手な3D

---

## コンテンツ運用
継続更新する対象。

- 新規ツール
- AWS構成変更
- 研究進捗
- 日々の気づき
- 失敗談と学び
- 技術改善
- 運用改善
- デザイン改善

追加予定機能。

- 更新リマインド
- LINE更新通知
- 問い合わせ時のLINE通知
- エラー通知
- 緊急時メンテ表示
- 更新履歴の可視化
- Latest Updates の自動反映

---

## デザイン規約
原則は「装飾より可読性と導線」。

Home の具体値は「ホーム画面実装仕様（固定値）」を優先する。

- ページごとの目的を先に定義し、見た目は後から合わせる
- 広めの余白、短文、明確な階層を維持する
- カードは少数で、1カード1メッセージを徹底する
- スマホで崩れない密度設計を維持する
- 装飾は意味がある場合のみ使う

禁止事項。

- 派手さを主役にする
- 1画面への過密配置
- 長文の連続掲示
- 曖昧な導線や重複セクション
- 保守困難な複雑構造

---

## 技術方針
AWS学習を兼ね、実運用を意識して構築する。

### フロントエンド
- Next.js App Router
- TypeScript
- Tailwind CSS
- CloudFront + S3（OACでS3はprivate）
- キャッシュ設計（アセット長TTL、HTML短TTL）
- 画像 / JS の軽量化

### バックエンド
- API Gateway（HTTP API）
- Lambda（問い合わせ受信 → S3保存 → LINE通知）
- CAPTCHA（Turnstile等）
- Secrets Manager / SSM によるトークン管理
- 問い合わせ送信は backend API を経由する
- 問い合わせ送信内容は保存し、通知を行う
- バリデーションとスパム対策を必須とする

### 運用・監視
- CloudWatch Alarm
- SNS → Lambda → LINE通知
- Budgets によるコスト通知
- 緊急停止時のメンテ表示切替

保持期間と削除ポリシー。

- CloudWatch Logs の保存期間は90日を基本値とし、必要時のみ延長する
- 問い合わせデータの保存期間は180日を基本値とし、対応完了後は削除対象とする
- 個人情報は利用目的達成後に削除し、不要なバックアップコピーを残さない
- 保存期間・削除手順の変更時は Privacy Policy と実装設定を同時に更新する

### CI/CD と周辺
- GitHub Actions
- Amazon CDK
- LINE Messaging API
- ドメイン運用（お名前.com）

---

## 開発ガイド

- 更新しやすい構造を優先する
- モジュール化し責務を分離する
- 1ページに情報を詰め込みすぎない
- セキュリティとコストを常に確認する
- 将来拡張を前提に設計する
- AI活用時も可読性と保守性を落とさない

---

## AI行動ルール

- 情報は必ず構造化して提示する
- 重複説明を避ける
- 長文より理解速度を優先する
- 技術的妥当性と伝わりやすさを両立する
- 見た目だけでなく運用まで含めて提案する
- 必要以上に派手な提案をしない
- 「継続して更新される個人サイト」という前提のもと継続して更新しやすい形を目指す

---

## 実装ガイド（追加仕様）

### コンポーネント設計

Homeは以下のコンポーネントに分割する。

- Header
- Hero
- SectionCards（About / Blog / Lab）
- LatestUpdates
- WhyBuild
- Footer

ルール。

- 1コンポーネント1責務
- propsでデータを渡す
- UIとデータロジックを分離する

### データ取得方針

Latest Updates は以下の方法で取得する。

- ビルド時に静的生成（SSG）
- データソースは content 配下の Markdown（blog / lab / note）

更新フロー。

- Markdown追加 → GitHub push
- GitHub Actionsでビルド
- 自動デプロイ

ルール。

- UI内にデータを直書きしない
- データは外部ファイルまたはAPIから取得する

### Tailwind実装ルール

- コンテナは max-w-[1100px] mx-auto px-4 md:px-6
- セクション余白は py-20（Hero直下は個別に64px指定）
- カードは共通クラスを作る

例。

```css
.card {
  @apply border border-gray-200 rounded-xl p-6 hover:shadow-md transition;
}
```

- カラーは直接書かず、定義済みカラーを使う
- magic numberを避ける

### アイコン

- lucide-react を使用
- サイズ: 20px〜24px
- 色: text-gray-500

### SEO

- titleはページごとに設定
- descriptionを必ず設定
- OGP画像を設定

基本設計。

- canonical URL を各ページで設定し、重複URL評価を避ける
- sitemap.xml をビルドまたはデプロイ時に自動生成する
- robots.txt を配置し、クロール対象と除外方針を明示する
- OGP / Twitter Card は同一の情報設計方針で管理し、title・description・imageをページ単位で整合させる

例。

- Kanato Space | 技術の実験場

### エラー対応

- データ取得失敗時は空表示にしない
- fallbackメッセージを表示する

エラー状態の分類。

- Not Found: リソース自体が存在しない状態。例として無効なslugは404ページを表示する
- Empty: 取得成功だが表示対象データが0件の状態。空状態UIと次の行動導線を表示する
- Error: 取得処理そのものが失敗した状態。再試行導線と簡潔な障害メッセージを表示する

UI指針。

- Not Found、Empty、Errorで文言・見た目・アクションを分離し、同一UIに混在させない
- HomeのLatest Updatesでも同じ分類を適用し、更新停止と取得失敗を区別する

### アクセシビリティ方針

最低基準。

- コントラスト比は通常テキスト4.5:1以上、大きな文字3:1以上を満たす
- 主要操作（ナビゲーション、フォーム送信、モーダル操作）はキーボードのみで完結できること
- アイコンのみのボタンには aria-label を付与し、役割を明示する
- 見出し階層は h1 → h2 → h3 を維持し、視覚順と文書構造を一致させる
- 装飾専用要素（背景SVG、区切り装飾など）には aria-hidden="true" を付与する

検証。

- Lighthouse とスクリーンリーダー確認を定期実施し、重大なアクセシビリティ違反をリリース前に解消する

---

## ディレクトリとコンテンツ方針

### ディレクトリ構成方針

最上位ディレクトリは frontend と backend に分ける。

- frontend: サイト表示に関するコード
- backend: API、通知、問い合わせ、運用補助機能などのコード

UI実装とバックエンド処理を同一階層に混在させない。

### コンテンツ管理方針

継続的に更新する記事系コンテンツは Markdown ベースで管理する。
対象は Blog、Lab、Note などの更新型コンテンツとする。

- 初期段階では文章のみを扱う
- 将来的に画像を記事ディレクトリ内に配置できる構造にする
- 1記事1ディレクトリで本文と画像を同一場所で管理する

### 記事ディレクトリ規約

```text
content/
  blog/
    post-slug/
      text.md
      image.png
  lab/
    project-slug/
      text.md
      image.png
  note/
    note-slug/
      text.md
      cover.png
```

ルール。

- 1記事につき1ディレクトリ
- 本文ファイル名は text.md
- 画像は同じディレクトリ内に配置
- 画像が存在しない記事も許容
- slug は英小文字 + ハイフンで命名

### フロントエンドの読み取り方針

frontend は content 配下の Markdown を読み取り、一覧ページと詳細ページを生成する。

要件。

- Blog一覧を生成できる
- Lab一覧を生成できる
- slug をもとに詳細ページを生成できる
- text.md をHTMLとして描画できる
- 将来的に同一ディレクトリ内の画像を参照できる

初期実装では文章のみを対象とし、画像追加可能な構造は維持する。

### 実際のディレクトリ（例）

```text
project-root/
  frontend/
    src/
      app/
      components/
      features/
      lib/
      types/
    public/
    package.json

  backend/
    api/
    functions/
    infra/
    package.json

  content/
    blog/
      first-post/
        text.md
      komeda-line-design/
        text.md
        image.png
    lab/
      aws-architecture/
        text.md
      gait-analysis/
        text.md
        chart.png
```

---

## アーキテクチャ拡張仕様

### レイヤー依存ルール

- frontend は content を参照してよい
- content は frontend に依存しない
- backend は content を参照してよい
- frontend は backend API を通じてのみ動的データを取得する

目的。

- 将来的にCMSやAPIへ移行しやすくする

### Markdownフォーマット規約

各記事は frontmatter を持つ。

frontmatter仕様。

- title: 記事タイトル（表示とSEOの基準）
- date: 公開日（YYYY-MM-DD、Asia/Tokyo基準）
- type: 記事種別（Blog / Lab / Note）
- slug: URL識別子（省略時はディレクトリ名を採用）
- draft: 下書きフラグ（trueは非公開）
- summary: 一覧とメタ説明用の要約
- tags: 分類タグ配列
- cover: カバー画像パス（任意）
- updatedAt: 最終更新日（任意、更新履歴表示に利用）

例。

```md
---
title: "Komeda Portal の設計"
date: "2026-04-23"
type: "Lab"
slug: "komeda-line-design"
draft: false
summary: "LINE連携の設計と改善"
tags: ["AWS", "LINE"]
cover: "./cover.png"
updatedAt: "2026-05-02"
---

本文...
```

ルール。

- 必須: title, date, type, slug, draft, summary
- 互換運用（移行期間のみ）: 既存記事は title, date, type のみでも読み込みを許可する
- 推奨: tags, cover, updatedAt
- 任意: description
- type は Blog / Lab / Note のいずれか
- slug はディレクトリ名を既定値として使用
- date は Asia/Tokyo 基準で扱い、表示も日本時間で統一する

許可する記法。

- 見出し
- 箇条書き
- コードブロック
- 画像
- リンク

Markdown処理実装。

- Markdown のパースには remark / rehype 系を用いる
- 危険なHTMLはそのまま許可しない（生HTMLの無条件通過を禁止する）

### ルーティング仕様

- Blog一覧: /blog
- Blog詳細: /blog/[slug]
- Lab一覧: /lab
- Lab詳細: /lab/[slug]
- Note一覧: /note
- Note詳細: /note/[slug]
- slug は content のディレクトリ名を使用する

### パフォーマンス方針

- 画像は最適化（next/image）
- 不要なJSを読み込まない
- 初期表示を最優先（LCP重視）
- Markdownはビルド時に変換する

目標。

- Lighthouse Performance 90以上

### ロジック配置ルール

- UIロジックは components に書かない
- データ取得は features または lib に置く
- 共通処理は lib にまとめる

### 検証方針

- UI崩れはレスポンシブで確認
- 更新時は Latest Updates が反映されるか確認
- 本番ビルドでエラーが出ないことを確認する

### 将来拡張

- content は将来的に CMS または API に置き換え可能な設計とする
- Markdownは暫定的なデータソースとする

### コンテンツ検証ルール

- frontmatterが不足している場合はビルドエラーにする
- title / date / type が無い記事は無視またはエラーとする
- 日付はISO形式（YYYY-MM-DD）に統一する

目的。

- 更新時の事故を防ぐ

### 並び順ルール

- 記事は date の降順で表示する
- Latest Updates も同様に降順
- Home の Latest Updates は最新5件を表示する
- Blog一覧 / Lab一覧 / Note一覧は全件またはページネーション対応とする

### コンテンツ更新設計

- publishedAt は初回公開日時として固定し、原則として後から変更しない
- updatedAt は本文またはメタ情報に実質的変更があった場合に更新する
- 一覧の並び順は date（公開日）を基準とし、記事詳細では updatedAt を補助表示して更新状況を伝える
- 更新履歴は任意機能とし、必要な記事のみ「更新履歴」セクションで差分要約を管理する

### slugルール

- slugは一意であること
- 同一slugのディレクトリは作成禁止

### 画像ルール

- 画像は記事ディレクトリ内で相対パス参照する
- Markdown内では ./image.png の形式で参照する
- 画像が存在しない場合でもレンダリングは壊さない
- 複数画像を扱う場合は cover.png, image-01.png, image-02.png の命名規則を推奨する

### キャッシュ戦略

- HTMLは短TTL
- 静的アセットは長TTL
- Markdown更新時は必ず再ビルドされること

目的。

- 更新とパフォーマンスの両立

### ルーティングエラー対応

- 存在しないslugは404ページを表示する
- データが存在しない場合はエラーUIを表示する
- 記事詳細が見つからない場合は「記事が見つかりませんでした」を表示する
- 一覧取得失敗時は「現在、更新情報を取得できません」を表示する

### 公開制御

- draft: true の記事は一覧に表示しない
- 公開前の記事を管理できるようにする