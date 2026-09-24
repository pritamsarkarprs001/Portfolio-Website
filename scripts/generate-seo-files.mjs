import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const dist = resolve(root, 'dist');

function parseEnvFile(contents) {
  const values = {};
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    values[key] = value;
  }
  return values;
}

async function loadEnvironment() {
  const values = {};
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    try {
      Object.assign(values, parseEnvFile(await readFile(resolve(root, file), 'utf8')));
    } catch {
      // Optional env files are intentionally ignored.
    }
  }
  return { ...values, ...process.env };
}

function normalizeBasePath(value) {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

function normalizeSiteUrl(value, basePath) {
  const origin = (value || 'https://your-domain.example').replace(/\/$/, '');
  return origin.endsWith(basePath) ? origin : `${origin}${basePath}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const env = await loadEnvironment();
const basePath = normalizeBasePath(env.VITE_BASE_PATH);
const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL, basePath);
const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/deep-research-ai',
  '/projects/autorecruiter',
  '/projects/agri-scan-ai',
  '/projects/air-touch-control-system',
  '/projects/audio-lyrics-clustering',
  '/research',
  '/research/shrimp-disease-detection-localization',
  '/research/evapotranspiration-drought-unsupervised-analysis',
  '/research/attention-st-cnn-soil-moisture',
  '/research/wind-energy-resource-mapping',
  '/contact',
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    (route) => `  <url><loc>${escapeXml(`${siteUrl}${route === '/' ? '/' : route}`)}</loc></url>`,
  )
  .join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: ${basePath || ''}/cv\nDisallow: ${basePath || ''}/showcase\nSitemap: ${siteUrl}/sitemap.xml\n`;

await mkdir(dist, { recursive: true });
await writeFile(resolve(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(dist, 'robots.txt'), robots, 'utf8');
console.log(`Generated SEO files for ${siteUrl}`);
