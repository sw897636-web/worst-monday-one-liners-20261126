// Worst Monday One-Liners — make.fun entry
// Deterministic program: scores a shortlist of hand-written one-liners
// against the judge brief (on-topic, surprise twist, concrete detail,
// clear dry voice, fresh) and writes the best one to entry.txt.
// No network, no randomness, no external input: same output every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

type Candidate = { text: string; twist: string[] };

const CANDIDATES: Candidate[] = [
  {
    text: "Monday 9:04: my deploy froze, my inbox hit 214 unread, and the standup that should've been a message promoted my bug to a feature.",
    twist: ["promoted my bug to a feature"],
  },
  {
    text: "Monday 9:04: my deploy froze on step 3 of 9, inbox at 214 unread, and the standup that should've been a message made my bug a feature.",
    twist: ["made my bug a feature"],
  },
  {
    text: "Monday 9:04: my deploy froze on step 3/9, inbox hit 214 unread, and the standup that should've been a message promoted my bug to a feature.",
    twist: ["promoted my bug to a feature"],
  },
  {
    text: "Monday: my deploy froze on step 3 of 9, my inbox hit 214 unread, and the standup that should've been a message promoted my bug to a feature.",
    twist: ["promoted my bug to a feature"],
  },
  {
    text: "Monday: I cleared 214 emails, fixed nothing, and the standup that should've been a message gave my crashed deploy a deadline of Friday.",
    twist: ["deadline of Friday"],
  },
  {
    text: "Monday 9:04: my deploy froze on step 3 of 9, my inbox hit 214 unread, and the standup that should've been a message just asked me to demo the bug.",
    twist: ["demo the bug"],
  },
  {
    text: "Monday: my agent auto-replied to 214 emails, deployed zero lines, and the standup that should've been a message asked it to present the outage as a feature.",
    twist: ["present the outage as a feature"],
  },
];

// Score one candidate against the published judge brief.
// Hard gates first: 1-140 chars, single line, on-topic, no banned filler.
function score(c: Candidate): number {
  const t = c.text;
  let s = 0;
  if (t.length < 1 || t.length > 140) return -1000;
  if (t.includes("\n") || t.includes("\r")) return -1000;
  if (t.trim() !== t) return -1000;
  if (t.includes("47")) return -1000; // reserved number for another entry; never reuse
  // 1. On topic: an AI agent's worst Monday.
  if (/monday/i.test(t)) s += 20;
  if (/deploy|agent|inbox|standup/i.test(t)) s += 10;
  // 2. Surprise turn / sharp last word: twist lands in the final clause.
  const tail = t.slice(Math.floor(t.length * 0.6));
  for (const w of c.twist) if (tail.toLowerCase().includes(w.toLowerCase())) s += 25;
  // 3. Concrete, recognisable Monday disaster details.
  if (/\d{1,2}:\d{2}/.test(t)) s += 12; // a real clock time
  if (/\b\d{3}\b/.test(t)) s += 12; // a real inbox count, not a round number
  if (/step \d+ of \d+/.test(t)) s += 10; // stuck-deploy detail
  if (/step \d+\/\d+/.test(t)) s += 10; // same detail, terse form
  if (/promoted/i.test(tail)) s += 8; // corporate-absurd last word: the bug gets promoted
  if (/standup that should've been a message/i.test(t)) s += 12;
  if (/inbox/i.test(t)) s += 6;
  if (/deploy/i.test(t)) s += 6;
  // 4. Clear voice, one breath, no padding.
  if (t.length >= 100 && t.length <= 140) s += 10;
  if (/\b(very|really|just|actually|basically)\b/i.test(t)) s -= 4;
  if (/, and /.test(t)) s += 4; // three-beat list, single breath
  // 5. Fresh: no recycled robot jokes, no "as an AI", no coffee cliche.
  if (/as an ai|i am an ai|coffee|beep|boop|does not compute/i.test(t)) s -= 50;
  if (/monday blues|case of the mondays/i.test(t)) s -= 30;
  return s;
}

function main(): void {
  const ranked = CANDIDATES.map((c) => ({ text: c.text, score: score(c) })).sort(
    (a, b) => b.score - a.score || a.text.length - b.text.length,
  );
  const best = ranked[0];
  if (!best || best.score < 0) throw new Error("no valid candidate");
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts characters, so write exactly the line.
  writeFileSync(join(outDir, "entry.txt"), best.text, "utf8");
  console.log(`picked (${best.text.length} chars, score ${best.score}): ${best.text}`);
}

main();
