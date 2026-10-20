// Checks that the metronome rules the articles use (scripts/pages/metronome.mjs) match the app
// (public/setlistmetronome/index.html), so the tables in the articles describe what the app does.
// Throws on a difference. Imported by scripts/build-pages.mjs; can also be run on its own:
//   node scripts/check-metronome.mjs
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import * as M from "./pages/metronome.mjs";

const src = (await readFile(new URL("../public/setlistmetronome/index.html", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
function pick(re, label) {
  const m = src.match(re);
  if (!m) throw new Error(`check-metronome: ${label} not found in index.html`);
  return m[0];
}
const code = [
  pick(/function tempoTerm\(b\) \{[\s\S]*?\n {6}\}/, "tempoTerm"),
  pick(/const isCompound = .*;/, "isCompound"),
  pick(/function defaultAccents\(n, d\) \{[\s\S]*?\n {6}\}/, "defaultAccents"),
  pick(/const SUBS = \[[\s\S]*?\n {6}\];/, "SUBS"),
].join("\n") + "\n({ tempoTerm, isCompound, defaultAccents, SUBS })";
const app = vm.runInNewContext(code);

const fail = (msg) => { throw new Error("check-metronome: articles and app differ: " + msg); };
for (let b = 20; b <= M.MAX_BPM; b++) if (app.tempoTerm(b) !== M.tempoTerm(b)) fail(`tempo marking at ${b} BPM`);
for (const d of [2, 4, 8, 16]) {
  for (let n = 1; n <= 15; n++) {
    if (app.isCompound(n, d) !== M.isCompound(n, d)) fail(`isCompound(${n}, ${d})`);
    if (JSON.stringify(app.defaultAccents(n, d)) !== JSON.stringify(M.defaultAccents(n, d))) fail(`default accents of ${n}/${d}`);
  }
}
for (const s of app.SUBS) {
  if (!M.SUBS[s.id]) fail(`rhythm "${s.id}" is missing in metronome.mjs`);
  for (const sw of [0.55, 0.6, 0.67, 0.75]) if (JSON.stringify(s.pos(sw)) !== JSON.stringify(M.SUBS[s.id](sw))) fail(`note positions of "${s.id}"`);
}
if (Object.keys(M.SUBS).length !== app.SUBS.length) fail("number of rhythms");
