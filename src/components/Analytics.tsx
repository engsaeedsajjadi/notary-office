import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 برای اپلیکیشن تک‌صفحه‌ای.
 *
 * راه‌اندازی: شناسه اندازه‌گیری را در فایل `.env` قرار دهید:
 *     VITE_GA_ID=G-XXXXXXXXXX
 * تا وقتی این متغیر تعریف نشده باشد، هیچ اسکریپتی بارگذاری نمی‌شود —
 * یعنی در محیط توسعه و در صورت فراموشی تنظیمات، سایت کاملاً پاک می‌ماند.
 *
 * چون سایت SPA است، gtag به‌تنهایی فقط اولین صفحه را ثبت می‌کند؛
 * این کامپوننت هر تغییر مسیر را به‌صورت دستی به‌عنوان page_view می‌فرستد.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export default function Analytics() {
  const location = useLocation();
  const loaded = useRef(false);

  // بارگذاری یک‌باره اسکریپت
  useEffect(() => {
    if (!GA_ID || loaded.current) return;
    loaded.current = true;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    // ارسال دستی page_view را خودمان انجام می‌دهیم
    window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true });
  }, []);

  // ثبت هر تغییر مسیر
  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

/** ثبت رویدادهای تبدیل: تماس، واتساپ، ارسال فرم و … */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params ?? {});
  }
}
