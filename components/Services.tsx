
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

const servicesList = [
  {
    title: "اسناد ملکی و رهنی",
    items: ["قطعی غیرمنقول", "رهن و اجاره", "مشارکت در ساخت", "پیش‌فروش ساختمان"],
    highlight: true
  },
  {
    title: "اسناد خودرو",
    items: ["وکالت فروش", "وکالت تعویض پلاک", "سند قطعی خودرو", "فک رهن"],
    highlight: false
  },
  {
    title: "وکالت‌نامه‌ها",
    items: ["وکالت کاری و اداری", "وکالت بلاعزل", "وکالت فروش ملک", "وکالت طلاق"],
    highlight: false
  },
  {
    title: "امور خانواده",
    items: ["اقرارنامه مهریه", "تعهدنامه", "رضایت‌نامه خروج همسر/فرزند", "وصیت‌نامه"],
    highlight: false
  },
  {
    title: "گواهی امضا",
    items: ["گواهی امضا فرم‌های بانکی", "تعهدنامه‌های دانشجویی", "فرم‌های ثبتی"],
    highlight: false
  },
  {
    title: "سایر خدمات ثبتی",
    items: ["برابر اصل مدارک", "استعلام ثبتی", "صدور اجراییه", "اقرارنامه‌های رسمی"],
    highlight: false
  }
];

const Services: React.FC = () => {
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
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-amber-600 font-bold tracking-wider text-sm uppercase mb-2 block">خدمات جامع ثبتی</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">هر آنچه برای امور ثبتی نیاز دارید</h2>
          <p className="text-slate-500">ارائه طیف وسیعی از خدمات اسناد رسمی با رویکردی مدرن و دقیق</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <div key={index} className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 border ${service.highlight ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-105 z-10' : 'bg-white text-slate-800 border-slate-200 hover:shadow-xl hover:border-amber-200'}`}>
              
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${service.highlight ? 'bg-amber-500' : 'bg-slate-500'}`}></div>

              <h3 className={`text-xl font-bold mb-6 flex items-center ${service.highlight ? 'text-amber-400' : 'text-slate-800'}`}>
                <span className={`w-2 h-8 rounded-full me-3 ${service.highlight ? 'bg-amber-500' : 'bg-amber-500'}`}></span>
                {service.title}
              </h3>
              
              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <svg className={`w-4 h-4 me-2 flex-shrink-0 ${service.highlight ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={service.highlight ? 'text-slate-300' : 'text-slate-600'}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className={`mt-8 pt-6 border-t ${service.highlight ? 'border-slate-700' : 'border-slate-100'}`}>
                 <a href="#contact" onClick={handleScrollToContact} className={`text-sm font-medium flex items-center transition-colors cursor-pointer ${service.highlight ? 'text-white hover:text-amber-400' : 'text-amber-600 hover:text-amber-700'}`}>
                    مشاوره بگیرید
                    <ArrowLeftIcon className="w-4 h-4 ms-1" />
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
