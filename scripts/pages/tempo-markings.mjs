// Tempo markings and BPM. The ranges and all numbers in the tables are calculated from metronome.mjs.
import { wideTable } from "./layout.mjs";
import { TEMPO_TERMS, MAX_BPM, beatMs, ms } from "./metronome.mjs";

const MEANING = {
  Grave: { en: "Very slow and solemn", ja: "重々しく、非常に遅く" },
  Largo: { en: "Broad, slow", ja: "幅広く、ゆるやかに" },
  Larghetto: { en: "A little less slow than largo", ja: "ラルゴより少し速く" },
  Adagio: { en: "Slow, at ease", ja: "ゆるやかに、落ち着いて" },
  Andante: { en: "At a walking pace", ja: "歩くような速さで" },
  Moderato: { en: "Moderate", ja: "中くらいの速さで" },
  Allegro: { en: "Fast, bright", ja: "速く、快活に" },
  Vivace: { en: "Lively and fast", ja: "活発に、速く" },
  Presto: { en: "Very fast", ja: "非常に速く" },
  Prestissimo: { en: "As fast as possible", ja: "できるだけ速く" },
};

const ranges = TEMPO_TERMS.map(([name, from], i) => ({ name, from, to: i + 1 < TEMPO_TERMS.length ? TEMPO_TERMS[i + 1][1] - 1 : MAX_BPM }));

function termsTable(lang) {
  const h = lang === "ja" ? ["テンポ記号", "意味", "このアプリでの BPM"] : ["Marking", "Meaning", "BPM in this app"];
  const rows = ranges
    .map((r) => `      <tr><th scope="row"><i>${r.name}</i></th><td data-label="${h[1]}${lang === "ja" ? "：" : ":"}">${MEANING[r.name][lang]}</td><td class="num" data-label="${h[2]}${lang === "ja" ? "：" : ":"}">${r.from}–${r.to}</td></tr>`)
    .join("\n");
  return `<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">${h[0]}</th><th scope="col">${h[1]}</th><th scope="col">${h[2]}</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>`;
}

const BPMS = [60, 72, 80, 90, 100, 120, 140, 160, 180];
function msTable(lang) {
  const h = lang === "ja"
    ? ["BPM", "1 拍（4 分音符）", "8 分音符", "3 連符", "16 分音符"]
    : ["BPM", "Beat (quarter)", "8th", "Triplet", "16th"];
  const rows = BPMS.map((b) => {
    const q = beatMs(b);
    return `      <tr><th scope="row" class="num">${b}</th>${[q, q / 2, q / 3, q / 4].map((x) => `<td class="num">${ms(x)}</td>`).join("")}</tr>`;
  }).join("\n");
  return wideTable(lang, `  <table>
    <thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>`);
}

const TARGETS = [100, 120, 140, 160, 180];
const SHARES = [0.7, 0.8, 0.9];
function practiceTable(lang) {
  const h = lang === "ja" ? ["目標の BPM", ...SHARES.map((s) => `${s * 100}%`)] : ["Target BPM", ...SHARES.map((s) => `${s * 100}%`)];
  const rows = TARGETS.map((b) => `      <tr><th scope="row" class="num">${b}</th>${SHARES.map((s) => `<td class="num">${Math.round(b * s)}</td>`).join("")}</tr>`).join("\n");
  return `<div class="table-wrap">
  <table>
    <thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>`;
}

export default {
  slug: "tempo-markings",
  en: {
    title: "Tempo Markings and BPM: Largo, Andante, Allegro, Presto",
    heading: "Tempo markings and BPM",
    nav: "Tempo markings and BPM",
    description:
      "What BPM means, the BPM ranges of tempo markings from Grave and Largo to Allegro and Presto, how long a beat lasts at each tempo, and how to choose a slower practice tempo.",
    body: () => `
<p class="lead">BPM (beats per minute) is the number of beats in one minute. Tempo markings such as <i>Andante</i> and <i>Allegro</i> describe a speed in words. This page shows how the two relate.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#bpm">What BPM means</a></li>
  <li><a href="#markings">Tempo markings and their BPM</a></li>
  <li><a href="#ms">How long one beat lasts</a></li>
  <li><a href="#practice">Choosing a practice tempo</a></li>
</ol></nav>

<h2 id="bpm">What BPM means</h2>
<p>At 60 BPM, there is one beat every second. At 120 BPM, there are two beats every second. The beat is the note in the bottom number of the time signature: a quarter note in 4/4, and an eighth note in 6/8 (see <a href="../time-signatures/">time signatures explained</a>).</p>

<h2 id="markings">Tempo markings and their BPM</h2>
<p>Under the BPM, Setlist Metronome shows the tempo marking for that speed. These are the ranges it uses:</p>
${termsTable("en")}
<div class="note">
  <p>Tempo markings are older than the metronome, and they describe the character of the music as well as its speed. Different books and metronomes give slightly different ranges, and the right tempo for a piece also depends on the meter and the style. Use the table as a rough guide. When the music gives a number (such as ♩ = 96), use the number.</p>
</div>

<h2 id="ms">How long one beat lasts</h2>
<p>The time between notes, in milliseconds (1000 ms = 1 second). It helps when you set the delay of an effect pedal, or to see how much less time you have at a faster tempo.</p>
${msTable("en")}
<p class="cap">Rounded to the nearest millisecond. The beat is a quarter note.</p>

<h2 id="practice">Choosing a practice tempo</h2>
<p>A common way to learn a hard passage is to start below the target tempo and raise it step by step once you can play it cleanly. These are 70%, 80%, and 90% of some target tempos:</p>
${practiceTable("en")}
<p>In Setlist Metronome, select the song, tap <b>Duplicate</b>, and lower the tempo of the copy. Then you can switch between the practice tempo and the real tempo with one tap.</p>
`,
  },
  ja: {
    title: "テンポ記号と BPM の目安（ラルゴ・アンダンテ・アレグロ・プレスト）",
    heading: "テンポ記号と BPM の目安",
    nav: "テンポ記号と BPM の目安",
    description:
      "BPM の意味、Grave・Largo から Allegro・Presto までのテンポ記号の BPM の目安、テンポごとの 1 拍の長さ（ミリ秒）、練習用に遅いテンポを決める方法をまとめました。",
    body: () => `
<p class="lead">BPM（beats per minute）は、1 分間の拍の数です。<i>Andante</i> や <i>Allegro</i> などのテンポ記号は、速さを言葉で表します。このページでは、この 2 つの関係を説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#bpm">BPM とは</a></li>
  <li><a href="#markings">テンポ記号と BPM</a></li>
  <li><a href="#ms">1 拍の長さ</a></li>
  <li><a href="#practice">練習用のテンポの決め方</a></li>
</ol></nav>

<h2 id="bpm">BPM とは</h2>
<p>60 BPM なら 1 秒に 1 拍、120 BPM なら 1 秒に 2 拍です。「1 拍」は拍子の分母の音符で、4/4 なら 4 分音符、6/8 なら 8 分音符です（<a href="../time-signatures/">拍子の基本</a>を参照）。</p>

<h2 id="markings">テンポ記号と BPM</h2>
<p>Setlist Metronome は、BPM の下にその速さのテンポ記号を表示します。使っている範囲は次のとおりです。</p>
${termsTable("ja")}
<div class="note">
  <p>テンポ記号はメトロノームより古くからあり、速さだけでなく曲の性格も表します。本やメトロノームによって範囲は少しずつ違い、ふさわしいテンポは拍子や曲のスタイルによっても変わります。表はおおよその目安として使ってください。楽譜に数字（♩ = 96 など）があれば、その数字に合わせます。</p>
</div>

<h2 id="ms">1 拍の長さ</h2>
<p>音と音の間隔をミリ秒（1000 ミリ秒 = 1 秒）で表しました。エフェクターのディレイタイムを合わせるときや、テンポが上がるとどれだけ時間が短くなるかを知りたいときに使えます。</p>
${msTable("ja")}
<p class="cap">1 ミリ秒未満は四捨五入。1 拍は 4 分音符です。</p>

<h2 id="practice">練習用のテンポの決め方</h2>
<p>難しいところを練習するときは、目標より遅いテンポから始めて、きれいに弾けたら少しずつ上げていく方法がよく使われます。目標のテンポの 70%・80%・90% は次のとおりです。</p>
${practiceTable("ja")}
<p>Setlist Metronome では、曲を選んで<b>複製</b>を押し、コピーのテンポを下げておくと、練習用のテンポと本番のテンポをワンタップで切り替えられます。</p>
`,
  },
};
