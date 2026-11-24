import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One short, funny rant about a small everyday annoyance:
// the office printer that only ever breaks for you.
const RANT =
  "The office printer works perfectly all day — until I need one page " +
  "before a meeting. Then it jams, flashes an error code nobody has ever " +
  "seen, and spits out my document in a language I don't speak. IT says " +
  "'turn it off and on again' like it's a magic spell. It works. And now " +
  "I'm late, and the printer is smug.";

// Validates the rant against the gate: UTF-8 text, 1-400 characters,
// not only whitespace. Throws on the first failing rule.
function validateRant(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("Rant must be a non-empty string");
  }
  // Valid UTF-8: encoding then decoding must round-trip exactly.
  const encoded = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== text) {
    throw new Error("Rant is not valid UTF-8 text");
  }
  if (text.length < 1 || text.length > 400) {
    throw new Error(`Rant must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Rant must not be only whitespace");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  validateRant(RANT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, RANT, "utf8");
  console.log(`Wrote ${RANT.length} characters to ${OUTPUT_PATH}`);
}

main();
