
import React from 'react';
import { BoltIcon } from './icons/BoltIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

const features = [
  {
    Icon: BoltIcon,
    title: "سرعت در انجام امور",
    description: "با بهره‌گیری از سیستم‌های الکترونیک و پرسنل مجرب، زمان انتظار شما را به حداقل می‌رسانیم."
  },
  {
    Icon: ShieldCheckIcon,
    title: "دقت و امنیت حقوقی",
    description: "تضمین صحت و اعتبار قانونی اسناد شما با نظارت دقیق سردفتر و کارشناسان حقوقی."
  },
  {
    Icon: DocumentTextIcon,
    title: "مشاوره تخصصی رایگان",
    description: "قبل از تنظیم هر سند، مشاوره کامل در خصوص ابعاد حقوقی و مالی آن دریافت کنید."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white relative">
      {/* Anchor for navigation with offset adjustment for negative margin */}
      <div id="features" className="absolute -top-32 left-0 w-full h-1 invisible"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-30">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                <feature.Icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
