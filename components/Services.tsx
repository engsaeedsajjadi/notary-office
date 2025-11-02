
import React from 'react';

const servicesList = [
  {
    title: "تنظیم اسناد مالی و معاملاتی",
    items: ["تنظیم قولنامه و مبایعه نامه و اجاره نامه و قرارداد پیش فروش و قرارداد مشارکت در ساخت", "صلح‌نامه", "رهن و فک رهن", "اجاره‌نامه رسمی", "قرارداد مشارکت در ساخت"]
  },
  {
    title: "تنظیم انواع وکالت‌نامه",
    items: ["وکالت فروش", "وکالت کاری و اداری", "وکالت جامع", "وکالت بلاعزل", "وکالت بانکی و قضایی"]
  },
  {
    title: "تنظیم اسناد خانواده و شخصی",
    items: ["تعهدنامه‌های رسمی", "اقرارنامه‌ها", "اقرار به دریافت یا بخشش مهریه", "رضایت‌نامه خروج از کشور"]
  },
  {
    title: "اسناد مربوط به خودرو",
    items: ["انتقال قطعی", "وکالت تعویض پلاک", "فک رهن خودرو"]
  },
  {
    title: "خدمات مربوط به املاک",
    items: ["انتقال قطعی", "صلح‌نامه", "تفکیک", "اسناد رهنی"]
  },
  {
    title: "گواهی‌ها و تصدیق‌ها",
    items: ["گواهی امضا", "گواهی کپی برابر اصل مدارک", "گواهی حضور"]
  },
  {
    title: "خدمات بانکی و وثایق",
    items: ["تنظیم اسناد رهنی بانکی", "قرارداد تسهیلات", "فک رهن و آزادسازی وثیقه"]
  },
  {
    title: "خدمات مربوط به ارث",
    items: ["تقسیم‌نامه ارث", "صلح سهم‌الارث", "وکالت امور انحصار وراثت"]
  },
  {
    title: "سایر خدمات",
    items: ["تایید ترجمه رسمی", "تعهدنامه ویزا یا گذرنامه", "گواهی اشتغال"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">خدمات ما</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;