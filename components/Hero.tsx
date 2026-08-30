
import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MapPinIcon } from './icons/MapPinIcon';

const Hero: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
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
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900">
      {/* Background Image with modern overlay
          تصویر به‌صورت محلی سرو می‌شود (بدون وابستگی به سرور خارجی).
          مرورگرهای مدرن WebP و بقیه JPEG را دریافت می‌کنند. */}
      <picture className="absolute inset-0 z-0">
        <source media="(max-width: 768px)" srcSet="/hero-mobile.webp" type="image/webp" />
        <source srcSet="/hero.webp" type="image/webp" />
        <img
          src="/hero.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="w-full h-full object-cover transform scale-105"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70 z-10"></div>
      
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl z-10 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-2/3 text-center md:text-start">
                <div className="inline-block px-4 py-1.5 mb-6 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-sm">
                    <span className="text-amber-400 text-sm font-medium tracking-wide">ارائه خدمات نوین ثبتی در جردن</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                  دقت در <span className="text-amber-500">تنظیم اسناد</span><br/>
                  تضمین آرامش شما
                </h2>
                
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed mx-auto md:mx-0">
                  انجام کلیه امور اسناد رسمی، معاملات ملکی، وکالت‌نامه‌ها و گواهی امضا با بالاترین سرعت و دقت در محیطی اداری و حرفه‌ای.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="tel:02126212506" className="flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transform hover:-translate-y-1">
                        <PhoneIcon className="w-5 h-5 me-2" />
                        مشاوره و تماس
                    </a>
                    <a href="#contact" onClick={handleScrollToContact} className="flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all hover:border-white/50 cursor-pointer">
                        <MapPinIcon className="w-5 h-5 me-2" />
                        مسیریابی سریع
                    </a>
                </div>
            </div>

            {/* Stats/Badge for Desktop */}
            <div className="hidden md:block w-1/3 ps-12">
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                        <span className="text-slate-400 text-sm">کد دفترخانه</span>
                        <span className="text-2xl font-mono font-bold text-amber-500">۱۷۶۲</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 me-3 animate-pulse"></div>
                            <span className="text-white text-sm">وضعیت: <span className="text-green-400">فعال و آماده خدمت‌رسانی</span></span>
                        </div>
                        <div className="text-sm text-slate-300">
                            ساعات کاری: <span className="text-white font-bold">۷:۳۰ الی ۱۵:۳۰</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
