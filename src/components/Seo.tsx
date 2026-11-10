import { useEffect } from 'react';
import { BUSINESS } from '../data/business';

/**
 * مدیریت متاتگ‌های صفحه بدون کتابخانه اضافی.
 *
 * چون سایت SPA است، هنگام جابه‌جایی میان صفحات باید title، description،
 * canonical و Schema.org به‌روز شوند. این کامپوننت همان کار را انجام می‌دهد.
 *
 * نکته: کرالر گوگل جاوااسکریپت را اجرا می‌کند و این تگ‌ها را می‌بیند،
 * اما برای اطمینان بیشتر، prerender در زمان بیلد انجام می‌شود.
 */

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** داده ساختاریافته اختصاصی این صفحه */
  schema?: object | object[];
  image?: string;
  /** زبان صفحه — پیش‌فرض فارسی. برای نسخه انگلیسی 'en' */
  locale?: 'fa' | 'en';
  /** صفحاتی مثل ۴۰۴ که نباید ایندکس شوند */
  noindex?: boolean;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const PAGE_SCHEMA_ID = 'page-schema';

export default function Seo({
  title,
  description,
  path,
  keywords,
  schema,
  image,
  locale = 'fa',
  noindex = false,
}: SeoProps) {
  // وابستگی‌ها را به رشته پایدار تبدیل می‌کنیم تا افکت در هر رندر اجرا نشود
  const keywordsKey = keywords?.join(',') ?? '';
  const schemaKey = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    const fullTitle = title.includes(BUSINESS.shortName) || title.includes('۱۷۶۲')
      ? title
      : `${title} | ${BUSINESS.name}`;
    document.title = fullTitle;

    const url = `${BUSINESS.domain}${path}`;
    const ogImage = image ?? `${BUSINESS.domain}/og-image.png`;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords?.length) {
      upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    }

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    upsertMeta(
      'meta[property="og:locale"]',
      'property',
      'og:locale',
      locale === 'en' ? 'en_US' : 'fa_IR',
    );
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow',
    );

    // زبان و جهت صفحه — برای نسخه انگلیسی باید عوض شود
    document.documentElement.lang = locale === 'en' ? 'en' : 'fa';
    document.documentElement.dir = locale === 'en' ? 'ltr' : 'rtl';

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // داده ساختاریافته مخصوص صفحه (جدا از Schema ثابت در index.html)
    const existing = document.getElementById(PAGE_SCHEMA_ID);
    if (existing) existing.remove();
    if (schemaKey) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = PAGE_SCHEMA_ID;
      script.textContent = schemaKey;
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(PAGE_SCHEMA_ID)?.remove();
    };
  }, [title, description, path, keywordsKey, schemaKey, image, locale, noindex]);

  return null;
}
