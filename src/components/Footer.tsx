import React from 'react';
import { site } from '../../data/site';

// Jalali year in Persian digits, e.g. ۱۴۰۵.
const year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center sm:text-start leading-relaxed">
          © {year} · کلیه حقوق برای {site.name} محفوظ است.
          <a href="/" dir="ltr" className="block sm:inline-block sm:ms-3 text-slate-400 hover:text-amber-400 transition-colors">
            {site.domainLabel}
          </a>
        </p>
        <a
          href="#home"
          className="bg-amber-500 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors flex-shrink-0"
          aria-label="بازگشت به بالا"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
