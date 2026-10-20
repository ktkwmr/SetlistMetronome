// Time signatures. The default accents and the tempo conversions are calculated from metronome.mjs.
import { defaultAccents, isCompound, MAX_BPM } from "./metronome.mjs";

// ● accent, ○ normal (the app's black and white circles)
const dots = (acc) => `<code>${acc.map((a) => (a === 2 ? "●" : "○")).join(" ")}</code>`;

const METERS = [[2, 4], [3, 4], [4, 4], [2, 2], [5, 4], [6, 8], [7, 8], [9, 8], [12, 8]];
const FEEL = {
  en: {
    "2/4": "2 beats; marches, polkas", "3/4": "3 beats; waltzes", "4/4": "4 beats; most pop and rock", "2/2": "2 half-note beats (cut time)",
    "5/4": "5 beats, often felt as 3+2 or 2+3", "6/8": "2 beats of 3 eighths each", "7/8": "7 eighths, often 2+2+3",
    "9/8": "3 beats of 3 eighths each", "12/8": "4 beats of 3 eighths each; slow blues, ballads",
  },
  ja: {
    "2/4": "2 拍。マーチ、ポルカなど", "3/4": "3 拍。ワルツなど", "4/4": "4 拍。ポップス・ロックの多く", "2/2": "2 分音符で 2 拍（2 分の 2 拍子）",
    "5/4": "5 拍。3+2 や 2+3 で感じることが多い", "6/8": "8 分音符 3 つずつの 2 拍", "7/8": "8 分音符 7 つ。2+2+3 などに分ける",
    "9/8": "8 分音符 3 つずつの 3 拍", "12/8": "8 分音符 3 つずつの 4 拍。スローブルース、バラードなど",
  },
};

function meterTable(lang) {
  const h = lang === "ja" ? ["拍子", "感じ方", "アプリの初期のアクセント"] : ["Signature", "How it is felt", "Default accents in the app"];
  const sep = lang === "ja" ? "：" : ":";
  const rows = METERS.map(([n, d]) => {
    const k = `${n}/${d}`;
    return `      <tr><th scope="row" class="num">${k}</th><td data-label="${h[1]}${sep}">${FEEL[lang][k]}</td><td data-label="${h[2]}${sep}">${dots(defaultAccents(n, d))}</td></tr>`;
  }).join("\n");
  return `<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">${h[0]}</th><th scope="col">${h[1]}</th><th scope="col">${h[2]}</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>`;
}

// A compound-meter tempo given for the dotted quarter, converted to the eighth-note BPM the app counts in 6/8
const DOTTED = [40, 50, 60, 70, 80, 90, 100];
function dottedTable(lang) {
  const h = lang === "ja" ? ["♩. =（付点 4 分音符）", "6/8 で設定する BPM（♪）"] : ["♩. = (dotted quarter)", "BPM to set in 6/8 (♪)"];
  const rows = DOTTED.map((b) => `      <tr><td class="num">${b}</td><td class="num">${b * 3 <= MAX_BPM ? b * 3 : "–"}</td></tr>`).join("\n");
  return `<div class="table-wrap">
  <table>
    <thead><tr><th scope="col">${h[0]}</th><th scope="col">${h[1]}</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>`;
}

// Odd meters: suggested accent groupings (set by tapping the circles)
const group = (parts) => parts.flatMap((p) => [2, ...Array(p - 1).fill(1)]);
const ODD = [
  ["5/4", [3, 2]], ["5/4", [2, 3]], ["7/8", [2, 2, 3]], ["7/8", [3, 2, 2]],
];
const oddList = (lang) =>
  `<ul>\n${ODD.map(([m, parts]) => `  <li><b>${m}</b> ${parts.join("+")}: ${dots(group(parts))}</li>`).join("\n")}\n</ul>`;

if (!isCompound(6, 8) || isCompound(6, 4)) throw new Error("time-signatures.mjs: isCompound changed; check the text");

export default {
  slug: "time-signatures",
  en: {
    title: "Time Signatures Explained: 4/4, 3/4, 6/8, and Odd Meters",
    heading: "Time signatures explained",
    nav: "Time signatures explained",
    description:
      "What the two numbers of a time signature mean, simple and compound meters (4/4, 3/4, 6/8, 12/8), how to set the tempo of a 6/8 song on a metronome, cut time, and accent patterns for 5/4 and 7/8.",
    body: () => `
<p class="lead">A time signature tells you how many beats are in a bar and which note gets one beat. Knowing this is all you need to set a metronome for any song.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#numbers">The two numbers</a></li>
  <li><a href="#common">Common time signatures</a></li>
  <li><a href="#compound">6/8 and other compound meters</a></li>
  <li><a href="#cut">Cut time (2/2)</a></li>
  <li><a href="#odd">5/4, 7/8, and other odd meters</a></li>
</ol></nav>

<h2 id="numbers">The two numbers</h2>
<ul>
  <li><b>Top number</b> – how many beats are in one bar.</li>
  <li><b>Bottom number</b> – which note gets one beat: 2 is a half note, 4 a quarter note, 8 an eighth note, and 16 a sixteenth note.</li>
</ul>
<p>So 3/4 means three quarter-note beats in a bar. In Setlist Metronome, BPM always counts the bottom note, and the number of beat circles is the top number.</p>

<h2 id="common">Common time signatures</h2>
${meterTable("en")}
<p class="cap">● is an accent (a black circle in the app) and ○ a normal beat. Tap a circle in the app to change it.</p>

<h2 id="compound">6/8 and other compound meters</h2>
<p>In 6/8, 9/8, and 12/8, the eighth notes are grouped in threes, and each group is felt as one beat. A 6/8 song is felt “in two”, not in six. That is why the app accents the first eighth note of every group.</p>
<p>Sheet music for these meters often gives the tempo for the dotted quarter (♩.), which is one group. Because the app counts the bottom note, multiply by 3:</p>
${dottedTable("en")}
<p class="cap">Above 100, the eighth-note tempo would pass ${MAX_BPM}, the app's maximum.</p>
<p>Another way: set 2/4 (or 3/4 for 9/8, 4/4 for 12/8) at the dotted-quarter tempo, and choose <b>Triplets</b>. You hear the same notes, with fewer clicks to follow at slow tempos.</p>

<h2 id="cut">Cut time (2/2)</h2>
<p>2/2 has two half-note beats in a bar. It looks like 4/4 on paper but is felt in two. ♩ = 120 in 4/4 is the same speed as 𝅗𝅥 = 60 in 2/2. Set 2/2 and halve the quarter-note tempo, or keep 4/4 at the quarter-note tempo if you prefer to hear every quarter note.</p>

<h2 id="odd">5/4, 7/8, and other odd meters</h2>
<p>Odd meters are usually felt as groups of twos and threes. The app's default accents only the first beat, so tap the circles to accent the start of each group. For example:</p>
${oddList("en")}
<p>Check the grouping against a recording; the same time signature can be grouped differently in different songs.</p>
`,
  },
  ja: {
    title: "拍子の基本：4/4・3/4・6/8 と変拍子の数え方",
    heading: "拍子の基本",
    nav: "拍子の基本",
    description:
      "拍子の 2 つの数字の意味、単純拍子と複合拍子（4/4・3/4・6/8・12/8）、6/8 の曲をメトロノームで設定する方法、2/2 拍子、5/4・7/8 などの変拍子のアクセントの付け方を説明します。",
    body: () => `
<p class="lead">拍子は、1 小節に何拍あるか、どの音符を 1 拍とするかを表します。これがわかれば、どんな曲でもメトロノームを設定できます。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#numbers">2 つの数字の意味</a></li>
  <li><a href="#common">よく使う拍子</a></li>
  <li><a href="#compound">6/8 などの複合拍子</a></li>
  <li><a href="#cut">2/2 拍子</a></li>
  <li><a href="#odd">5/4・7/8 などの変拍子</a></li>
</ol></nav>

<h2 id="numbers">2 つの数字の意味</h2>
<ul>
  <li><b>分子（上の数字）</b> – 1 小節の拍の数。</li>
  <li><b>分母（下の数字）</b> – 1 拍とする音符。2 は 2 分音符、4 は 4 分音符、8 は 8 分音符、16 は 16 分音符です。</li>
</ul>
<p>たとえば 3/4 は、4 分音符を 1 拍として 1 小節に 3 拍です。Setlist Metronome では、BPM は常に分母の音符を数え、拍の丸の数が分子になります。</p>

<h2 id="common">よく使う拍子</h2>
${meterTable("ja")}
<p class="cap">● は強拍（アプリの黒い丸）、○ は普通の拍です。アプリでは丸を押すと切り替えられます。</p>

<h2 id="compound">6/8 などの複合拍子</h2>
<p>6/8・9/8・12/8 では、8 分音符を 3 つずつまとめて 1 拍と感じます。6/8 の曲は 6 拍ではなく「2 拍」で感じます。そのためアプリは、各まとまりの最初の 8 分音符を強拍にしています。</p>
<p>こうした拍子の楽譜では、テンポが付点 4 分音符（♩.、つまり 1 まとまり）で書かれていることがよくあります。アプリは分母の音符を数えるので、3 倍にして設定します。</p>
${dottedTable("ja")}
<p class="cap">100 を超えると、8 分音符のテンポがアプリの上限 ${MAX_BPM} を超えます。</p>
<p>別の方法として、2/4（9/8 なら 3/4、12/8 なら 4/4）を付点 4 分音符のテンポに設定し、ビートを<b>3連符</b>にしても同じ音が鳴ります。遅いテンポでは、こちらのほうが拍を感じやすいことがあります。</p>

<h2 id="cut">2/2 拍子</h2>
<p>2/2 は、2 分音符を 1 拍として 1 小節に 2 拍です。楽譜の見た目は 4/4 と似ていますが、2 拍で感じます。4/4 の ♩ = 120 は、2/2 の 𝅗𝅥 = 60 と同じ速さです。2/2 に設定して 4 分音符のテンポを半分にするか、4 分音符ごとに鳴らしたければ 4/4 のままにします。</p>

<h2 id="odd">5/4・7/8 などの変拍子</h2>
<p>変拍子は、ふつう 2 つと 3 つのまとまりに分けて感じます。アプリの初期状態は 1 拍目だけが強拍なので、丸を押して各まとまりの最初を強拍にしてください。たとえば次のとおりです。</p>
${oddList("ja")}
<p>同じ拍子でも曲によって分け方が違うので、音源を聴いて確かめてください。</p>
`,
  },
};
