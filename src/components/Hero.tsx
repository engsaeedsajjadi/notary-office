import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { site } from '../../data/site';

const mainPhone = site.phones[0];

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 pb-28 md:pt-44 md:pb-40 overflow-hidden bg-slate-900">
      {/* Background: the building entrance, heavily darkened so text stays readable */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/gallery/building-entrance.jpg')" }}
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/90 to-slate-900/60" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-2/3 text-center lg:text-start">
            <p className="inline-block px-4 py-1.5 mb-6 border border-amber-500/30 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
              دفتر اسناد رسمی شماره ۱۷۶۲ · جردن، تهران
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight md:leading-tight">
              دقت در <span className="text-amber-500">تنظیم اسناد</span>
              <br />
              تضمین آرامش شما
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              انجام کلیه امور اسناد رسمی، معاملات ملکی، وکالت‌نامه‌ها و گواهی امضا با بالاترین سرعت و دقت در محیطی اداری و حرفه‌ای.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={`tel:${mainPhone.tel}`}
                className="flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20"
              >
                <PhoneIcon className="w-5 h-5 me-2" />
                تماس و مشاوره
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-colors hover:border-white/50"
              >
                <MapPinIcon className="w-5 h-5 me-2" />
                آدرس و مسیریابی
              </a>
            </div>
          </div>

          {/* Office hours card */}
          <div className="w-full max-w-sm lg:w-1/3">
            <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                <span className="text-slate-400 text-sm">ساعات کاری</span>
                <span className="text-sm font-bold text-amber-500">دفترخانه ۱۷۶۲</span>
              </div>
              <dl className="space-y-3 text-sm">
                {site.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between gap-4">
                    <dt className="text-slate-300">{h.label}</dt>
                    <dd className="text-white font-bold">{h.display}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-300">جمعه و تعطیلات رسمی</dt>
                  <dd className="text-slate-400">تعطیل</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
