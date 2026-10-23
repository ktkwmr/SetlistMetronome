# ベースラインの実施状況（Setlist Metronome）

基準: WEBAPP_BASELINE.md（最終更新 2026-10-20 版）
状態: ✅ 実装済み / ⚠️ 一部 / ❌ 未実装 / 👤 待ち（人間の作業） / — 対象外

## 0. 変数

| 変数 | 値 |
|---|---|
| アプリ名 | Setlist Metronome |
| スラッグ | `setlistmetronome` |
| ドメイン | `ktkwmr.com`（3 つ目のアプリ。§0 の **A**: 別 Worker + Route `ktkwmr.com/setlistmetronome*`） |
| リポジトリ | `ktkwmr/SetlistMetronome`（公開） |
| 運営者・問い合わせ | ktkwmr / GitHub Issues |
| 言語 | en（既定）+ ja（`/ja/`） |
| Web Analytics token | ChordTransposer・GuitarChordFinder と同じ |

## 1. アカウント

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 1-1〜1-3, 1-5, 1-6 | アカウント類・開発環境 | ✅ | ChordTransposer で実施済み |
| 1-4 | Claude の GitHub App にリポジトリを許可 | 👤 待ち | 2026-10-20 時点ではローカルの gh CLI で作業。クラウドのセッションで使うときに必要 |
| 1-8 | Cloudflare の GitHub App にリポジトリを許可 | ✅ | 2026-10-20。Cloudflare の Import a repository に表示され、接続できた |

## 2. 土台とホスティング

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 2-1 | wrangler.jsonc | ✅ | `routes`・`workers_dev: false`・`preview_urls: true`・`previews: {}` |
| 2-2 | `/` → `/<slug>/` の転送 | — | ドメイン直下は `ktkwmr/ktkwmr.com`（2026-10-24 に ChordTransposer から分離） |
| 2-3 | 404.html | ✅ | `/setlistmetronome/` 以下の不明な URL で 404 を確認（`wrangler dev`） |
| 2-4 | .gitignore | ✅ | |
| 2-5 | .gitattributes（LF） | ✅ | |
| 2-6 | 生成スクリプトの `--check` | ✅ | `build-pages.mjs` は `check-metronome.mjs`（記事の計算とアプリの規則の一致）も実行 |
| 2-7 | README（英日） | ✅ | |
| 2-8 | LICENSE | ✅ | |
| 2-9 | CLAUDE.md | ✅ | |
| 2-10 | バージョン番号なし・キャッシュ名固定 | ✅ | |
| 2-11 | Cloudflare に接続・ルート設定 | ✅ | 2026-10-20 に接続して初回デプロイ（手動）。本番で全ページ 200、不明 URL は 404、CSP ヘッダーあり、ChordTransposer・GuitarChordFinder とドメイン直下に影響なしを確認 |
| 2-12 | キャッシュ | ✅ | |
| 2-13 | 自動デプロイの確認 | ✅ | 2026-10-20、#1 のマージで `main` のコミットに「Workers Builds: setlistmetronome」が付いて成功し、本番に反映されることを確認 |
| 2-14 | 同じドメインの 2 つ目以降のアプリ | ✅ | Sitemap 行は ChordTransposer の `robots.txt` に追加（ChordTransposer #20）。2026-10-24 から `ktkwmr/ktkwmr.com` の `robots.txt` に記載。§0 の A「ドメイン直下を別リポジトリに」は 2026-10-24 に対応（`ktkwmr/ktkwmr.com`） |

## 3. PWA

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 3-1 | manifest.json | ✅ | |
| 3-2 | アイコン一式 | ✅ | `scripts/render-icons.mjs` で icon.svg から生成 |
| 3-3 | PWA/iOS の meta | ✅ | |
| 3-4 | sw.js | ✅ | キャッシュ接頭辞 `setlistmetronome-`。CORE に `timer.js` を追加 |
| 3-5 | SW 登録 | ✅ | Edge で登録・キャッシュ・オフラインでの再読み込みを確認 |
| 3-6 | `file://` 不可の注意 | ✅ | README |
| 3-7 | インストール案内 | ❌ | 任意 |
| 3-8 | アイコンの生成スクリプト | ✅ | |

## 4. 多言語

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 4-1 | I18N と data-i18n | ✅ | JS で作る文言（セットリスト・ビート・音色・ボタン）も `t()` |
| 4-2 | 言語の決め方 | ✅ | |
| 4-3 | `/ja/` の自動生成 | ✅ | |
| 4-4 | 日本語の検索用タイトル・説明 | ✅ | `scripts/build-ja.mjs` 冒頭。2026-10-20 に確認済み |
| 4-5 | 和文の lang 固定 | — | 曲名はユーザーの入力のみ |
| 4-6 | 3 言語目 | — | |

## 5. SEO

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 5-1 | title / description | ✅ | |
| 5-2 | canonical / hreflang | ✅ | |
| 5-3 | OGP | ✅ | |
| 5-4 | og-image.png | ✅ | `scripts/og-image.html` |
| 5-5 | JSON-LD | ✅ | |
| 5-6 | robots.txt / sitemap.xml | ✅ | sitemap は `/setlistmetronome/sitemap.xml` に生成。Sitemap 行は ChordTransposer の `robots.txt` に追加（ChordTransposer #20）。2026-10-24 から `ktkwmr/ktkwmr.com` の `robots.txt` に記載 |
| 5-7 | `<h1>` | ✅ | ツールバーのアプリ名 |
| 5-8 | 画面に見える説明文 | ✅ | 冒頭の説明（無料・登録不要・オフライン） |
| 5-9 | リダイレクト | ✅ | |

## 6. セキュリティヘッダー

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 6-1〜6-3 | `_headers` と CSP | ✅ | 外部ホストは Cloudflare Web Analytics だけ。`worker-src 'self'`（timer.js） |
| 6-4 | CSP 違反 0 件 | ✅ | `wrangler dev` で全 16 ページ × 390px・1280px を確認。違反・コンソールエラー・横スクロールなし（解析の送信だけはローカルのオリジンのため CORS で失敗、本番では起きない） |
| 6-5 | Permissions-Policy の個別許可 | — | Web Audio と Wake Lock は許可不要 |

## 7. プライバシー・法務

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 7-1 | アプリ内のプライバシー | ✅ | セットリストの保存について記載 |
| 7-2 | プライバシーポリシー（日英） | ✅ | 制定日 2026-10-19 |
| 7-3 | 運営者情報（日英） | ✅ | |
| 7-4 | 問い合わせ窓口 | ⚠️ | GitHub Issues のみ（メール未設置） |
| 7-5 | 外部サービスの変更時の同時修正 | ✅ | CLAUDE.md にルール |
| 7-6 | 例のコンテンツ | ✅ | 画面写真の曲名は架空 |
| 7-7 | ポリシー内の外部リンク確認 | 👤 待ち | |

## 8. サードパーティライセンス

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 8-1 | THIRD_PARTY_LICENSES.md | ✅ | ライブラリなし（その旨を記載） |
| 8-2 | 自動追記スクリプト・Actions | ✅ | |
| 8-3 | About ダイアログで表示 | ✅ | |
| 8-4 | CDN のバージョン固定 | — | CDN 不使用 |

## 9. 共通 UI

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 9-1 | ⚙ 設定メニュー | ✅ | 使い方 / ガイド・記事 / プライバシー / このアプリについて |
| 9-2 | 使い方ダイアログ | ✅ | 最後に使い方ガイドへのリンク |
| 9-3 | 状態の保存・復元 | ✅ | `setlistmetronome-state`。`sanitize()` で検証してから復元。再生状態は保存しない（開いたときに鳴り出さない） |
| 9-4 | スマホ対応 | ✅ | スクロール型。スマホではメトロノームが上・セットリストが下。safe-area 対応、390px で横スクロールなし |
| 9-5〜9-7 | ファイル・印刷・保存 | — | |
| 9-8 | アクセシビリティ | ✅ | |
| 9-9 | 自動テスト | ⚠️ | 記事とアプリの規則の一致は `check-metronome.mjs` で検査。スケジューラなどの単体テストはなし |
| 9-10 | ボタンを押したときの反応 | ✅ | `.is-pressed` と `PRESSABLE`（PR #4）。押せないボタンとトグルは対象外 |
| 9-11 | ダイアログのフォーカス | ✅ | `openDlg`。閉じたら ⚙ に戻す（PR #4） |

## 10. 記事

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 10-1 | 生成の仕組み | ✅ | `PAGES` に 5 本、`INFO_PAGES` に about・privacy |
| 10-2 | 最初の記事 | ✅ | 使い方ガイド（画面写真付き）、テンポ記号と BPM、拍子の基本、シャッフルとハネのリズム、FAQ |
| 10-3 | 表は計算で生成 | ✅ | `scripts/pages/metronome.mjs`。アプリとの一致は `check-metronome.mjs` |
| 10-4 | 画面写真 | ✅ | `scripts/render-guide-images.mjs`（日英・PC・スマホ） |
| 10-5 | 導線 | ✅ | 記事末尾の「アプリを開く」、フッターに全記事、日英リンク、アプリの設定メニューと使い方から |
| 10-6 | スマホ幅のレビュー | ✅ | 390px で全 14 ページ、横スクロールなし |
| 10-7 | 内容の人間確認 | ✅ | 2026-10-20、記事 5 本の初版を本番で確認。以後も記事の変更は PR のプレビューで確認 |

## 11. アクセス解析

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 11-1 | サイト登録・token | ✅ | 同じサイト・同じ token |
| 11-2 | beacon と CSP | ✅ | アプリと生成ページ（404 以外） |
| 11-3 | プライバシーの記述 | ✅ | |
| 11-4 | 本番での送信確認 | 👤 待ち | |

## 12. CI

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 12-1 | Build generated pages | ✅ | |
| 12-2 | Update third-party licenses | ✅ | |
| 12-3 | ブランチ → PR → squash | ✅ | 初回コミットだけ main に直接 push |
| 12-4 | ローカル確認 | ✅ | |
| 12-5 | 生成ファイルを編集しない | ✅ | README・CLAUDE.md |
| 12-6, 12-7 | wrangler dev の ETag・長いパス | — | 今回は別の原因でつまずいた: ほかのアプリの `wrangler dev` がポート 8787 で動いたままで、全ページが 404 に見えた。`--port` で別のポートにして解消（ベースラインへの追記案あり） |
| 12-8 | プレビュー URL の探し方 | — | 人間の作業。Cloudflare のビルドページの「Visit」から開き、末尾に `/setlistmetronome/` を付ける |

## 13〜15

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 13-1 | 本番デプロイ | ✅ | 2026-10-20 |
| 13-4 | GitHub の About | ✅ | Description・Website・Topics を gh CLI で設定 |
| 13-2, 13-3 | 本番の動作確認・iPhone 実機 | ✅ | 2026-10-20 |
| 14-1, 14-2 | Search Console（サイトマップ送信） | ✅ | 2026-10-20 |

13・14 のその他は 👤 待ち（下の表）。15（AdSense）は未着手。

## 人間の作業（未完了）

| # | 内容 | 手順 | 終わったかの確かめ方 |
|---|---|---|---|
| 1 | 解析の送信確認（11-4） | 本番で DevTools → Network を `cloudflareinsights` で絞る | `beacon.min.js` が 200、`rum` が 204 |
| 2 | ポリシー内の外部リンク（7-7） | プライバシーポリシーの Cloudflare へのリンクを開く | ページが開く |
| 3 | Claude の GitHub App にリポジトリを許可（1-4） | https://github.com/settings/installations → Claude → Configure → Repository access に `SetlistMetronome` を追加（クラウドのセッションで使うとき） | 一覧にリポジトリが出る |
