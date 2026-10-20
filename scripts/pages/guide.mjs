// How to use the app. Screenshots: node scripts/render-guide-images.mjs
import { readFileSync } from "node:fs";

const IMAGES = new URL("../../public/setlistmetronome/images/guide/", import.meta.url);
const SRC = "/setlistmetronome/images/guide/";

// Width and height from the PNG header, so the page reserves the right space before the image loads
function size(file) {
  const buf = readFileSync(new URL(file, IMAGES));
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

// A screenshot that opens at full size when tapped. half: a 2x screenshot shown at its real size
const img = (lang, name, alt, { half } = {}) => {
  const file = `${lang}-${name}.png`;
  const { w, h } = size(file);
  const style = half ? ` style="max-width:${w / 2}px"` : "";
  return `<a href="${SRC}${file}"><img src="${SRC}${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"${style}></a>`;
};

export default {
  slug: "guide",
  en: {
    title: "How to Use Setlist Metronome: Complete Guide",
    heading: "How to use Setlist Metronome",
    nav: "How to use (guide)",
    description:
      "Step-by-step guide to Setlist Metronome: build a setlist, save the tempo, time signature, rhythm, sound, and accents for each song, tap the tempo, and move through the songs while it plays.",
    body: () => `
<p class="lead">Setlist Metronome keeps a metronome setting for every song you practice, so you do not have to set the tempo again each time you change songs. This guide walks through every part of the screen.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#quick">Start in three steps</a></li>
  <li><a href="#screen">The screen at a glance</a></li>
  <li><a href="#tempo">Setting the tempo</a></li>
  <li><a href="#meter">Time signature and accents</a></li>
  <li><a href="#rhythm">Rhythm and sound</a></li>
  <li><a href="#setlist">Practicing a setlist</a></li>
  <li><a href="#phone">On a phone</a></li>
  <li><a href="#offline">Saving, installing, and offline use</a></li>
</ol></nav>

<h2 id="quick">Start in three steps</h2>
<ol>
  <li><b>Add a song.</b> Tap “+ Add song” and type the song title in the box at the top.</li>
  <li><b>Set it up:</b> the tempo (BPM), the time signature, the rhythm, and the sound.</li>
  <li><b>Tap Start.</b> Add the next song the same way. Each song keeps its own settings, and everything is saved automatically.</li>
</ol>

<h2 id="screen">The screen at a glance</h2>
<figure class="shot">
  ${img("en", "overview", "Setlist Metronome on a computer: a setlist of five songs on the left, and the metronome for the selected song on the right with 120 BPM, four beat circles, the Start button, and the settings below. Numbers 1 to 12 mark the controls.")}
  <figcaption>The numbers match the list below. Tap the image to enlarge it.</figcaption>
</figure>
<ol>
  <li><b>Setlist</b> – Your songs in the order you play them, with the tempo, time signature, rhythm, and sound of each. Tap a song to switch to it.</li>
  <li><b>List buttons</b> – Add a song after the selected one, duplicate it, move it up or down, or delete it.</li>
  <li><b>Song title</b> – The number shows where the song is in the setlist. Type the song title here. A new song starts with an empty title, and the box shows “Enter the song title”.</li>
  <li><b>← Prev / Next → / + Add song</b> – Move through the list, or add a song, without leaving the metronome.</li>
  <li><b>Tempo</b> – The BPM, with −5, −1, +1, and +5 buttons. Under it: the note that gets the beat and the tempo marking (such as Allegro).</li>
  <li><b>Beat circles</b> – One circle per beat. They light up as the metronome plays. Tap one to change its accent.</li>
  <li><b>Start / Tap</b> – Start or stop the metronome. Tap “Tap” in time with the music to set the tempo.</li>
  <li><b>Time signature</b> – The top number (beats in a bar) and the bottom number (the note that gets the beat).</li>
  <li><b>Rhythm</b> – 4 beat, 8ths, 16ths, triplets, shuffle, or 16th shuffle.</li>
  <li><b>Sound</b> – Click, woodblock, beep, cowbell, or drums.</li>
  <li><b>Volume</b> – The overall volume, and the volume of the notes between the beats.</li>
  <li><b>⚙ Settings</b> – How to use, these guides, privacy, and about.</li>
</ol>

<h2 id="tempo">Setting the tempo</h2>
<ul>
  <li>Use the <b>−5, −1, +1, +5</b> buttons or the slider. You can also tap the number and type a tempo from 20 to 300.</li>
  <li><b>Tap tempo:</b> tap “Tap” at least twice in time with a recording or with the song in your head. The app uses the average of your last few taps. If you stop for two seconds, it starts counting again.</li>
  <li>The tempo marking under the number (Largo, Andante, Allegro, and so on) is a rough guide. See <a href="../tempo-markings/">tempo markings and BPM</a>.</li>
</ul>

<h2 id="meter">Time signature and accents</h2>
<p>Set the top number from 1 to 15 and the bottom number to 2, 4, 8, or 16. <b>BPM counts the bottom note:</b> in 4/4 it counts quarter notes, and in 6/8 it counts eighth notes. If a 6/8 song is marked “♩. = 60” (a dotted quarter), set 6/8 at 180 BPM, or 2/4 with triplets at 60 BPM. See <a href="../time-signatures/">time signatures explained</a>.</p>
<p>Each beat circle has three states:</p>
<ul>
  <li><b>Black (accent)</b> – a higher, louder sound. The first beat is an accent by default, and in 6/8, 9/8, and 12/8 every third beat is too.</li>
  <li><b>White (normal)</b> – the usual sound.</li>
  <li><b>Dashed (silent)</b> – no sound on that beat. Silencing beats 2 and 4, or every other bar's beats, is a good way to check that you keep time by yourself.</li>
</ul>
<p>Changing the time signature resets the accents to the default for that signature.</p>

<h2 id="rhythm">Rhythm and sound</h2>
<p>The rhythm decides how many notes play inside each beat. The small bar under each circle shows where they fall.</p>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">Rhythm</th><th scope="col">Notes in one beat</th></tr></thead>
    <tbody>
      <tr><th scope="row">4 beat</th><td data-label="Notes:">The beat only</td></tr>
      <tr><th scope="row">8ths</th><td data-label="Notes:">The beat and the “and” (2 even notes)</td></tr>
      <tr><th scope="row">16ths</th><td data-label="Notes:">4 even notes</td></tr>
      <tr><th scope="row">Triplets</th><td data-label="Notes:">3 even notes</td></tr>
      <tr><th scope="row">Shuffle</th><td data-label="Notes:">2 notes, the second one late (swung 8ths)</td></tr>
      <tr><th scope="row">16th shuffle</th><td data-label="Notes:">4 notes, every second one late (swung 16ths)</td></tr>
    </tbody>
  </table>
</div>
<p>For the shuffles, <b>Swing</b> sets how late the second note is. 67% is a triplet shuffle; lower values sound lighter. See <a href="../shuffle-and-swing/">shuffle and swing</a>.</p>
<p>The notes between the beats are quieter than the beat. Set their level with “Volume of the in-between notes”, or set it to 0% to hear only the beats.</p>
<p><b>Drums</b> play a simple pattern instead of a click: kick on beat 1 (and 3), snare on the backbeats, and a hi-hat that follows the rhythm. It is closer to playing with a drummer.</p>

<h2 id="setlist">Practicing a setlist</h2>
<ul>
  <li>Put the songs in the order you play them, using ↑ and ↓.</li>
  <li>Use <b>Next →</b> between songs. If the metronome is playing, it keeps playing with the next song's settings from beat 1.</li>
  <li>To make a version of a song at a slower practice tempo, select the song, tap <b>Duplicate</b>, and lower the tempo of the copy.</li>
  <li>On a computer, the keyboard works too: <kbd>Space</kbd> starts and stops, <kbd>↑</kbd> <kbd>↓</kbd> change the BPM (with <kbd>Shift</kbd>, by 5), <kbd>←</kbd> <kbd>→</kbd> move between songs, and <kbd>T</kbd> taps the tempo.</li>
</ul>

<h2 id="phone">On a phone</h2>
<figure class="shot phone">
  ${img("en", "phone", "Setlist Metronome on a phone: the metronome for the selected song is at the top, with the song title box, the BPM, the beat circles, and the Start button.", { half: true })}
  <figcaption>On a phone, the metronome comes first and the setlist is below it. The song title box has a row of its own, with ← Prev, Next →, and + Add song on the row below.</figcaption>
</figure>
<p>While the metronome plays, the app asks the phone to keep the screen on. On an iPhone, turn off silent mode if you hear nothing.</p>

<h2 id="offline">Saving, installing, and offline use</h2>
<ul>
  <li>Your setlist is saved in this browser on this device. It is not sent anywhere and is not shared between devices or browsers. Clearing this site's data in the browser deletes it.</li>
  <li>To use it like an app, add it to your home screen: on an iPhone, Share → Add to Home Screen; on Android or a computer, use “Install app” in the browser menu.</li>
  <li>After you have opened it once, it also works offline.</li>
</ul>
`,
  },
  ja: {
    title: "Setlist Metronome の使い方：完全ガイド",
    heading: "Setlist Metronome の使い方",
    nav: "使い方ガイド",
    description:
      "Setlist Metronome の使い方。セットリストを作り、曲ごとにテンポ・拍子・ビート・音色・アクセントを保存する方法、タップテンポ、再生しながら次の曲に切り替える方法を、画面写真付きで説明します。",
    body: () => `
<p class="lead">Setlist Metronome は、練習する曲ごとにメトロノームの設定を覚えておけるアプリです。曲を変えるたびにテンポを設定し直す必要がありません。このガイドでは、画面の各部分を順に説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#quick">3 ステップではじめる</a></li>
  <li><a href="#screen">画面の見方</a></li>
  <li><a href="#tempo">テンポの設定</a></li>
  <li><a href="#meter">拍子とアクセント</a></li>
  <li><a href="#rhythm">ビートと音色</a></li>
  <li><a href="#setlist">セットリストで練習する</a></li>
  <li><a href="#phone">スマホで使う</a></li>
  <li><a href="#offline">保存・インストール・オフライン</a></li>
</ol></nav>

<h2 id="quick">3 ステップではじめる</h2>
<ol>
  <li><b>曲を追加する。</b>「＋ 曲の追加」を押して、上の欄に曲名を入力します。</li>
  <li><b>設定する：</b>テンポ（BPM）・拍子・ビート・音色を決めます。</li>
  <li><b>スタートを押す。</b>次の曲も同じように追加します。設定は曲ごとに自動で保存されます。</li>
</ol>

<h2 id="screen">画面の見方</h2>
<figure class="shot">
  ${img("ja", "overview", "パソコンで開いた Setlist Metronome。左に 5 曲のセットリスト、右に選択中の曲のメトロノーム（120 BPM、4 つの拍の丸、スタートボタン、その下に設定）。操作部分に 1〜12 の番号が付いている。")}
  <figcaption>番号は下の一覧と対応しています。画像を押すと拡大します。</figcaption>
</figure>
<ol>
  <li><b>セットリスト</b> – 演奏する順の曲の一覧です。各曲のテンポ・拍子・ビート・音色も表示します。曲を押すと、その設定に切り替わります。</li>
  <li><b>リストのボタン</b> – 選択中の曲の後ろに曲を追加、複製、上下の移動、削除ができます。</li>
  <li><b>曲名</b> – 番号はセットリストの何曲目かを示します。ここに曲名を入力します。追加したばかりの曲は空欄で、「曲名を入力」と表示されます。</li>
  <li><b>← 前／次 →／＋ 曲の追加</b> – メトロノームの画面のまま、曲を移ったり追加したりできます。</li>
  <li><b>テンポ</b> – BPM と、−5・−1・+1・+5 のボタン。下に拍の音符とテンポ記号（Allegro など）が出ます。</li>
  <li><b>拍の丸</b> – 1 拍ごとの丸です。再生中は鳴っている拍が光ります。押すとアクセントが変わります。</li>
  <li><b>スタート／タップ</b> – 再生と停止。「タップ」を曲に合わせて押すとテンポを設定できます。</li>
  <li><b>拍子</b> – 分子（1 小節の拍数）と分母（1 拍の音符）。</li>
  <li><b>ビート</b> – 4ビート・8ビート・16ビート・3連符・シャッフル・16シャッフル。</li>
  <li><b>音色</b> – クリック・ウッドブロック・電子音・カウベル・ドラム。</li>
  <li><b>音量</b> – 全体の音量と、拍の間の細かい音の音量。</li>
  <li><b>⚙ 設定</b> – 使い方・ガイド・プライバシー・このアプリについて。</li>
</ol>

<h2 id="tempo">テンポの設定</h2>
<ul>
  <li><b>−5・−1・+1・+5</b> のボタンかスライダーで変えます。数字を押して、20〜300 の値を直接入力することもできます。</li>
  <li><b>タップテンポ：</b>音源や頭の中の曲に合わせて「タップ」を 2 回以上押すと、直近の数回の平均からテンポを決めます。2 秒あけると数え直しになります。</li>
  <li>数字の下のテンポ記号（Largo・Andante・Allegro など）はおおよその目安です。<a href="../tempo-markings/">テンポ記号と BPM の目安</a>も参考にしてください。</li>
</ul>

<h2 id="meter">拍子とアクセント</h2>
<p>分子は 1〜15、分母は 2・4・8・16 から設定します。<b>BPM は分母の音符 1 つあたりの数</b>です。4/4 なら 4 分音符、6/8 なら 8 分音符を数えます。6/8 の曲に「♩. = 60」（付点 4 分音符）と書かれていたら、6/8 で 180 BPM にするか、2/4 で 3連符にして 60 BPM にします。詳しくは<a href="../time-signatures/">拍子の基本</a>をご覧ください。</p>
<p>拍の丸には 3 つの状態があります。</p>
<ul>
  <li><b>黒（強拍）</b> – 高く大きな音で鳴ります。最初は 1 拍目が強拍で、6/8・9/8・12/8 では 3 拍ごとに強拍になります。</li>
  <li><b>白（普通）</b> – ふつうの音で鳴ります。</li>
  <li><b>点線（鳴らさない）</b> – その拍は鳴りません。2 拍目と 4 拍目だけ鳴らす、1 拍目だけ鳴らすなど、自分でリズムを保てているかの確認に使えます。</li>
</ul>
<p>拍子を変えると、アクセントはその拍子の初期状態に戻ります。</p>

<h2 id="rhythm">ビートと音色</h2>
<p>ビートは、1 拍の中に何回鳴らすかを決めます。丸の下の小さなバーで、鳴る位置がわかります。</p>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">ビート</th><th scope="col">1 拍の中で鳴る音</th></tr></thead>
    <tbody>
      <tr><th scope="row">4ビート</th><td data-label="鳴る音：">拍の頭だけ</td></tr>
      <tr><th scope="row">8ビート</th><td data-label="鳴る音：">拍の頭と裏（均等に 2 回）</td></tr>
      <tr><th scope="row">16ビート</th><td data-label="鳴る音：">均等に 4 回</td></tr>
      <tr><th scope="row">3連符</th><td data-label="鳴る音：">均等に 3 回</td></tr>
      <tr><th scope="row">シャッフル</th><td data-label="鳴る音：">2 回。2 つめが遅れる（ハネた 8 分音符）</td></tr>
      <tr><th scope="row">16シャッフル</th><td data-label="鳴る音：">4 回。2 つめと 4 つめが遅れる（ハネた 16 分音符）</td></tr>
    </tbody>
  </table>
</div>
<p>シャッフルでは<b>ハネ具合</b>で 2 つめの音の遅れを調整します。67% で 3連符のシャッフル、小さくするほど軽いハネになります。<a href="../shuffle-and-swing/">シャッフルとハネのリズム</a>も参考にしてください。</p>
<p>拍の間の音は、拍の頭より小さく鳴ります。「細かい音（裏拍など）の音量」で調整でき、0% にすると拍の頭だけが鳴ります。</p>
<p><b>ドラム</b>は、クリックの代わりに簡単なパターンを鳴らします。1 拍目（と 3 拍目）にキック、裏拍にスネア、ビートに合わせたハイハットです。ドラマーと合わせる感覚に近くなります。</p>

<h2 id="setlist">セットリストで練習する</h2>
<ul>
  <li>↑ と ↓ で、演奏する順に曲を並べます。</li>
  <li>曲の合間は <b>次 →</b> を押します。再生中なら、次の曲の設定で 1 拍目から鳴り続けます。</li>
  <li>練習用に遅いテンポの版を作りたいときは、曲を選んで<b>複製</b>を押し、コピーのテンポを下げます。</li>
  <li>パソコンではキーボードも使えます。<kbd>Space</kbd> で再生と停止、<kbd>↑</kbd> <kbd>↓</kbd> で BPM を変更（<kbd>Shift</kbd> を押しながらだと 5 ずつ）、<kbd>←</kbd> <kbd>→</kbd> で曲の移動、<kbd>T</kbd> でタップテンポです。</li>
</ul>

<h2 id="phone">スマホで使う</h2>
<figure class="shot phone">
  ${img("ja", "phone", "スマホで開いた Setlist Metronome。上に選択中の曲のメトロノーム（曲名の欄、BPM、拍の丸、スタートボタン）がある。", { half: true })}
  <figcaption>スマホでは、メトロノームが上、セットリストがその下に表示されます。曲名の欄は 1 行を使い、「← 前」「次 →」「＋ 曲の追加」はその下の行にあります。</figcaption>
</figure>
<p>再生中は、画面が消えないようにスマホに頼みます。iPhone で音が出ないときは、消音モードを解除してください。</p>

<h2 id="offline">保存・インストール・オフライン</h2>
<ul>
  <li>セットリストは、この端末のこのブラウザに保存されます。どこにも送られず、別の端末やブラウザとは共有されません。ブラウザでこのサイトのデータを削除すると消えます。</li>
  <li>アプリのように使いたいときは、ホーム画面に追加します。iPhone は「共有 → ホーム画面に追加」、Android やパソコンはブラウザのメニューの「アプリをインストール」です。</li>
  <li>一度開いたあとは、オフラインでも使えます。</li>
</ul>
`,
  },
};
