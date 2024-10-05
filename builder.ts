import { $, build } from 'bun';
import { existsSync, rmSync } from 'fs';
import pkg from './package.json';

// Generating types
const dir = './lib';
if (existsSync(dir)) rmSync(dir, { recursive: true });

build({
  format: 'esm',
  target: 'bun',
  outdir: './lib',
  entrypoints: ['./src/index.ts'],
  minify: {
    whitespace: true,
  },
  external: Object.keys(pkg.dependencies),
});

await $`bun x tsc`;
