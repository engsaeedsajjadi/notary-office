import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { structuredData } from './data/site';

/** Writes the schema.org JSON-LD into <head> from data/site.ts. */
function jsonLd(): Plugin {
  return {
    name: 'inject-json-ld',
    transformIndexHtml() {
      return structuredData().map((block) => ({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        // Escape "<" so the JSON can never close the script tag early.
        children: JSON.stringify(block).replace(/</g, '\\u003c'),
        injectTo: 'head' as const,
      }));
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), jsonLd()],
});
