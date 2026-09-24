import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const dist = resolve(root, 'dist');
await mkdir(dist, { recursive: true });
await copyFile(resolve(dist, 'index.html'), resolve(dist, '404.html'));
console.log('Generated dist/404.html SPA fallback.');
