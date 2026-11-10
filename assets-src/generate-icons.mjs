/**
 * تولید مجموعه کامل آیکون‌های سایت از فایل‌های SVG منبع.
 *
 * اجرا:  node assets-src/generate-icons.mjs
 * خروجی: پوشه public/
 *
 * سه نسخه از نشان طراحی شده تا در هر اندازه خوانا بماند:
 *   icon.svg        نسخه کامل (سند + مهر + عدد ۱۷۶۲)  → ۱۹۲px به بالا
 *   icon-small.svg  نسخه ساده‌شده (فقط عدد در دو سطر)  → ۳۲ تا ۱۸۰px
 *   icon-16.svg     نسخه حداقلی (فقط تیک)              → ۱۶px
 */
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => path.join(root, 'assets-src', f);
const out = (f) => path.join(root, 'public', f);

const FULL = src('icon.svg');
const SMALL = src('icon-small.svg');
const TINY = src('icon-16.svg');

// [فایل خروجی, اندازه, svg منبع, پس‌زمینه]
const targets = [
  ['favicon-16x16.png', 16, TINY, null],
  ['favicon-32x32.png', 32, SMALL, null],
  // گوگل برای نتایج جستجو آیکون ۴۸px به بالا لازم دارد و روی پس‌زمینه
  // سفید نمایش می‌دهد، بنابراین این نسخه‌ها پس‌زمینه تیره تخت دارند
  // تا نشان روی پس‌زمینه روشن گوگل محو نشود.
  ['favicon-48x48.png', 48, SMALL, '#0f172a'],
  ['favicon-96x96.png', 96, SMALL, '#0f172a'],
  ['apple-touch-icon.png', 180, SMALL, '#0f172a'], // iOS شفافیت را سیاه می‌کند
  ['android-chrome-192x192.png', 192, FULL, '#0f172a'],
  ['android-chrome-512x512.png', 512, FULL, '#0f172a'],
  ['logo-512x512.png', 512, FULL, '#ffffff'], // لوگوی Schema.org — پس‌زمینه سفید
  ['og-image.png', null, FULL, null], // جداگانه ساخته می‌شود
];

await mkdir(path.join(root, 'public'), { recursive: true });

for (const [name, size, source, bg] of targets) {
  if (!size) continue;
  let img = sharp(source, { density: 1600 }).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (bg) img = img.flatten({ background: bg });
  await img.png({ compressionLevel: 9 }).toFile(out(name));
  console.log(`✓ ${name} (${size}×${size})`);
}

// favicon.ico چندلایه (۱۶ + ۳۲ + ۴۸)
const icoSizes = [
  [16, TINY],
  [32, SMALL],
  [48, SMALL],
];
const pngs = await Promise.all(
  icoSizes.map(([s, f]) =>
    sharp(f, { density: 1600 }).resize(s, s).png({ compressionLevel: 9 }).toBuffer(),
  ),
);
// ساخت دستی فایل ICO (هدر ۶ بایت + ۱۶ بایت برای هر ورودی + داده PNG)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + pngs.length * 16;
const dirs = pngs.map((png, i) => {
  const d = Buffer.alloc(16);
  const s = icoSizes[i][0];
  d.writeUInt8(s === 256 ? 0 : s, 0);
  d.writeUInt8(s === 256 ? 0 : s, 1);
  d.writeUInt8(0, 2);
  d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(png.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += png.length;
  return d;
});
const { writeFile } = await import('node:fs/promises');
await writeFile(out('favicon.ico'), Buffer.concat([header, ...dirs, ...pngs]));
console.log('✓ favicon.ico (16+32+48)');

// تصویر Open Graph برای اشتراک‌گذاری در شبکه‌های اجتماعی (۱۲۰۰×۶۳۰)
// نکته: متن فارسی نیاز به فونت Vazirmatn دارد که در assets-src/fonts قرار دارد.
// اگر فونت روی سیستم نصب نباشد، sharp به فونت پیش‌فرض برمی‌گردد.
const badge = await sharp(FULL, { density: 1600 }).resize(360, 360).png().toBuffer();

const ogText = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fcd34d"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="200" fill="#f59e0b" opacity="0.07"/>
  <circle cx="120" cy="560" r="170" fill="#38bdf8" opacity="0.05"/>

  <text x="740" y="250" text-anchor="middle" direction="rtl"
        font-family="Vazirmatn" font-weight="bold" font-size="62" fill="#ffffff">دفتر اسناد رسمی</text>
  <text x="740" y="345" text-anchor="middle" direction="rtl"
        font-family="Vazirmatn" font-weight="bold" font-size="76" fill="url(#g)">شماره ۱۷۶۲ تهران</text>
  <text x="740" y="425" text-anchor="middle" direction="rtl"
        font-family="Vazirmatn" font-size="36" fill="#94a3b8">تنظیم سند رسمی، وکالت‌نامه، صلح عمری</text>
  <text x="740" y="490" text-anchor="middle" direction="rtl"
        font-family="Vazirmatn" font-size="34" fill="#cbd5e1">تهران، جردن، ساختمان مرکز تجارت ایران</text>
  <text x="740" y="548" text-anchor="middle"
        font-family="Vazirmatn" font-weight="bold" font-size="34" fill="#f59e0b">۰۲۱ ۲۶۲۱۲۵۰۶</text>

  <rect x="0" y="600" width="1200" height="30" fill="url(#g)"/>
</svg>`);

await sharp(ogText)
  .composite([{ input: badge, top: 135, left: 90 }])
  .png({ compressionLevel: 9 })
  .toFile(out('og-image.png'));
console.log('✓ og-image.png (1200×630)');

// کپی SVG اصلی برای استفاده در هدر سایت
await copyFile(FULL, out('favicon.svg'));
console.log('✓ favicon.svg');

console.log('\nتمام آیکون‌ها در پوشه public/ ساخته شدند.');
