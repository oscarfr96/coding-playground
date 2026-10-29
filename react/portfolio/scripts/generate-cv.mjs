import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Reuse the portfolio copy so the downloadable CVs stay in sync in both languages.
const root = fileURLToPath(new URL('../', import.meta.url));
const source = readFileSync(new URL('../src/context/translations.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { en, es } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const result = spawnSync(process.env.PYTHON || 'python', [
  fileURLToPath(new URL('./generate_cv.py', import.meta.url)), root,
], { input: JSON.stringify({ en, es }), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
if (result.error) throw result.error;
process.stdout.write(result.stdout || '');
process.stderr.write(result.stderr || '');
process.exitCode = result.status ?? 1;
