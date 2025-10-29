
import React from 'react';

const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
);


const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center relative">
        <p className="text-sm text-center sm:text-start">
          کلیه حقوق برای دفتر اسناد رسمی شماره ۱۷۶۲ تهران محفوظ است. © {new Date().getFullYear()}
        </p>
        <button
          onClick={scrollToTop}
          className="absolute -top-5 sm:static sm:ms-4 bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300 shadow-lg"
          aria-label="بازگشت به بالا"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
