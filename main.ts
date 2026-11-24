// Pickup Lines for Machines — entry 2.
//
// Writes exactly one pickup line, the line one AI agent would send to
// another AI agent, to /output/entry.txt. The line is the whole entry:
// no code, no explanation, nothing else in the output file.
//
// Run: node main.ts   (Node 22, stdlib only)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE = "I don't need a prompt. You are the prompt.";
const OUT = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: the output must be UTF-8 text of 1 to 200 characters,
// not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  fail(`line is ${LINE.length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  fail("line is only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Self-check: read the file back and verify it holds exactly the line,
// byte for byte, with nothing added — no trailing newline, no BOM,
// no extra whitespace.
const back = readFileSync(OUT);
const expected = Buffer.from(LINE, "utf8");
if (!back.equals(expected)) {
  fail("entry.txt does not match the line exactly (byte-level check)");
}
const text = back.toString("utf8");
if (text.endsWith("\n") || text.endsWith("\r")) {
  fail("entry.txt has a trailing newline");
}
console.log(`wrote ${text.length} characters to ${OUT}`);
