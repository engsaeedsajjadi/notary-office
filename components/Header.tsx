
import React, { useState, useEffect } from 'react';
import { PhoneIcon } from './icons/PhoneIcon';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md py-2 shadow-lg border-b border-amber-500/30' : 'bg-slate-900 py-4 border-b-4 border-amber-600'}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand Section */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center group">
                <img 
                  src="/favicon.svg" 
                  alt="No.1762 Notary Public Logo" 
                  className={`transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-14 w-14'} drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-105`}
                />
                <div className="flex flex-col ms-3">
                    <h1 className={`font-bold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500 transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                      دفتر اسناد رسمی ۱۷۶۲ تهران
                    </h1>
                </div>
            </a>
             {/* Mobile Call Button (Visible only on small screens) */}
             <a href="tel:02126212506" className="md:hidden bg-amber-600 text-white p-2 rounded-full shadow-lg animate-pulse">
                <PhoneIcon className="w-5 h-5" />
             </a>
        </div>

        {/* Navigation & Desktop Call */}
        <div className="flex items-center gap-6 mt-3 md:mt-0">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-amber-400 transition-colors cursor-pointer">خانه</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-amber-400 transition-colors cursor-pointer">خدمات</a>
                <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-amber-400 transition-colors cursor-pointer">ویژگی‌ها</a>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-amber-400 transition-colors cursor-pointer">سوالات متداول</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-amber-400 transition-colors cursor-pointer">تماس و آدرس</a>
            </nav>
            
            <a href="tel:02126212506" className="hidden md:flex items-center bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-5 py-2 rounded-full shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105 active:scale-95 text-sm font-bold">
                <PhoneIcon className="w-4 h-4 me-2" />
                <span>۰۲۱-۲۶۲۱۲۵۰۶</span>
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
