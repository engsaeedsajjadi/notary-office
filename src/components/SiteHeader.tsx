import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BUSINESS, primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';

const NAV = [
  { to: '/', label: 'خانه', end: true },
  { to: '/services', label: 'خدمات' },
  { to: '/fees', label: 'محاسبه هزینه' },
  { to: '/checklist', label: 'مدارک لازم' },
  { to: '/articles', label: 'مقالات' },
  { to: '/appointment', label: 'درخواست نوبت' },
  { to: '/contact', label: 'تماس و آدرس' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // بستن منو هنگام تغییر صفحه
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // قفل اسکرول وقتی منوی موبایل باز است
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors cursor-pointer ${
      isActive ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-amber-400'
    }`;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 print:hidden ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md py-2 shadow-lg border-b border-amber-500/30'
          : 'bg-slate-900 py-3 border-b-4 border-amber-600'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* برند */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden="true"
              className={`transition-all duration-300 ${
                scrolled ? 'h-9 w-9' : 'h-12 w-12'
              } drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-105`}
            />
            <span
              className={`ms-3 font-bold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500 transition-all duration-300 ${
                scrolled ? 'text-base' : 'text-lg lg:text-xl'
              }`}
            >
              دفتر اسناد رسمی ۱۷۶۲ تهران
            </span>
          </Link>

          {/* ناوبری دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden sm:flex items-center bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 text-sm font-bold whitespace-nowrap"
            >
              <PhoneIcon className="w-4 h-4 me-2" />
              <span>{primaryPhone.display}</span>
            </a>

            <a
              href={`tel:${primaryPhone.tel}`}
              aria-label={`تماس با ${BUSINESS.shortName}`}
              className="sm:hidden bg-amber-600 text-white p-2.5 rounded-full shadow-lg"
            >
              <PhoneIcon className="w-5 h-5" />
            </a>

            {/* دکمه منوی موبایل */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              className="lg:hidden text-slate-200 p-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {menuOpen && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-slate-700 pb-2">
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.end}
                    className={({ isActive }) =>
                      `block py-3 px-2 rounded-lg transition-colors ${
                        isActive
                          ? 'text-amber-400 font-bold bg-slate-800/60'
                          : 'text-slate-300 hover:bg-slate-800/40'
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
