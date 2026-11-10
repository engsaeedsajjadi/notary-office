/**
 * تولید خودکار sitemap.xml از روی داده‌های سایت.
 *
 * دلیل وجود: نقشه سایت دستی همیشه از محتوا عقب می‌افتد. با اجرای این
 * اسکریپت در هر بیلد، هر خدمت یا مقاله جدیدی که به فایل‌های data اضافه
 * شود، خودکار در نقشه سایت ظاهر می‌شود.
 *
 * اجرا: npm run sitemap   (به‌صورت خودکار در npm run build هم اجرا می‌شود)
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const DOMAIN = 'https://www.1762daftarasnad.ir';

/** استخراج ساده slugها از فایل‌های TypeScript بدون نیاز به کامپایل */
function extractSlugs(file) {
  const src = readFileSync(resolve(root, file), 'utf8');
  return [...src.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]);
}

const serviceSlugs = extractSlugs('src/data/services.ts');
const articleSlugs = extractSlugs('src/data/articles.ts');

if (!serviceSlugs.length || !articleSlugs.length) {
  console.error('✗ هیچ slug ای پیدا نشد — ساختار فایل‌های data تغییر کرده است.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

/** @type {{path: string, priority: string, changefreq: string}[]} */
const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/fees', priority: '0.9', changefreq: 'monthly' },
  { path: '/checklist', priority: '0.8', changefreq: 'monthly' },
  { path: '/articles', priority: '0.8', changefreq: 'weekly' },
  { path: '/appointment', priority: '0.7', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/tracking', priority: '0.5', changefreq: 'yearly' },
  { path: '/partners', priority: '0.6', changefreq: 'yearly' },
  { path: '/en', priority: '0.7', changefreq: 'monthly' },
  ...serviceSlugs.map((s) => ({
    path: `/services/${s}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...articleSlugs.map((s) => ({
    path: `/articles/${s}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
];

const body = pages
  .map(
    (p) => `  <url>
    <loc>${DOMAIN}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- این فایل به‌صورت خودکار توسط scripts/generate-sitemap.mjs ساخته می‌شود.
     آن را دستی ویرایش نکنید. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`✓ نقشه سایت با ${pages.length} نشانی ساخته شد.`);
