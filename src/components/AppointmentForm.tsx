import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { BUSINESS } from '../data/business';

/**
 * فرم درخواست هماهنگی مراجعه.
 *
 * عمداً بدون بک‌اند طراحی شده: پیام ساختاریافته مستقیماً به واتساپ دفتر
 * ارسال می‌شود. مزایا: بدون هزینه سرور، بدون نگهداری، بدون ریسک نشت
 * اطلاعات شخصی مراجعین، و دفتر در همان بستری که استفاده می‌کند پیام می‌گیرد.
 *
 * ⚠️ این «نوبت‌دهی رسمی» نیست — صرفاً درخواست هماهنگی است.
 */

const TIME_SLOTS = [
  'شنبه تا چهارشنبه — صبح (۷:۳۰ تا ۱۱)',
  'شنبه تا چهارشنبه — ظهر (۱۱ تا ۱۵:۳۰)',
  'پنج‌شنبه — صبح (۷:۳۰ تا ۱۲)',
  'در اولین زمان ممکن',
];

export default function AppointmentForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceSlug, setServiceSlug] = useState(SERVICES[0].slug);
  const [people, setPeople] = useState('۲');
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);

  const service = SERVICES.find((s) => s.slug === serviceSlug)!;
  const isValid = name.trim().length >= 3 && phone.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    const lines = [
      `درخواست هماهنگی مراجعه — ${BUSINESS.shortName}`,
      '',
      `نام: ${name.trim()}`,
      `تلفن تماس: ${phone.trim()}`,
      `نوع خدمت: ${service.title}`,
      `تعداد مراجعین: ${people}`,
      `زمان پیشنهادی: ${slot}`,
    ];
    if (note.trim()) lines.push(`توضیحات: ${note.trim()}`);
    lines.push('', 'ارسال‌شده از وب‌سایت دفترخانه');

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`${BUSINESS.whatsapp.link}?text=${text}`, '_blank', 'noopener');
  };

  const inputClass =
    'w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-5">
        <h3 className="text-xl font-bold text-white">درخواست هماهنگی مراجعه</h3>
        <p className="text-slate-400 text-sm mt-1">
          فرم را پر کنید تا پیش از مراجعه، پرونده شما آماده شود.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="ap-name" className="block font-bold text-slate-800 mb-2">
              نام و نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <input
              id="ap-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="نام کامل"
              required
            />
            {touched && name.trim().length < 3 && (
              <p className="text-red-600 text-sm mt-1">نام را کامل وارد کنید.</p>
            )}
          </div>

          <div>
            <label htmlFor="ap-phone" className="block font-bold text-slate-800 mb-2">
              شماره تماس <span className="text-red-500">*</span>
            </label>
            <input
              id="ap-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="۰۹۱۲..."
              required
            />
            {touched && phone.trim().length < 10 && (
              <p className="text-red-600 text-sm mt-1">شماره تماس معتبر وارد کنید.</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="ap-service" className="block font-bold text-slate-800 mb-2">
            نوع خدمت
          </label>
          <select
            id="ap-service"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className={inputClass}
          >
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="ap-people" className="block font-bold text-slate-800 mb-2">
              تعداد مراجعین
            </label>
            <select
              id="ap-people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={inputClass}
            >
              {['۱', '۲', '۳', '۴', 'بیش از ۴'].map((n) => (
                <option key={n} value={n}>
                  {n} نفر
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ap-slot" className="block font-bold text-slate-800 mb-2">
              زمان پیشنهادی
            </label>
            <select
              id="ap-slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className={inputClass}
            >
              {TIME_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ap-note" className="block font-bold text-slate-800 mb-2">
            توضیحات (اختیاری)
          </label>
          <textarea
            id="ap-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="هر نکته‌ای که به آماده‌سازی پرونده کمک می‌کند"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl transition-colors"
        >
          ارسال درخواست از طریق واتساپ
        </button>

        <p className="text-sm text-slate-600 bg-slate-100 rounded-xl p-3 leading-relaxed">
          با زدن دکمه بالا، پیام آماده‌شده در واتساپ باز می‌شود و شما آن را ارسال می‌کنید.
          هیچ اطلاعاتی در این سایت ذخیره نمی‌شود.
          <br />
          <strong className="text-slate-800">توجه:</strong> این فرم درخواست هماهنگی است و
          به‌منزله ثبت نوبت قطعی نیست. همکاران ما برای تأیید زمان با شما تماس می‌گیرند.
        </p>
      </form>
    </div>
  );
}
