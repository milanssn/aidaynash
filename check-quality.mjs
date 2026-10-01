import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_FILE_LINES = 300;
const MAX_FUNCTION_LINES = 40;
const IGNORED = new Set(['node_modules', '.git']);

function listFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (IGNORED.has(name)) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

function findLongFunctions(lines) {
  const problems = [];
  const starts = /^(export )?(async )?function |^  (async )?[a-zA-Z]+\(.*\) \{$/;
  lines.forEach((line, index) => {
    if (!starts.test(line)) return;
    const indent = line.match(/^ */)[0];
    const end = lines.findIndex((next, i) => i > index && next === `${indent}}`);
    if (end - index + 1 > MAX_FUNCTION_LINES) problems.push(`función larga en línea ${index + 1}`);
  });
  return problems;
}

const problems = [];
listFiles('.').filter((f) => f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css')).forEach((file) => {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  if (lines.length > MAX_FILE_LINES) problems.push(`${file}: más de ${MAX_FILE_LINES} líneas`);
  if (/console\.log|onclick=|style="/.test(text) && !file.includes('check-quality')) problems.push(`${file}: console.log / onclick / style en línea`);
  if (file.endsWith('.js')) findLongFunctions(lines).forEach((p) => problems.push(`${file}: ${p}`));
});
process.stdout.write(problems.length ? `${problems.join('\n')}\n` : 'Sin problemas de calidad.\n');
