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
import { SnappIcon } from './icons/SnappIcon';
import { RubikaIcon } from './icons/RubikaIcon';
import { BaleIcon } from './icons/BaleIcon';
import { BUSINESS, navigationLinks as navLinks } from '../src/data/business';

// همه مقادیر از منبع واحد خوانده می‌شود تا لینک‌ها در دو جای سایت
// از هم واگرا نشوند. مقدار را اینجا دستی ننویسید.
const PLACE_LABEL = BUSINESS.name;
const SNAPP_KEYWORD = BUSINESS.snappKeyword;

const mapButtons = [
    { name: 'گوگل مپ', href: navLinks.google, icon: <GoogleMapsIcon className="w-6 h-6 me-2" /> },
    { name: 'نشان', href: navLinks.neshan, icon: <NeshanIcon className="w-6 h-6 me-2" /> },
    { name: 'بلد', href: navLinks.balad, icon: <BaladIcon className="w-6 h-6 me-2" /> },
    { name: 'ویز', href: navLinks.waze, icon: <WazeIcon className="w-6 h-6 me-2" /> },
];

const Contact: React.FC = () => {
  const mapUrl = navLinks.embed;

  const [copied, setCopied] = React.useState(false);

  const handleCopyKeyword = async () => {
    try {
      await navigator.clipboard.writeText(SNAPP_KEYWORD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* اگر مرورگر اجازه ندهد، کاربر می‌تواند دستی تایپ کند */
    }
  };

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
                  <a href="https://wa.me/989211762186" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>09211762186</a>
                </div>
              </div>
               <div className="flex items-start">
                <RubikaIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">روبیکا</h3>
                  <a href="https://rubika.ir/09211762186" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>09211762186</a>
                </div>
              </div>
               <div className="flex items-start">
                <BaleIcon className="w-6 h-6 text-amber-500 me-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">بله</h3>
                  <a href="https://ble.ir/09211762186" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600" style={{direction: 'ltr', textAlign: 'right'}}>09211762186</a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-center">مسیریابی</h3>
                 <div className="grid grid-cols-2 gap-4">
                     {mapButtons.map(link => (
                         <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-slate-700 text-white px-4 py-3 rounded-md hover:bg-slate-900 transition-colors duration-300">
                             {link.icon}
                             <span>{link.name}</span>
                         </a>
                     ))}
                 </div>
                 {/* دکمه اسنپ */}
                 <a
                    href="https://app.snapp.taxi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCopyKeyword}
                    className="mt-4 flex items-center justify-center w-full bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-4 py-3 rounded-md transition-colors duration-300"
                 >
                    <SnappIcon className="w-6 h-6 me-2" />
                    <span className="font-bold">درخواست اسنپ به مقصد «دفتر ۱۷۶۲»</span>
                 </a>

                 <div className="mt-4 text-center text-sm text-slate-600 bg-slate-200 p-3 rounded-md space-y-2">
                    <p>
                      در اپلیکیشن اسنپ، در کادر مقصد عبارت{' '}
                      <button
                        type="button"
                        onClick={handleCopyKeyword}
                        className="font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-0.5 hover:bg-amber-50 hover:border-amber-400 transition-colors"
                        title="برای کپی کردن کلیک کنید"
                      >
                        {copied ? '✓ کپی شد' : 'دفتر اسناد رسمی ۱۷۶۲'}
                      </button>{' '}
                      را جستجو کنید.
                    </p>
                    <p className="text-slate-500">
                      با همین کلیدواژه ما را در تپسی (TAPSI) و ماکسیم (Maxim) نیز پیدا می‌کنید.
                    </p>
                 </div>
            </div>
          </div>
          <div className="w-full h-80 md:h-full rounded-lg shadow-lg overflow-hidden">
            <iframe
                src={mapUrl}
                title={`موقعیت مکانی ${PLACE_LABEL} روی نقشه`}
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