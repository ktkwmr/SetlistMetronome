// Operator information (site information page, linked from the footer)
const ISSUES = "https://github.com/ktkwmr/SetlistMetronome/issues";
const REPO = "https://github.com/ktkwmr/SetlistMetronome";

export default {
  slug: "about",
  schemaType: "AboutPage",
  modified: "2026-10-19",
  en: {
    title: "About This Site",
    heading: "About this site",
    nav: "About this site",
    description: "Operator information for Setlist Metronome: who runs the site, how to contact us, disclaimer, and copyright.",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">Site name</th><td>Setlist Metronome</td></tr>
      <tr><th scope="row">URL</th><td><a href="/setlistmetronome/">https://ktkwmr.com/setlistmetronome/</a></td></tr>
      <tr><th scope="row">Operator</th><td>ktkwmr (individual developer)</td></tr>
      <tr><th scope="row">What we offer</th><td>A free web app: a metronome that saves the tempo, time signature, rhythm, and sound for each song in a setlist</td></tr>
      <tr><th scope="row">Contact</th><td><a href="${ISSUES}" rel="noopener">GitHub Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">Contact</h2>
<p>For questions, bug reports, and suggestions, please open an issue on <a href="${ISSUES}" rel="noopener">GitHub Issues</a>. A GitHub account (free) is required.</p>
<p>Issues are public. Do not include personal information. If the timing or a sound seems wrong, the settings (for example <code>120 BPM, 6/8, shuffle, drums</code>), your browser, and your device are enough.</p>

<h2 id="disclaimer">Disclaimer</h2>
<ul>
  <li>We try to make the app accurate, but we do not guarantee that its timing, sounds, or the information on this site are correct or complete. Timing can vary with your device, browser, and Bluetooth headphones or speakers.</li>
  <li>We are not responsible for any loss or damage resulting from the use of this site.</li>
  <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
  <li>The content of this site may be changed or removed, and the service may be stopped, without notice.</li>
</ul>

<h2 id="copyright">Copyright</h2>
<ul>
  <li>The app's source code is published under the <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT License</a>. Libraries used by the app are listed under Settings → About in the app.</li>
  <li>The text and images on this site are © 2026 ktkwmr.</li>
</ul>

<h2 id="privacy">Privacy</h2>
<p>How this site handles information is described in the <a href="../privacy/">privacy policy</a>.</p>
`,
  },
  ja: {
    title: "運営者情報",
    heading: "運営者情報",
    nav: "運営者情報",
    description: "Setlist Metronome の運営者情報。運営者、お問い合わせ先、免責事項、著作権について。",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">サイト名</th><td>Setlist Metronome</td></tr>
      <tr><th scope="row">URL</th><td><a href="/setlistmetronome/ja/">https://ktkwmr.com/setlistmetronome/ja/</a></td></tr>
      <tr><th scope="row">運営者</th><td>ktkwmr（個人開発者）</td></tr>
      <tr><th scope="row">内容</th><td>セットリストの曲ごとにテンポ・拍子・ビート・音色を保存できる、無料のメトロノーム Web アプリ</td></tr>
      <tr><th scope="row">お問い合わせ</th><td><a href="${ISSUES}" rel="noopener">GitHub の Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">お問い合わせ</h2>
<p>ご質問・不具合の報告・ご要望は、<a href="${ISSUES}" rel="noopener">GitHub の Issues</a> にお寄せください。投稿には GitHub のアカウント（無料）が必要です。</p>
<p>Issues の内容は公開されます。個人情報は書かないでください。リズムや音がおかしいときは、設定（例: <code>120 BPM・6/8・シャッフル・ドラム</code>）とブラウザ・端末の種類があれば十分です。</p>

<h2 id="disclaimer">免責事項</h2>
<ul>
  <li>アプリの内容はできるだけ正確になるよう努めていますが、リズムの正確さ・音・本サイトの情報が正確・完全であることを保証するものではありません。リズムのずれ方は、端末・ブラウザ・Bluetooth のイヤホンやスピーカーによって変わることがあります。</li>
  <li>本サイトの利用によって生じた損害について、運営者は責任を負いません。</li>
  <li>本サイトからリンクしている外部サイトの内容について、運営者は責任を負いません。</li>
  <li>本サイトの内容は、予告なく変更・削除したり、提供を終了したりすることがあります。</li>
</ul>

<h2 id="copyright">著作権</h2>
<ul>
  <li>アプリのソースコードは <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT ライセンス</a>で公開しています。アプリが使用しているライブラリは、アプリの「設定 → このアプリについて」に掲載しています。</li>
  <li>本サイトの文章と画像の著作権は ktkwmr に帰属します（© 2026 ktkwmr）。</li>
</ul>

<h2 id="privacy">プライバシー</h2>
<p>本サイトでの情報の取り扱いについては<a href="../privacy/">プライバシーポリシー</a>をご覧ください。</p>
`,
  },
};
