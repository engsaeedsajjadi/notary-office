import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { ClockIcon } from './icons/ClockIcon';
import { EitaaIcon } from './icons/EitaaIcon';
import { EmailIcon } from './icons/EmailIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { site } from '../../data/site';

const navigationLinks = [
  { name: 'نشان', href: site.maps.neshan },
  { name: 'بلد', href: site.maps.balad },
  { name: 'گوگل مپ', href: site.maps.google },
  { name: 'ویز', href: site.maps.waze },
];

const messengers = [
  { name: 'ایتا', Icon: EitaaIcon, ...site.messengers.eitaa },
  { name: 'تلگرام', Icon: TelegramIcon, ...site.messengers.telegram },
  { name: 'واتساپ', Icon: WhatsAppIcon, ...site.messengers.whatsapp },
];

const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  'تهران، جردن، پلاک ۲۱۶، ساختمان مرکز تجارت ایران'
)}&z=17&ie=UTF8&output=embed`;

const Row: React.FC<{ Icon: React.FC<{ className?: string }>; title: string; children: React.ReactNode }> = ({ Icon, title, children }) => (
  <div className="flex items-start">
    <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center me-4 flex-shrink-0">
      <Icon className="w-5 h-5" />
    </span>
    <div className="min-w-0">
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

const linkClass = 'text-slate-600 hover:text-amber-600 transition-colors';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">تماس با ما و موقعیت مکانی</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <Row Icon={MapPinIcon} title="آدرس">
                <p className="text-slate-600 leading-relaxed">{site.address.full}</p>
              </Row>

              <Row Icon={PhoneIcon} title="شماره‌های تماس">
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {site.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} dir="ltr" className={linkClass}>
                      {phone.label}
                    </a>
                  ))}
                </div>
              </Row>

              <Row Icon={ClockIcon} title="ساعات کاری">
                {site.hours.map((h) => (
                  <p key={h.label} className="text-slate-600">
                    {h.label}: {h.display}
                  </p>
                ))}
                <p className="text-slate-600">{site.closedLabel}</p>
              </Row>

              <Row Icon={EmailIcon} title="ایمیل">
                <a href={`mailto:${site.email}`} dir="ltr" className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </Row>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">پیام‌رسان‌ها</h3>
              <div className="grid grid-cols-3 gap-3">
                {messengers.map(({ name, href, handle, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}: ${handle}`}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:border-amber-400 hover:text-amber-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">مسیریابی</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {navigationLinks.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-800 text-white px-3 py-3 rounded-xl text-sm font-medium hover:bg-slate-900 transition-colors"
                  >
                    <MapPinIcon className="w-4 h-4 text-amber-400" />
                    <span>{name}</span>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600 bg-slate-100 p-3 rounded-xl leading-relaxed">
                در اسنپ، تپسی و ماکسیم هم با جستجوی «دفتر اسناد رسمی ۱۷۶۲» ما را پیدا می‌کنید.
              </p>
            </div>
          </div>

          <div className="relative min-h-[22rem] rounded-2xl shadow-lg overflow-hidden bg-slate-200">
            <iframe
              src={mapUrl}
              title="موقعیت دفتر اسناد رسمی ۱۷۶۲ روی نقشه"
              className="absolute inset-0 w-full h-full border-0"
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
