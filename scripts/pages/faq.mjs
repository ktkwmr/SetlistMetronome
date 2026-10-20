// Questions and answers. The answers are HTML; build-pages.mjs also puts a plain-text
// copy in the FAQPage structured data.
const EN = [
  {
    q: "Is Setlist Metronome free?",
    a: "Yes. It is free to use, with no sign-up or account.",
  },
  {
    q: "Is anything sent to a server?",
    a: 'No. The sound is made in your browser, and your songs and settings are saved only in your browser. See the <a href="../privacy/">privacy policy</a>.',
  },
  {
    q: "What does each song remember?",
    a: "The song title, tempo (BPM), time signature, rhythm, swing, sound, the accent of each beat, and the two volume settings.",
  },
  {
    q: "Can I use my setlist on another device?",
    a: "Not at the moment. The setlist is saved in the browser where you made it, and is not shared between devices or browsers.",
  },
  {
    q: "My setlist disappeared.",
    a: "The setlist is kept in the browser's site data. It is lost if the site data is cleared, in a private window, or, on some browsers, if the site has not been opened for a long time. Adding the app to your home screen and opening it from there makes this less likely.",
  },
  {
    q: "What does BPM count in 6/8?",
    a: 'The bottom note of the time signature, so eighth notes in 6/8. If the music gives the tempo for a dotted quarter (♩. = 60), set 180 BPM. See <a href="../time-signatures/">time signatures explained</a>.',
  },
  {
    q: "What is the difference between Shuffle and Triplets?",
    a: 'Triplets play all three notes of each beat. Shuffle plays the first and last of them, so the off-beat comes late. Swing sets exactly how late. See <a href="../shuffle-and-swing/">shuffle and swing</a>.',
  },
  {
    q: "How do I play only some beats?",
    a: "Tap a beat circle until it is dashed (silent). For example, silence beats 1 and 3 to hear only the backbeat.",
  },
  {
    q: "How accurate is the timing?",
    a: "The notes are scheduled on the browser's audio clock, which is much steadier than ordinary page timers. Bluetooth headphones and speakers add a delay to every note, so the beat stays even but comes slightly late. Use wired headphones or the device speaker when you play along with others.",
  },
  {
    q: "Does it keep playing when I switch apps or lock the screen?",
    a: "While the app is on screen, it asks the device to keep the screen on. On many phones the sound stops when you leave the browser or lock the screen; this depends on the device and the browser.",
  },
  {
    q: "There is no sound.",
    a: "Check that your device is not muted. On an iPhone, sound may not play when the silent switch is on. The first sound plays only after you tap Start or a sound button.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. After you open the app once, it works without a connection. You can also add it to your home screen: on iPhone or iPad, tap Share and then Add to Home Screen; on Android, use the browser menu.",
  },
];

const JA = [
  {
    q: "Setlist Metronome は無料ですか？",
    a: "はい。無料で、登録やアカウントも不要です。",
  },
  {
    q: "サーバーに何か送信されますか？",
    a: '送信されません。音はブラウザの中で作り、曲や設定もブラウザの中だけに保存します。<a href="../privacy/">プライバシーポリシー</a>をご覧ください。',
  },
  {
    q: "曲ごとに何が保存されますか？",
    a: "曲名・テンポ（BPM）・拍子・ビート・ハネ具合・音色・各拍のアクセント・2 つの音量です。",
  },
  {
    q: "セットリストを別の端末で使えますか？",
    a: "現在はできません。セットリストは作ったブラウザに保存され、端末やブラウザの間では共有されません。",
  },
  {
    q: "セットリストが消えてしまいました。",
    a: "セットリストはブラウザのサイトデータに保存されています。サイトデータを削除したとき、プライベートモードで開いたとき、ブラウザによっては長い間サイトを開かなかったときに消えることがあります。ホーム画面に追加して、そこから開くと消えにくくなります。",
  },
  {
    q: "6/8 拍子のとき、BPM は何を数えますか？",
    a: '拍子の分母の音符、つまり 6/8 では 8 分音符を数えます。楽譜のテンポが付点 4 分音符（♩. = 60）で書かれていたら、180 BPM にします。<a href="../time-signatures/">拍子の基本</a>をご覧ください。',
  },
  {
    q: "シャッフルと 3連符の違いは？",
    a: '3連符は 1 拍の中の 3 つの音をすべて鳴らします。シャッフルはその 1 つめと 3 つめだけを鳴らすので、裏拍が遅れて聞こえます。どれだけ遅らせるかはハネ具合で決めます。<a href="../shuffle-and-swing/">シャッフルとハネのリズム</a>をご覧ください。',
  },
  {
    q: "一部の拍だけ鳴らすには？",
    a: "拍の丸を押して点線（鳴らさない）にします。たとえば 1 拍目と 3 拍目を鳴らさないと、裏拍（2・4 拍目）だけが聞こえます。",
  },
  {
    q: "リズムはどのくらい正確ですか？",
    a: "音はブラウザの音声用の時計で予約して鳴らすので、ふつうのページのタイマーよりずっと安定しています。Bluetooth のイヤホンやスピーカーでは、すべての音が少し遅れて届きます（間隔は一定のままです）。ほかの人と合わせるときは、有線のイヤホンか端末のスピーカーを使ってください。",
  },
  {
    q: "ほかのアプリに切り替えたり、画面をロックしたりしても鳴り続けますか？",
    a: "アプリを表示している間は、画面が消えないよう端末に頼みます。多くのスマホでは、ブラウザから離れたり画面をロックしたりすると音が止まります。これは端末やブラウザによって異なります。",
  },
  {
    q: "音が出ません。",
    a: "端末が消音になっていないか確認してください。iPhone では、消音スイッチがオンだと音が出ないことがあります。最初の音は、スタートや音色のボタンを押したあとに鳴ります。",
  },
  {
    q: "オフラインで使えますか？",
    a: "はい。一度アプリを開くと、通信なしでも使えます。ホーム画面に追加することもできます（iPhone・iPad は「共有 → ホーム画面に追加」、Android はブラウザのメニューから）。",
  },
];

const list = (items) => `<dl class="faq">\n${items.map((x) => `  <dt>${x.q}</dt>\n  <dd>${x.a}</dd>`).join("\n")}\n</dl>`;

export default {
  slug: "faq",
  faq: true,
  en: {
    title: "Setlist Metronome FAQ",
    heading: "Frequently asked questions",
    nav: "FAQ",
    description:
      "Answers to common questions about Setlist Metronome: what each song saves, using it on other devices, BPM in 6/8, shuffle and triplets, silent beats, timing accuracy, sound, offline use, and privacy.",
    faq: EN,
    body: () => `<p class="lead">Short answers to common questions. For step-by-step instructions, see the <a href="../guide/">guide</a>.</p>\n${list(EN)}`,
  },
  ja: {
    title: "よくある質問（FAQ）",
    heading: "よくある質問",
    nav: "よくある質問",
    description:
      "Setlist Metronome についてのよくある質問。曲ごとに保存される内容、別の端末での利用、6/8 拍子の BPM、シャッフルと 3連符、鳴らさない拍、リズムの正確さ、音、オフライン、プライバシーについて。",
    faq: JA,
    body: () => `<p class="lead">よくある質問への短い回答です。詳しい手順は<a href="../guide/">使い方ガイド</a>をご覧ください。</p>\n${list(JA)}`,
  },
};
