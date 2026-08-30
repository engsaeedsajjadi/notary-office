
import React from 'react';
import { ScaleIcon } from './icons/ScaleIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { PhoneIcon } from './icons/PhoneIcon';

const detailedServices = [
  'تنظیم وکالت اموال منقول و غیرمنقول',
  'تنظیم سند قطعی اموال غیرمنقول (آپارتمان، زمین، ملک کلنگی)',
  'گواهی امضا',
  'تبدیل اسناد ملکی از دفترچه‌ای (منگوله‌ای، سیم سُربی) به تک‌برگ',
  'تنظیم اجاره‌نامه، مبایعه‌نامه، پیش‌فروش، مشارکت در ساخت',
  'ثبت تقاضای صدور اجرائیه اجاره، چک، اسناد رهنی، بانکی و ذمه',
  'اقرار، تعهد، کپی برابر با اصل',
];

const ServicesDetail: React.FC = () => {
  return (
    <section id="services-detail" className="py-20 bg-white">
      <div className="container mx-auto px-6">

        {/* ==================== لیست خدمات ==================== */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-amber-600 font-bold tracking-wider text-sm mb-2 block">
            دفتر اسناد رسمی ۱۷۶۲ تهران
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            فهرست خدمات دفترخانه
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {detailedServices.map((service, index) => (
              <li key={index} className="flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center me-3 text-sm group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  {index + 1}
                </span>
                <span className="text-slate-700 leading-relaxed pt-1">{service}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ==================== صلح عمری ==================== */}
        <article
          id="solh-omri"
          className="max-w-4xl mx-auto mt-16 bg-slate-900 text-slate-300 rounded-2xl overflow-hidden shadow-2xl scroll-mt-28"
        >
          <div className="p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <ScaleIcon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white ms-4">
                  صلح عمری چیست؟
                </h3>
              </div>

              <div className="space-y-5 leading-loose text-justify">
                <p>
                  صلح عمری یکی از قراردادهای قانونی و پرکاربرد در انتقال اموال است که به موجب آن،
                  مالک می‌تواند ملک یا مال خود را به شخص دیگری صلح کند و در عین حال، حق استفاده و
                  بهره‌برداری از آن را تا پایان عمر برای خود محفوظ نگه دارد.
                </p>
                <p>
                  در قرارداد صلح عمری، انتقال مالکیت طبق مفاد سند انجام می‌شود، اما منافع مال تا
                  زمان حیات مُصالح (انتقال‌دهنده) در اختیار او باقی می‌ماند. این نوع قرارداد معمولاً
                  برای مدیریت دارایی، انتقال مطمئن اموال به افراد مورد اعتماد و جلوگیری از اختلافات
                  احتمالی در آینده تنظیم می‌شود.
                </p>
                <p className="flex items-start bg-white/5 border border-white/10 rounded-xl p-4">
                  <CheckBadgeIcon className="w-6 h-6 text-amber-500 me-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-200">
                    تنظیم سند صلح عمری در دفتر اسناد رسمی، با رعایت مقررات قانونی و ثبت رسمی، موجب
                    اعتبار بیشتر قرارداد و حفظ حقوق طرفین خواهد شد.
                  </span>
                </p>
              </div>

              <a
                href="tel:02126212506"
                className="inline-flex items-center mt-8 bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-0.5"
              >
                <PhoneIcon className="w-5 h-5 me-2" />
                مشاوره درباره صلح عمری
              </a>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};

export default ServicesDetail;
