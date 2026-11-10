import React, { useEffect, useState } from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MenuIcon } from './icons/MenuIcon';
import { site } from '../../data/site';

const navItems = [
  { href: '#home', label: 'خانه' },
  { href: '#services', label: 'خدمات' },
  { href: '#gallery', label: 'گالری' },
  { href: '#faq', label: 'سوالات متداول' },
  { href: '#contact', label: 'تماس و آدرس' },
];

const mainPhone = site.phones[0];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
        menuOpen
          ? 'bg-slate-900 shadow-lg border-amber-500/30'
          : scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-amber-500/30'
            : 'bg-slate-900 border-transparent'
      }`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-16' : 'h-16 md:h-20'}`}>
        <a href="#home" className="flex items-center gap-3 min-w-0 group" onClick={() => setMenuOpen(false)}>
          <img
            src="/logo.webp"
            alt=""
            width={160}
            height={160}
            className="h-11 w-11 flex-shrink-0 rounded-lg ring-1 ring-amber-500/40 group-hover:ring-amber-400 transition"
          />
          <span className="font-bold text-amber-400 text-base sm:text-lg md:text-xl truncate">
            دفتر اسناد رسمی ۱۷۶۲ تهران
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="منوی اصلی">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-amber-400 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`tel:${mainPhone.tel}`}
            className="hidden sm:flex items-center bg-amber-500 hover:bg-amber-400 text-slate-900 px-5 py-2 rounded-full transition-colors text-sm font-bold"
          >
            <PhoneIcon className="w-4 h-4 me-2" />
            <span dir="ltr">{mainPhone.label}</span>
          </a>
          <a
            href={`tel:${mainPhone.tel}`}
            aria-label={`تماس با دفترخانه: ${mainPhone.label}`}
            className="sm:hidden w-11 h-11 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center"
          >
            <PhoneIcon className="w-5 h-5" />
          </a>
          <button
            type="button"
            className="lg:hidden w-11 h-11 rounded-full text-slate-200 hover:bg-white/10 flex items-center justify-center"
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon className="w-6 h-6" open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="lg:hidden border-t border-white/10" aria-label="منوی اصلی">
          <ul className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-slate-200 font-medium hover:bg-white/10 hover:text-amber-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
