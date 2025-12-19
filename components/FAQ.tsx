
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const faqs = [
  {
    question: "مدارک لازم برای تنظیم وکالت‌نامه چیست؟",
    answer: "اصل کارت ملی و شناسنامه موکل (شخصی که وکالت می‌دهد) و کپی مدارک وکیل. در صورتی که موضوع وکالت ملک یا خودرو باشد، اسناد مالکیت نیز مورد نیاز است."
  },
  {
    question: "آیا برای گواهی امضا حضور خود شخص الزامی است؟",
    answer: "بله، طبق قانون برای گواهی امضا، حضور شخص امضا کننده به همراه اصل کارت ملی در محل دفترخانه الزامی است."
  },
  {
    question: "هزینه تنظیم اسناد چقدر است؟",
    answer: "هزینه‌های دفترخانه دقیقا مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور محاسبه می‌شود و هیچگونه هزینه اضافی دریافت نمی‌گردد. تمامی پرداخت‌ها از طریق دستگاه کارتخوان متصل به سامانه ثبت انجام می‌شود."
  },
  {
    question: "ساعات کاری دفترخانه چگونه است؟",
    answer: "شنبه تا چهارشنبه از ۷:۳۰ الی ۱۵:۳۰ و پنج‌شنبه‌ها از ۷:۳۰ الی ۱۲:۰۰. جهت رفاه حال مراجعین، امکان هماهنگی برای ساعات خارج از وقت اداری در موارد خاص وجود دارد."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">سوالات متداول</h2>
          <p className="text-slate-500">پاسخ به پرسش‌های رایج شما</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors">
              <button 
                className="w-full flex items-center justify-between p-5 text-start bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-amber-500' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
