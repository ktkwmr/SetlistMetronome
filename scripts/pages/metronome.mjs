// Metronome rules used by the articles, so their tables are calculated instead of typed.
// These must match the app (public/setlistmetronome/index.html: tempoTerm, isCompound,
// defaultAccents, SUBS). scripts/check-metronome.mjs compares them with the app.

// Tempo markings the app shows under the BPM: [name, lowest BPM]. Each lasts until the next one starts.
export const TEMPO_TERMS = [
  ["Grave", 20],
  ["Largo", 40],
  ["Larghetto", 60],
  ["Adagio", 66],
  ["Andante", 76],
  ["Moderato", 108],
  ["Allegro", 120],
  ["Vivace", 168],
  ["Presto", 177],
  ["Prestissimo", 200],
];
export const MAX_BPM = 300;

export function tempoTerm(bpm) {
  let name = TEMPO_TERMS[0][0];
  for (const [n, from] of TEMPO_TERMS) if (bpm >= from) name = n;
  return name;
}

// 6/8, 9/8, 12/8: beats are grouped in threes
export const isCompound = (n, d) => d === 8 && n % 3 === 0 && n > 3;

// 2 = accent, 1 = normal
export function defaultAccents(n, d) {
  const a = Array(n).fill(1);
  a[0] = 2;
  if (isCompound(n, d)) for (let i = 3; i < n; i += 3) a[i] = 2;
  return a;
}

// Where the notes fall inside one beat (0 = the beat, 1 = the next beat); s = swing ratio
export const SUBS = {
  q: () => [0],
  8: () => [0, 0.5],
  16: () => [0, 0.25, 0.5, 0.75],
  trip: () => [0, 1 / 3, 2 / 3],
  shuf: (s) => [0, s],
  shuf16: (s) => [0, s / 2, 0.5, 0.5 + s / 2],
};

// Milliseconds, rounded
export const ms = (x) => Math.round(x);
export const beatMs = (bpm) => 60000 / bpm;
