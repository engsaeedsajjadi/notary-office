import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * در SPA، هنگام رفتن به صفحه جدید مرورگر موقعیت اسکرول را حفظ می‌کند.
 * این کامپوننت صفحه را به بالا برمی‌گرداند، مگر لینک دارای هش باشد.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
