import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { ClockIcon } from './icons/ClockIcon';
import { EitaaIcon } from './icons/EitaaIcon';
import { GoogleMapsIcon } from './icons/GoogleMapsIcon';
import { WazeIcon } from './icons/WazeIcon';
import { NeshanIcon } from './icons/NeshanIcon';
import { BaladIcon } from './icons/BaladIcon';
import { EmailIcon } from './icons/EmailIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const navigationLinks = [
    { name: 'گوگل مپ', href: 'https://maps.app.goo.gl/9qW1wY8XzZt6nLq8A', icon: <GoogleMapsIcon className="w-6 h-6 me-2" /> },
    { name: 'نشان', href: 'https://nshn.ir/90rbv_7RYx_j7z', icon: <NeshanIcon className="w-6 h-6 me-2" /> },
    { name: 'بلد', href: 'https://balad.ir/p/4fCj3fH2sJgUf7', icon: <BaladIcon className="w-6 h-6 me-2" /> },
    { name: 'ویز', href: 'https://waze.com/ul/htnke9ud6d', icon: <WazeIcon className="w-6 h-6 me-2" /> },
];

const Contact: React.FC = () => {
  const mapUrl = "https://maps.google.com/maps?q=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D8%AC%D8%B1%D8%AF%D9%86%D8%8C%20%D9%BE%D9%84%D8%A7%DA%A9%20%DB%B2%DB%B1%DB%B6%D8%8C%20%D8%B3%D8%A7%D8%AE%D8%AA%D9%85%D8%A7%D9%86%20%D9%85%D8%B1%DA%A9%D8%B2%20%D8%AA%D8%AC%D8%A7%D8%B1%D8%AA%20%D8%A7%DB%8C%D8%B1%D8%A7%D9%86&t=&z=17&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">تماس با ما و موقعیت مکانی</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">آدرس</h3>
                  <p className="text-slate-600">تهران، جردن، پلاک ۲۱۶، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۳</p>
                </div>
              </div>
               <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">شماره‌های تماس</h3>
                  <a href="tel:02126212506" className="block text-slate-600 hover:text-amber-600">۰۲۱-۲۶۲۱۲۵۰۶</a>
                  <a href="tel:02126212505" className="block text-slate-600 hover:text-amber-600">۰۲۱-۲۶۲۱۲۵۰۵</a>
                </div>
              </div>
              <div className="flex items-start">
                <EmailIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">ایمیل</h3>
                  <a href="mailto:no1762notarypublic@gmail.com" className="block text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>no1762notarypublic@gmail.com</a>
                </div>
              </div>
               <div className="flex items-start">
                <ClockIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">ساعات کاری</h3>
                  <p className="text-slate-600">شنبه تا چهارشنبه: ۷:۳۰ الی ۱۵:۳۰</p>
                  <p className="text-slate-600">پنج‌شنبه‌ها: ۷:۳۰ الی ۱۲:۰۰</p>
                  <p className="text-slate-600">جمعه‌ها و تعطیلات رسمی: تعطیل</p>
                </div>
              </div>
              <div className="flex items-start">
                <EitaaIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">پیام‌رسان ایتا</h3>
                  <a href="https://eitaa.com/No1762notarypublic" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>@No1762notarypublic</a>
                </div>
              </div>
              <div className="flex items-start">
                <TelegramIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">تلگرام</h3>
                  <a href="https://t.me/No1762notarypublic" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>@No1762notarypublic</a>
                </div>
              </div>
               <div className="flex items-start">
                <WhatsAppIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">واتساپ</h3>
                  <a href="https://wa.me/989050890758" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>09050890758</a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-center">مسیریابی</h3>
                 <div className="grid grid-cols-2 gap-4">
                     {navigationLinks.map(link => (
                         <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-slate-700 text-white px-4 py-3 rounded-md hover:bg-slate-900 transition-colors duration-300">
                             {link.icon}
                             <span>{link.name}</span>
                         </a>
                     ))}
                 </div>
                 <div className="mt-6 text-center text-sm text-slate-500 bg-slate-200 p-3 rounded-md">
                    <p>"با جستجوی کلیدواژه «دفتر اسناد رسمی ۱۷۶۲» ما را در اسنپ (Snapp)، تپسی (TAPSI) و ماکسیم (Maxim) به راحتی پیدا کنید."</p>
                 </div>
            </div>
          </div>
          <div className="w-full h-80 md:h-full rounded-lg shadow-lg overflow-hidden">
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;