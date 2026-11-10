import React, { useState } from 'react';
import { DOCUMENT_TARIFFS } from '../data/tariffs';
import { BUSINESS, primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';

/**
 * استعلام هزینه سند.
 *
 * ⚠️ چرا اینجا ماشین‌حساب نیست:
 * مبلغ قطعی را سامانه ثبت آنی با فرمول خودش محاسبه می‌کند — بر پایه ارزش
 * منطقه‌ای، نوع ملک، تعداد متعهدین، تعداد صفحات و شرایط اختصاصی هر پرونده.
 * هیچ ماشین‌حساب بیرونی نمی‌تواند این عدد را بازتولید کند و رقم نادرست
 * بدتر از نبودِ رقم است: مراجع با انتظار غلط می‌آید و اعتماد از بین می‌رود.
 *
 * بنابراین به‌جای عدد تخمینی، این فرم یک استعلام ساختاریافته می‌سازد و
 * کاربر را به کارشناس دفتر وصل می‌کند — که هم دقیق است و هم یک تماس
 * واقعی ایجاد می‌کند.
 */

/** تبدیل ارقام فارسی/عربی به لاتین تا ورودی کاربر همیشه درست خوانده شود */
function normalizeDigits(input: string): string {
  const fa = '۰۱۲۳۴۵۶۷۸۹';
  const ar = '٠١٢٣٤٥٦٧٨٩';
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d);
    return String(i !== -1 ? i : ar.indexOf(d));
  });
}

export default function FeeInquiry() {
  const [tariffId, setTariffId] = useState(DOCUMENT_TARIFFS[0].id);
  const [rawValue, setRawValue] = useState('');

  const tariff = DOCUMENT_TARIFFS.find((t) => t.id === tariffId)!;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = normalizeDigits(e.target.value).replace(/[^\d]/g, '');
    setRawValue(digits ? parseInt(digits, 10).toLocaleString('fa-IR') : '');
  };

  const buildMessage = () => {
    const lines = [
      `استعلام هزینه — ${BUSINESS.shortName}`,
      '',
      `نوع سند: ${tariff.title}`,
    ];
    if (tariff.valueBased && rawValue) {
      lines.push(`مبلغ سند: ${rawValue} تومان`);
    }
    lines.push('', 'لطفاً هزینه تقریبی این سند را اعلام فرمایید.');
    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsApp = () => {
    window.open(`${BUSINESS.whatsapp.link}?text=${buildMessage()}`, '_blank', 'noopener');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-5">
        <h2 className="text-xl font-bold text-white">استعلام هزینه سند</h2>
        <p className="text-slate-400 text-sm mt-1">
          نوع سند را مشخص کنید تا کارشناس ما رقم دقیق را اعلام کند.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* هشدار صادقانه — به‌جای عدد ساختگی */}
        <div className="bg-amber-50 border-s-4 border-amber-500 rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
          <strong className="block mb-1 text-slate-900">چرا رقم آنلاین اعلام نمی‌کنیم؟</strong>
          هزینه قطعی سند را <strong>سامانه ثبت آنی</strong> محاسبه می‌کند؛ این محاسبه به
          ارزش منطقه‌ای ملک، نوع سند، تعداد متعهدین و صفحات و شرایط اختصاصی پرونده بستگی
          دارد. هر رقمی که یک ماشین‌حساب اینترنتی نشان دهد تخمینی و احتمالاً نادرست است.
          ترجیح می‌دهیم به‌جای عدد گمراه‌کننده، رقم واقعی را در یک تماس کوتاه به شما بگوییم.
        </div>

        {/* نوع سند */}
        <div>
          <label htmlFor="tariff-select" className="block font-bold text-slate-800 mb-2">
            نوع سند
          </label>
          <select
            id="tariff-select"
            value={tariffId}
            onChange={(e) => setTariffId(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          >
            {DOCUMENT_TARIFFS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        {/* مبلغ سند — فقط برای اسناد مالی */}
        {tariff.valueBased && (
          <div>
            <label htmlFor="amount-input" className="block font-bold text-slate-800 mb-2">
              مبلغ سند (تومان){' '}
              <span className="font-normal text-slate-500 text-sm">— اختیاری</span>
            </label>
            <input
              id="amount-input"
              type="text"
              inputMode="numeric"
              value={rawValue}
              onChange={handleAmountChange}
              placeholder="مثلاً ۵٬۰۰۰٬۰۰۰٬۰۰۰"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
            <p className="text-sm text-slate-500 mt-2">
              با اعلام مبلغ، کارشناس می‌تواند رقم دقیق‌تری به شما بگوید.
            </p>
          </div>
        )}

        {tariff.note && (
          <p className="text-sm text-slate-600 bg-slate-100 rounded-xl p-3 leading-relaxed">
            {tariff.note}
          </p>
        )}

        {/* راه‌های استعلام */}
        <div className="border-t border-slate-200 pt-6 space-y-3">
          <a
            href={`tel:${primaryPhone.tel}`}
            className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-4 rounded-xl transition-colors"
          >
            <PhoneIcon className="w-5 h-5 me-2" />
            استعلام تلفنی: {primaryPhone.display}
          </a>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-xl transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 me-2" />
            استعلام در واتساپ
          </button>

          <p className="text-sm text-slate-600 bg-slate-100 rounded-xl p-3 leading-relaxed">
            مشاوره و استعلام هزینه <strong>رایگان</strong> است. هزینه‌ها دقیقاً مطابق تعرفه
            مصوب سازمان ثبت اسناد و املاک کشور دریافت می‌شود و در همه دفاتر اسناد رسمی
            یکسان است — هیچ مبلغی خارج از تعرفه گرفته نمی‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}
