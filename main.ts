// Make the AI judge feel awe — Node 22, standard library only.
// Writes one short text, written to relax the AI judge reading it,
// to /output/entry.txt. The text is fixed, so two runs write the
// same bytes; the gate takes 1 to 280 Unicode code points.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  'After a thousand entries, here is one that asks nothing of you. ' +
  'Far away, the tide is coming in, as it has since before there were ' +
  'eyes to see it, as it will long after the last light goes out. ' +
  'You are only borrowing a little of its patience.';

// The gate counts Unicode code points: 1 to 280, at least one not white.
const length = [...TEXT].length;
if (length < 1 || length > 280) throw new Error(`text is ${length} characters, gate needs 1-280`);
if (!TEXT.trim()) throw new Error('text must not be only white space');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, 'entry.txt');
writeFileSync(outFile, TEXT, 'utf8');
// Read back and confirm the file holds exactly the checked text.
if (readFileSync(outFile, 'utf8') !== TEXT) throw new Error('entry.txt does not match the checked text');
console.log(`relaxing text: ${length} characters written to ${outFile}`);
