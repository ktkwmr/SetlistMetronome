# Setlist Metronome

曲ごとにテンポ・拍子・ビート・音色を保存して切り替えられるメトロノームの Web アプリ。公開 URL: https://ktkwmr.com/setlistmetronome/ （日本語: /setlistmetronome/ja/）
構成・開発・デプロイの詳細は README.md を参照。

## 共通ベースライン
- 独自機能以外の共通項目は ktkwmr/webapp-baseline（非公開）の WEBAPP_BASELINE.md に従う。
  セッションに無ければ add_repo（read。更新するときは push）で追加して読む。
- 各項目の状態は docs/baseline-status.md に記録する。
- どのアプリにも当てはまる新しい作業・設定・落とし穴が出てきたら、作業の最後に
  ベースラインへの追記案を出す（ユーザーが了承したらベースラインのリポジトリに PR）。
- 共通部分のファイル（`wrangler.jsonc`、`public/_headers`、`sw.js`、workflows など）を直したら、`webapp-baseline/templates/` の同じファイルも直す案を出す。
- 独自機能（曲リスト・テンポ・拍子・ビート・音・スケジューラ）の変更だけなら追記は不要。

## このアプリの値
- スラッグ: `setlistmetronome` / ドメイン: `ktkwmr.com` / 言語: en（既定）+ ja（`/ja/`）
- 運営者: ktkwmr / 問い合わせ: GitHub Issues
- Cloudflare Web Analytics token: `5c53079cb9a64d819d1ca53e8533ca63`（ChordTransposer・GuitarChordFinder と同じサイト）
- ホスティング: Cloudflare Workers 静的アセット。ドメインの 3 つ目のアプリなので、別 Worker に Route `ktkwmr.com/setlistmetronome*` だけを割り当てる（ベースライン §0 の A）。
  ドメイン直下（`/`、`robots.txt`、ルートの `sitemap.xml`、`_redirects`、ルートの 404）は ChordTransposer の Worker にある。このアプリの sitemap は `/setlistmetronome/sitemap.xml`。
  ベースライン §0 の A では「アプリが 3 つ以上になったら、ドメイン直下だけを持つ小さなリポジトリに分ける」とされている（未対応・要判断）。

## ルール
- 手で編集するのはアプリ本体 `public/setlistmetronome/index.html`（と `timer.js`）と `scripts/`。生成ファイル（`public/setlistmetronome/ja/index.html`、記事・情報ページ `<slug>/` とその `ja/`、`public/setlistmetronome/sitemap.xml`）は編集せず、`node scripts/build-ja.mjs` と `node scripts/build-pages.mjs` で作り直す（`--check` で確認）。
- 画面の文言は `index.html` の `I18N`（en / ja）に書き、要素には `data-i18n` / `data-i18n-html` / `data-i18n-attr` を付ける（`build-ja.mjs` が日本語ページの本文を置き換える）。JS で作る文言は `t()` を使う。子要素を持つ要素に `data-i18n` は付けない（`build-ja.mjs` が止まる）。
- 曲リストは `localStorage` の `setlistmetronome-state` に保存する。読み込んだ値は `sanitize()` で検証してから使う。保存形式を変えるときは古い形式も読めるようにする。
- 記事の表は手で書かず `scripts/pages/metronome.mjs` で計算する。ここのテンポ記号・拍子・ビートの規則はアプリ（`index.html` の `tempoTerm`・`isCompound`・`defaultAccents`・`SUBS`）と同じでなければならず、`scripts/check-metronome.mjs`（`build-pages.mjs` が読み込む）が違いを見つけるとビルドが止まる。アプリ側を変えたら `metronome.mjs` と記事の本文も直す。
- 記事を追加・変更したら、PR のプレビューで人間が内容を確認してからマージする（ベースライン §10-7）。確認してほしい点を `docs/article-review.md` に書き、PR 本文にも載せる。見た目を変えたら `node scripts/render-guide-images.mjs` で画面写真を撮り直す。
- 外部ホストを足したら `public/_headers` の CSP と、プライバシーの説明（`scripts/pages/privacy.mjs`、アプリ内の `privacy.body`、README）を同じ PR で直す。
- 作業はブランチ → PR → Cloudflare のプレビュービルド確認 → squash マージ。
- 本番サイト・Cloudflare 管理画面・外部 CDN にはこの環境から届かないことが多い。確かめられなかったことは「未確認」と書き、ユーザーに確認手順を伝える。
