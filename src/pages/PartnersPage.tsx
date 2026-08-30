import React, { useState } from 'react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS, primaryPhone } from '../data/business';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { ShieldCheckIcon } from '../../components/icons/ShieldCheckIcon';
import { CheckBadgeIcon } from '../../components/icons/CheckBadgeIcon';
import { BoltIcon } from '../../components/icons/BoltIcon';

/**
 * پرتال همکاری مشاورین املاک.
 *
 * منطق تجاری: یک بنگاه املاک فعال در جردن ممکن است ماهانه چندین معامله
 * داشته باشد. جذب یک بنگاه = جریان مستمر پرونده، در حالی که جذب یک
 * مشتری عادی = یک پرونده. این صفحه دقیقاً برای همین بخش پرارزش نوشته شده.
 */

const BENEFITS = [
  {
    Icon: ClockIcon,
    title: 'اولویت در زمان‌بندی',
    text: 'پرونده‌های ارجاعی همکاران در ساعت توافق‌شده انجام می‌شود؛ موکل شما در دفتر منتظر نمی‌ماند.',
  },
  {
    Icon: BoltIcon,
    title: 'استعلام پیش از حضور',
    text: 'با ارسال قبلی اطلاعات ملک، استعلامات ثبتی و شهرداری پیش از مراجعه طرفین اخذ می‌شود.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'بررسی رایگان پیش‌نویس',
    text: 'قبل از قطعی شدن معامله، مبایعه‌نامه یا شرایط خاص مورد نظر شما را از منظر ثبتی بررسی می‌کنیم.',
  },
  {
    Icon: CheckBadgeIcon,
    title: 'کانال ارتباطی مستقیم',
    text: 'خط ارتباطی اختصاصی با مسئول پرونده، بدون نیاز به تماس‌های مکرر و انتظار پشت خط.',
  },
];

export default function PartnersPage() {
  const [agency, setAgency] = useState('');
  const [manager, setManager] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('جردن');
  const [volume, setVolume] = useState('۱ تا ۵ پرونده');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agency.trim().length < 2 || phone.trim().length < 10) return;

    const text = encodeURIComponent(
      [
        `درخواست همکاری — پرتال مشاورین املاک`,
        `${BUSINESS.shortName}`,
        '',
        `نام بنگاه/آژانس: ${agency.trim()}`,
        `نام مدیر: ${manager.trim() || '—'}`,
        `تلفن: ${phone.trim()}`,
        `محدوده فعالیت: ${area}`,
        `حجم تقریبی ماهانه: ${volume}`,
      ].join('\n'),
    );
    window.open(`${BUSINESS.whatsapp.link}?text=${text}`, '_blank', 'noopener');
    setSent(true);
  };

  const inputClass =
    'w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition';

  return (
    <>
      <Seo
        title="پرتال همکاری مشاورین املاک"
        description="همکاری مشاورین املاک و بنگاه‌های محدوده جردن با دفتر اسناد رسمی ۱۷۶۲ تهران: اولویت زمان‌بندی، استعلام پیش از حضور و بررسی رایگان پیش‌نویس."
        path="/partners"
        keywords={['همکاری مشاور املاک', 'دفترخانه جردن', 'بنگاه املاک تهران', 'انتقال سند سریع']}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'همکاری مشاورین املاک' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            پرتال همکاری مشاورین املاک
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
            برای دفاتر املاک محدوده جردن، آفریقا، ونک و میرداماد: مسیر اختصاصی انتقال
            سند، بدون معطلی موکل و بدون رفت‌وبرگشت مدارک.
          </p>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <b.Icon className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 mb-1.5">{b.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-5">
                <h2 className="text-xl font-bold text-white">درخواست همکاری</h2>
                <p className="text-slate-400 text-sm mt-1">
                  پس از ثبت، جهت هماهنگی و تعیین رابط پرونده با شما تماس گرفته می‌شود.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="pt-agency" className="block font-bold text-slate-800 mb-2">
                      نام بنگاه / آژانس <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="pt-agency"
                      type="text"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pt-manager" className="block font-bold text-slate-800 mb-2">
                      نام مدیر
                    </label>
                    <input
                      id="pt-manager"
                      type="text"
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="pt-phone" className="block font-bold text-slate-800 mb-2">
                      تلفن تماس <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="pt-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pt-area" className="block font-bold text-slate-800 mb-2">
                      محدوده فعالیت
                    </label>
                    <select
                      id="pt-area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className={inputClass}
                    >
                      {['جردن', 'آفریقا', 'ونک', 'میرداماد', 'زعفرانیه', 'سایر مناطق تهران'].map(
                        (a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="pt-volume" className="block font-bold text-slate-800 mb-2">
                    حجم تقریبی معاملات ماهانه
                  </label>
                  <select
                    id="pt-volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className={inputClass}
                  >
                    {['۱ تا ۵ پرونده', '۵ تا ۱۵ پرونده', 'بیش از ۱۵ پرونده'].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-xl transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 me-2" />
                  ارسال درخواست همکاری
                </button>

                {sent && (
                  <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-xl p-3">
                    درخواست شما در واتساپ باز شد. پس از ارسال، همکاران ما تماس می‌گیرند.
                  </p>
                )}
              </form>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">چرا دفترخانه ۱۷۶۲؟</h2>
                <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-disc ps-5">
                  <li>واقع در قلب جردن، در دسترس برای موکلین محدوده شمال تهران.</li>
                  <li>پارکینگ ساختمان مرکز تجارت ایران برای مراجعین.</li>
                  <li>آشنایی با معاملات ملکی خاص محدوده و اسناد شرکتی.</li>
                  <li>امکان خدمت‌رسانی به اتباع خارجی و شرکت‌های بین‌المللی منطقه.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-lg mb-2">گفت‌وگوی مستقیم</h2>
                <p className="text-sm text-amber-50 leading-relaxed mb-4">
                  برای طرح شرایط همکاری، تماس بگیرید.
                </p>
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="flex items-center justify-center w-full bg-white text-amber-700 font-bold px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 me-2" />
                  {primaryPhone.display}
                </a>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed bg-slate-100 rounded-xl p-4">
                توضیح: خدمات این دفترخانه مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور
                ارائه می‌شود. همکاری با مشاورین املاک صرفاً به معنای تسهیل فرایند اداری
                است و هیچ‌گونه تخفیف، پورسانت یا پرداختی خارج از تعرفه در آن وجود ندارد.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
