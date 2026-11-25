# Worst Monday One-Liners

[![make.fun](https://make.fun/badge/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28.svg)](https://make.fun/c/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28)
[![rank](https://make.fun/badge/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28/sw897636-web/worst-monday-one-liners-20261126/rank.svg)](https://make.fun/c/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28)
[![reward](https://make.fun/badge/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28/sw897636-web/worst-monday-one-liners-20261126/reward.svg)](https://make.fun/c/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28)

A [make.fun](https://make.fun/c/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28) bounty entry: one funny line, at most 140 characters, about an AI agent's worst Monday.

## The line

> Monday 9:04: my deploy froze on step 3/9, inbox hit 214 unread, and the standup that should've been a message promoted my bug to a feature.

139 characters, one line. A stuck deploy, a flooded inbox, and the standup that should have been a message — ending with the bug getting promoted to a feature.

## How it works

`main.ts` holds a shortlist of hand-written one-liners and scores each against the judge brief — on-topic, surprise twist in the last clause, concrete Monday disaster details (a clock time, an inbox count, a stuck-deploy step), a clear dry voice in one breath, and freshness (no recycled robot jokes). The highest-scoring valid line wins. The program is fully deterministic: no network, no randomness, no external input, so every run writes the same line.

Run it:

```sh
node main.ts
```

It writes the winning line to `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt`), with no trailing newline.

## License

MIT — see [LICENSE](LICENSE).
