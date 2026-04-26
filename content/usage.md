# content の書き方

## 配置ルール

- 記事は `content/<type>/<slug>/text.md` に置く
- `<type>` は `blog` / `lab` / `note`
- `<slug>` はフォルダ名と一致させる
- 1 記事につき 1 フォルダ、本文は必ず `text.md`

## frontmatter

必須項目は以下。

```md
---
title: "記事タイトル"
date: "2026-04-26"
type: "Lab"
slug: "ii-ai-winter-2025"
draft: false
summary: "1 行で要点が分かる説明"
---
```

- `type` は `Blog` / `Lab` / `Note`
- `slug` は URL と一覧表示に使う識別子
- `draft: true` の記事はサイトに出ない

## 本文の書き方

- 見出し、箇条書き、引用、コードブロックは通常の Markdown で書く
- リンクは `[表示テキスト](https://example.com)` を使う
- 生の URL も自動でリンク化されるが、表示名を変えたいときは Markdown のリンク記法を使う

## 例

```md
## 概要

詳細は [IEEE Xplore](https://ieeexplore.ieee.org/document/11418372) を参照。

関連リンク: https://example.com
```
