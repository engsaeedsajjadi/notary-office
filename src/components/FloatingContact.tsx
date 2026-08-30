import { useEffect, useState } from 'react';
import { BUSINESS, primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';

/**
 * دکمه شناور تماس — همیشه در دسترس.
 * تأثیر مستقیم روی نرخ تبدیل: کاربر در هر نقطه از صفحه می‌تواند تماس بگیرد.
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3 transition-all duration-300 print:hidden ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {open && (
        <div className="flex flex-col gap-3 mb-1">
          <a
            href={BUSINESS.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white shadow-xl border border-slate-200 rounded-full ps-4 pe-2 py-2 hover:border-emerald-400 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-700 me-3">واتساپ</span>
            <span className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
            </span>
          </a>
          <a
            href={`tel:${primaryPhone.tel}`}
            className="flex items-center bg-white shadow-xl border border-slate-200 rounded-full ps-4 pe-2 py-2 hover:border-amber-400 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-700 me-3">تماس تلفنی</span>
            <span className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <PhoneIcon className="w-5 h-5" />
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'بستن راه‌های تماس' : 'باز کردن راه‌های تماس'}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xl shadow-amber-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <PhoneIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
