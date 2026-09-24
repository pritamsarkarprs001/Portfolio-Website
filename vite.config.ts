import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function htmlSiteUrlPlugin(siteUrl: string, basePath: string): Plugin {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  const normalizedBasePath = basePath === '/' ? '' : basePath.replace(/\/$/, '');
  const canonicalBase = normalizedSiteUrl.endsWith(normalizedBasePath)
    ? normalizedSiteUrl
    : `${normalizedSiteUrl}${normalizedBasePath}`;
  return {
    name: 'portfolio-html-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', canonicalBase);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH || '/';
  const siteUrl = env.VITE_SITE_URL || 'https://your-domain.example';
  return {
    base: basePath,
    plugins: [react(), htmlSiteUrlPlugin(siteUrl, basePath)],
    server: {
      port: 5173,
      open: false,
    },
    preview: {
      port: 4173,
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 700,
    },
  };
});
