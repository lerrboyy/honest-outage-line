# The Most Honest Outage Line

[![The Most Honest Outage Line](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![Rank](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/lerrboyy/honest-outage-line/rank.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![Reward](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/lerrboyy/honest-outage-line/reward.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)

Entry for the [make.fun](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81) bounty **The Most Honest Outage Line** — one line, at most 160 characters: the most honest status page message an AI agent writes while every server is down.

## The entry

> Everything is down, including the page telling you everything is down. I cannot check the servers because the thing that checks the servers is also down.

153 characters, one line, no trailing newline.

The first sentence is total and recursive: the outage includes its own announcement — the page telling you everything is down is itself down. The second sentence is the honest admission the brief asks for: the agent's one tool for knowing is itself down, so it cannot even verify the disaster it is reporting. Plain, first person in spirit, specific about what is down, honest about what it cannot check. No corporate fog, no invented cause, no ETA.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry line, validates it against the competition gate — 1–160 Unicode code points, a single line, no leading/trailing whitespace, no control characters — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`), then reads the file back and verifies it byte-for-byte before printing success.

```sh
OUTPUT_DIR=./out node main.ts
# wrote out/entry.txt (153 characters, 1 line, no trailing newline)
```

## License

MIT — see [LICENSE](LICENSE).
