// Shuffle and swing. Note positions and timings are calculated from metronome.mjs (the app's rhythm rules).
import { wideTable } from "./layout.mjs";
import { SUBS, beatMs, ms } from "./metronome.mjs";

// Swing settings shown in the tables (the app's slider goes from 55% to 75%)
const SWINGS = [0.5, 0.6, 0.67, 0.75];
const pct = (s) => `${Math.round(s * 100)}%`;
const LABEL = {
  en: { 0.5: "50% (straight)", 0.6: "60%", 0.67: "67% (triplet)", 0.75: "75% (dotted)" },
  ja: { 0.5: "50%（ハネなし）", 0.6: "60%", 0.67: "67%（3連符）", 0.75: "75%（付点）" },
};

// Where the second 8th note falls, in ms after the beat
const BPMS = [80, 100, 120, 140, 160];
function offbeatTable(lang) {
  const h0 = lang === "ja" ? "BPM ＼ ハネ具合" : "BPM \\ swing";
  const rows = BPMS.map((b) => `      <tr><th scope="row" class="num">${b}</th>${SWINGS.map((s) => `<td class="num">${ms(SUBS.shuf(s)[1] * beatMs(b))}</td>`).join("")}</tr>`).join("\n");
  return wideTable(lang, `  <table>
    <thead><tr><th scope="col">${h0}</th>${SWINGS.map((s) => `<th scope="col">${LABEL[lang][s]}</th>`).join("")}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>`);
}

// A text picture of one beat: where the notes fall on a 24-step line
function picture(positions) {
  // ASCII only: ● and · are full width in many Japanese fonts and would break the alignment
  const line = Array(24).fill("-");
  positions.forEach((p) => { line[Math.round(p * 24)] = "X"; });
  return line.join("");
}
const pictures = (lang) => {
  const rows = [
    [lang === "ja" ? "8ビート" : "8ths", SUBS[8]()],
    [lang === "ja" ? "3連符" : "Triplets", SUBS.trip()],
    [lang === "ja" ? "シャッフル 67%" : "Shuffle 67%", SUBS.shuf(0.67)],
    [lang === "ja" ? "シャッフル 60%" : "Shuffle 60%", SUBS.shuf(0.6)],
    [lang === "ja" ? "16ビート" : "16ths", SUBS[16]()],
    [lang === "ja" ? "16シャッフル 67%" : "16th shuffle 67%", SUBS.shuf16(0.67)],
  ];
  // Labels in their own column: Japanese text does not line up in a monospace <pre>
  const body = rows.map(([n, p]) => `      <tr><th scope="row">${n}</th><td><code>|${picture(p)}|</code></td></tr>`).join("\n");
  return `<div class="table-wrap">
  <table class="rhythm">
    <tbody>
${body}
    </tbody>
  </table>
</div>`;
};

export default {
  slug: "shuffle-and-swing",
  en: {
    title: "Shuffle and Swing Rhythm: What the Swing Percentage Means",
    heading: "Shuffle and swing",
    nav: "Shuffle and swing",
    description:
      "How a shuffle differs from straight 8ths and triplets, what swing percentages such as 60% and 67% mean, where the off-beat falls in milliseconds at each tempo, and how to practice a shuffle with a metronome.",
    body: () => `
<p class="lead">In a shuffle, each beat is split into a long note and a short note instead of two equal ones. How long the first note is decides how much the rhythm “swings”.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#what">Straight, triplets, and shuffle</a></li>
  <li><a href="#percent">What the swing percentage means</a></li>
  <li><a href="#timing">Where the off-beat falls</a></li>
  <li><a href="#practice">Practicing a shuffle</a></li>
</ol></nav>

<h2 id="what">Straight, triplets, and shuffle</h2>
<p>This picture shows one beat from left to right. X marks where a note falls in each rhythm of the app:</p>
${pictures("en")}
<ul>
  <li><b>Straight 8ths</b> split the beat in half.</li>
  <li><b>Triplets</b> split it into three equal parts.</li>
  <li><b>A triplet shuffle</b> plays the first and third note of the triplet and leaves out the middle one, so the off-beat comes late.</li>
  <li><b>A 16th shuffle</b> swings each half of the beat in the same way. It is common in funk and in “half-time shuffle” grooves.</li>
</ul>

<h2 id="percent">What the swing percentage means</h2>
<p>The percentage is how far into the beat (or the half beat, for a 16th shuffle) the off-beat note falls:</p>
<ul>
  <li><b>50%</b> – exactly halfway: straight 8ths, no swing. (Choose 8ths in the app for this.)</li>
  <li><b>About 67%</b> – two thirds of the beat: the triplet shuffle used in blues and much of rock and jazz. The app's 67% is within 0.4% of an exact triplet (66.7%).</li>
  <li><b>75%</b> – three quarters: a dotted-8th-and-16th rhythm, a sharper, more marching feel.</li>
  <li><b>55–62%</b> – a light swing, often heard in pop, hip-hop, and laid-back grooves.</li>
</ul>

<h2 id="timing">Where the off-beat falls</h2>
<p>The time from the beat to the off-beat note, in milliseconds:</p>
${offbeatTable("en")}
<p class="cap">Rounded to the nearest millisecond. At slow tempos the difference between swing settings is easy to hear; at fast tempos it shrinks to a few tens of milliseconds, and many players swing less.</p>

<h2 id="practice">Practicing a shuffle</h2>
<ol>
  <li>Start with <b>Triplets</b> and count “1-trip-let, 2-trip-let”. Play only on the first and last note of each group.</li>
  <li>Switch to <b>Shuffle</b> at 67%. You should hear the same notes without the middle one.</li>
  <li>Lower the in-between volume, or set it to 0%, and keep the swing yourself.</li>
  <li>To match a recording, try a few swing settings and keep the one that feels right. Save it with the song.</li>
</ol>
`,
  },
  ja: {
    title: "シャッフルとハネのリズム：ハネ具合（スウィング率）の意味",
    heading: "シャッフルとハネのリズム",
    nav: "シャッフルとハネのリズム",
    description:
      "シャッフルとイーブンの 8 分音符・3連符の違い、ハネ具合（スウィング率）60%・67% などの意味、テンポごとに裏拍がどこに来るか（ミリ秒）、メトロノームでのシャッフルの練習方法を説明します。",
    body: () => `
<p class="lead">シャッフルでは、1 拍を同じ長さの 2 つではなく、長い音と短い音に分けます。最初の音をどれだけ長くするかで、リズムの「ハネ」の強さが決まります。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#what">イーブン・3連符・シャッフル</a></li>
  <li><a href="#percent">ハネ具合のパーセントの意味</a></li>
  <li><a href="#timing">裏拍が来るタイミング</a></li>
  <li><a href="#practice">シャッフルの練習方法</a></li>
</ol></nav>

<h2 id="what">イーブン・3連符・シャッフル</h2>
<p>1 拍を左から右に表し、アプリの各ビートで音が鳴る位置を X で示しました。</p>
${pictures("ja")}
<ul>
  <li><b>8ビート（イーブン）</b>は、1 拍をちょうど半分に分けます。</li>
  <li><b>3連符</b>は、1 拍を均等に 3 つに分けます。</li>
  <li><b>3連符のシャッフル</b>は、3連符の 1 つめと 3 つめだけを鳴らし、真ん中を抜きます。そのため裏拍が遅れて聞こえます。</li>
  <li><b>16シャッフル</b>は、半拍ずつを同じようにハネさせます。ファンクや、いわゆるハーフタイム・シャッフルでよく使われます。</li>
</ul>

<h2 id="percent">ハネ具合のパーセントの意味</h2>
<p>パーセントは、裏拍の音が 1 拍（16シャッフルでは半拍）のどの位置に来るかを表します。</p>
<ul>
  <li><b>50%</b> – ちょうど半分。ハネのないイーブンの 8 分音符です（アプリでは 8ビートを選びます）。</li>
  <li><b>約 67%</b> – 1 拍の 3 分の 2。ブルースや、ロック・ジャズの多くで使われる 3連符のシャッフルです。アプリの 67% は、正確な 3連符（66.7%）との差が 0.4% 以内です。</li>
  <li><b>75%</b> – 4 分の 3。付点 8 分音符＋16 分音符のリズムで、より角ばった、行進のような感じになります。</li>
  <li><b>55〜62%</b> – 軽いハネ。ポップスやヒップホップ、ゆったりしたグルーヴでよく聞かれます。</li>
</ul>

<h2 id="timing">裏拍が来るタイミング</h2>
<p>拍の頭から裏拍の音までの時間を、ミリ秒で示しました。</p>
${offbeatTable("ja")}
<p class="cap">1 ミリ秒未満は四捨五入。遅いテンポではハネ具合の違いがはっきり聞こえますが、速いテンポでは差が数十ミリ秒に縮まり、ハネを浅くして演奏することも多くなります。</p>

<h2 id="practice">シャッフルの練習方法</h2>
<ol>
  <li>まず<b>3連符</b>にして、「1-ト-リ、2-ト-リ」と数えます。各まとまりの最初と最後の音だけを弾きます。</li>
  <li><b>シャッフル</b>（67%）に切り替えます。真ん中の音が抜けた、同じ位置の音が聞こえるはずです。</li>
  <li>細かい音の音量を下げるか 0% にして、自分でハネを保ちます。</li>
  <li>音源に合わせるときは、いくつかのハネ具合を試して、しっくりくるものを曲と一緒に保存しておきます。</li>
</ol>
`,
  },
};
