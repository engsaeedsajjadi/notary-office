
import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-amber-400 mb-2 sm:mb-0">
          دفتر اسناد رسمی شماره ۱۷۶۲ تهران
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-s-6 text-sm">
          <a href="tel:02126212506" className="flex items-center hover:text-amber-400 transition-colors duration-300">
            <PhoneIcon className="w-4 h-4 me-2" />
            <span>۰۲۱-۲۶۲۱۲۵۰۶</span>
          </a>
          <a href="tel:02126212505" className="flex items-center hover:text-amber-400 transition-colors duration-300">
            <PhoneIcon className="w-4 h-4 me-2" />
            <span>۰۲۱-۲۶۲۱۲۵۰۵</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
