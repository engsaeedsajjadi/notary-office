import React, { useState } from 'react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS, primaryPhone } from '../data/business';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';
import { PhoneIcon } from '../../components/icons/PhoneIcon';

/**
 * پیگیری وضعیت پرونده.
 *
 * پیاده‌سازی بدون بک‌اند: کاربر کد رهگیری را وارد می‌کند و یک استعلام
 * ساختاریافته برای دفتر ارسال می‌شود. این کار حجم تماس‌های تلفنی
 * «پرونده من چی شد؟» را کم می‌کند بدون آنکه نیاز به سرور و پایگاه داده
 * و مسئولیت نگهداری داده شخصی مراجعین ایجاد شود.
 *
 * مسیر ارتقا: هر وقت دفتر سامانه داخلی داشت، کافی است این تابع به
 * یک fetch به API واقعی تغییر کند — بقیه رابط کاربری دست‌نخورده می‌ماند.
 */

const normalizeDigits = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = normalizeDigits(code).trim();
    const cleanPhone = normalizeDigits(phone).trim();

    if (cleanCode.length < 4) {
      setError('کد رهگیری یا شماره پرونده را وارد کنید.');
      return;
    }
    if (cleanPhone.length < 10) {
      setError('شماره تماس ثبت‌شده در پرونده را وارد کنید.');
      return;
    }
    setError('');

    const text = encodeURIComponent(
      [
        `استعلام وضعیت پرونده — ${BUSINESS.shortName}`,
        '',
        `کد رهگیری / شماره پرونده: ${cleanCode}`,
        `شماره تماس: ${cleanPhone}`,
        '',
        'لطفاً وضعیت فعلی پرونده را اعلام فرمایید.',
      ].join('\n'),
    );
    window.open(`${BUSINESS.whatsapp.link}?text=${text}`, '_blank', 'noopener');
  };

  const inputClass =
    'w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition';

  const stages = [
    { title: 'ثبت درخواست', desc: 'مدارک تحویل و پرونده تشکیل شده است.' },
    { title: 'اخذ استعلامات', desc: 'استعلام ثبتی، شهرداری، دارایی و بیمه در جریان است.' },
    { title: 'آماده امضا', desc: 'استعلامات کامل شده و سند برای امضای طرفین آماده است.' },
    { title: 'ثبت و صدور', desc: 'سند در سامانه ثبت آنی ثبت و شماره سند صادر شده است.' },
    { title: 'تحویل', desc: 'نسخه‌های سند قابل تحویل به طرفین است.' },
  ];

  return (
    <>
      <Seo
        title="پیگیری وضعیت پرونده"
        description="پیگیری آنلاین وضعیت پرونده و سند در دفتر اسناد رسمی ۱۷۶۲ تهران با کد رهگیری."
        path="/tracking"
        keywords={['پیگیری پرونده', 'وضعیت سند', 'کد رهگیری دفترخانه']}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'پیگیری پرونده' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            پیگیری وضعیت پرونده
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            کد رهگیری‌ای که هنگام تشکیل پرونده دریافت کرده‌اید را وارد کنید تا وضعیت
            به‌روز پرونده برای شما ارسال شود.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 px-6 py-5">
                  <h2 className="text-xl font-bold text-white">استعلام وضعیت</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
                  <div>
                    <label htmlFor="tr-code" className="block font-bold text-slate-800 mb-2">
                      کد رهگیری یا شماره پرونده
                    </label>
                    <input
                      id="tr-code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={inputClass}
                      placeholder="مثلاً ۱۷۶۲-۴۵۸۹"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label htmlFor="tr-phone" className="block font-bold text-slate-800 mb-2">
                      شماره تماس ثبت‌شده در پرونده
                    </label>
                    <input
                      id="tr-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      placeholder="۰۹۱۲..."
                      dir="ltr"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      برای احراز هویت لازم است؛ اطلاعات پرونده فقط به شماره ثبت‌شده اعلام می‌شود.
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-xl transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5 me-2" />
                    استعلام وضعیت پرونده
                  </button>

                  <p className="text-sm text-slate-600 bg-slate-100 rounded-xl p-3 leading-relaxed">
                    استعلام شما مستقیماً به واتساپ دفتر ارسال می‌شود و پاسخ در ساعات کاری
                    اعلام می‌گردد. هیچ اطلاعاتی روی این وب‌سایت ذخیره نمی‌شود.
                  </p>
                </form>
              </div>

              {/* مراحل پرونده */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">مراحل یک پرونده</h2>
                <ol className="relative space-y-6 ps-8 border-s-2 border-slate-200">
                  {stages.map((s, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -start-[41px] w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                        {(i + 1).toLocaleString('fa-IR')}
                      </span>
                      <h3 className="font-bold text-slate-900">{s.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{s.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">کد رهگیری ندارید؟</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  با شماره تلفن دفتر تماس بگیرید و شماره ملی یا شماره سند را اعلام کنید.
                </p>
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 me-2" />
                  {primaryPhone.display}
                </a>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h2 className="font-bold text-amber-900 mb-2">استعلام رسمی سند</h2>
                <p className="text-sm text-amber-800 leading-relaxed">
                  برای استعلام رسمی اصالت سند، سامانه سازمان ثبت اسناد و املاک کشور مرجع
                  قانونی است. این صفحه صرفاً برای پیگیری پرونده‌های در جریان همین دفترخانه است.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
