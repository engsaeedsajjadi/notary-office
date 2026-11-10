import { Link } from 'react-router-dom';
import { BUSINESS, primaryPhone } from '../data/business';
import { SERVICES } from '../data/services';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';
import { TelegramIcon } from '../../components/icons/TelegramIcon';
import { EitaaIcon } from '../../components/icons/EitaaIcon';
import { RubikaIcon } from '../../components/icons/RubikaIcon';
import { BaleIcon } from '../../components/icons/BaleIcon';

/** پیام‌رسان‌ها — همگی روی یک شماره واحد */
const MESSENGERS = [
  { name: 'واتساپ', href: BUSINESS.whatsapp.link, Icon: WhatsAppIcon },
  { name: 'تلگرام', href: BUSINESS.telegram.link, Icon: TelegramIcon },
  { name: 'ایتا', href: BUSINESS.eitaa.link, Icon: EitaaIcon },
  { name: 'روبیکا', href: BUSINESS.rubika.link, Icon: RubikaIcon },
  { name: 'بله', href: BUSINESS.bale.link, Icon: BaleIcon },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 print:hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* برند */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/favicon.svg" alt="" aria-hidden="true" className="h-12 w-12" />
              <span className="ms-3 font-bold text-amber-400 leading-tight">
                دفتر اسناد رسمی
                <br />
                شماره ۱۷۶۲ تهران
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ارائه خدمات ثبتی و تنظیم اسناد رسمی مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور.
            </p>
          </div>

          {/* خدمات پرکاربرد */}
          <div>
            <h3 className="font-bold text-white mb-4">خدمات پرکاربرد</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ابزارها */}
          <div>
            <h3 className="font-bold text-white mb-4">ابزارها و راهنما</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/fees" className="text-slate-400 hover:text-amber-400 transition-colors">
                  استعلام هزینه سند
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="text-slate-400 hover:text-amber-400 transition-colors">
                  چک‌لیست مدارک
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-slate-400 hover:text-amber-400 transition-colors">
                  مقالات حقوقی
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-slate-400 hover:text-amber-400 transition-colors">
                  درخواست نوبت
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-amber-400 transition-colors">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h3 className="font-bold text-white mb-4">تماس با ما</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-400 leading-relaxed">{BUSINESS.address.full}</li>
              {BUSINESS.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="text-slate-400 hover:text-amber-400 transition-colors">
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  style={{ direction: 'ltr', display: 'inline-block' }}
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="text-slate-400 pt-2">
                {BUSINESS.hours.weekdays.label}: {BUSINESS.hours.weekdays.open} تا{' '}
                {BUSINESS.hours.weekdays.close}
                <br />
                {BUSINESS.hours.thursday.label}: {BUSINESS.hours.thursday.open} تا{' '}
                {BUSINESS.hours.thursday.close}
              </li>
              <li className="pt-3">
                <span className="block text-slate-400 mb-2">
                  پیام‌رسان‌ها — {BUSINESS.messengerPhone.display}
                </span>
                <div className="flex flex-wrap gap-2">
                  {MESSENGERS.map((m) => (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={m.name}
                      aria-label={m.name}
                      className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <m.Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-slate-400 text-center sm:text-start">
            کلیه حقوق برای {BUSINESS.name} محفوظ است. © {year}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS.domain}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              www.1762daftarasnad.ir
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-amber-500 hover:bg-amber-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              aria-label="بازگشت به بالای صفحه"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* سلب مسئولیت — الزام حرفه‌ای */}
      <div className="bg-slate-950 text-slate-500 text-xs">
        <div className="container mx-auto px-6 py-4 text-center leading-relaxed">
          محتوای این وب‌سایت صرفاً جنبه اطلاع‌رسانی حقوقی دارد و جایگزین مشاوره تخصصی نیست.
          کلیه هزینه‌ها مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور دریافت می‌شود.
        </div>
      </div>
    </footer>
  );
}
