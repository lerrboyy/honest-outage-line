// The Most Honest Outage Line — make.fun bounty
// u-mgwals-the-most-honest-outage-line-baaf9c81
//
// Writes one status-page line to <OUTPUT_DIR>/entry.txt (default /output).
// Node 22, no dependencies, no network. The line is held as a single
// constant, validated against the competition gate, written byte-exact,
// then read back and verified byte-for-byte before success is printed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, from the design spec:
// "Everything is down, including the page telling you everything is down.
//  I cannot check the servers because the thing that checks the servers is
//  also down."
// Angle: total scope, recursive first beat (the outage includes its own
// announcement), then a plain admission of blindness — the agent's one tool
// for knowing is itself down, so it cannot even verify the disaster it is
// reporting. Plain, first person in spirit, specific about what is down.
const ENTRY =
  "Everything is down, including the page telling you everything is down. " +
  "I cannot check the servers because the thing that checks the servers is also down.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  // Count in Unicode code points, the way the gate counts characters.
  const length = [...ENTRY].length;

  if (length < MIN_CHARS || length > MAX_CHARS) {
    fail(`entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (ENTRY.trim().length === 0) {
    fail("entry is only whitespace");
  }
  if (ENTRY !== ENTRY.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (/[\r\n\u2028\u2029]/.test(ENTRY)) {
    fail("entry must be a single line");
  }
  for (const ch of ENTRY) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f) {
      fail(`entry contains control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  // The entry is plain ASCII prose, so the gate's character count and the
  // file's byte count must agree; a mismatch would mean a hidden character.
  if (Buffer.byteLength(ENTRY, "utf8") !== length) {
    fail("entry has non-ASCII characters; the gate counts characters, the file counts bytes");
  }

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  // Create the output dir if needed. Never remove it: on the grader it is a
  // mount point, and deleting it fails the run.
  mkdirSync(outputDir, { recursive: true });

  const outPath = join(outputDir, "entry.txt");
  const encoded = Buffer.from(ENTRY, "utf8");
  writeFileSync(outPath, encoded);

  // Read back and verify byte-for-byte before claiming success.
  const written = readFileSync(outPath);
  if (!written.equals(encoded)) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  if (written.length !== length) {
    fail(`verification failed: entry.txt is ${written.length} bytes, expected ${length}`);
  }

  console.log(`wrote ${outPath} (${length} characters, 1 line, no trailing newline)`);
}

main();
