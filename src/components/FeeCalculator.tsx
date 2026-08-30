import React, { useMemo, useState } from 'react';
import {
  DOCUMENT_TARIFFS,
  calculateFee,
  formatRial,
  toToman,
  TARIFF_YEAR,
  TARIFF_UPDATED,
} from '../data/tariffs';
import { primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';

/** تبدیل ارقام فارسی/عربی به لاتین تا ورودی کاربر همیشه درست خوانده شود */
function normalizeDigits(input: string): string {
  const fa = '۰۱۲۳۴۵۶۷۸۹';
  const ar = '٠١٢٣٤٥٦٧٨٩';
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d);
    return String(i !== -1 ? i : ar.indexOf(d));
  });
}

const AMOUNT_SHORTCUTS = [
  { label: '۱ میلیارد', value: 10_000_000_000 },
  { label: '۵ میلیارد', value: 50_000_000_000 },
  { label: '۱۰ میلیارد', value: 100_000_000_000 },
  { label: '۲۰ میلیارد', value: 200_000_000_000 },
];

export default function FeeCalculator() {
  const [tariffId, setTariffId] = useState(DOCUMENT_TARIFFS[0].id);
  const [rawValue, setRawValue] = useState('');

  const tariff = DOCUMENT_TARIFFS.find((t) => t.id === tariffId)!;

  // کاربر مبلغ را به تومان وارد می‌کند (رایج‌تر است)، داخلی به ریال تبدیل می‌شود
  const tomanValue = useMemo(() => {
    const digits = normalizeDigits(rawValue).replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : 0;
  }, [rawValue]);

  const rialValue = tomanValue * 10;
  const result = useMemo(() => calculateFee(tariff, rialValue), [tariff, rialValue]);
  const showResult = !tariff.valueBased || rialValue > 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = normalizeDigits(e.target.value).replace(/[^\d]/g, '');
    setRawValue(digits ? parseInt(digits, 10).toLocaleString('fa-IR') : '');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-5">
        <h3 className="text-xl font-bold text-white">محاسبه تخمینی هزینه سند</h3>
        <p className="text-slate-400 text-sm mt-1">
          بر اساس تعرفه مصوب سال {TARIFF_YEAR} — {TARIFF_UPDATED}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* انتخاب نوع سند */}
        <div>
          <label htmlFor="tariff-select" className="block font-bold text-slate-800 mb-2">
            نوع سند را انتخاب کنید
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
              مبلغ سند (تومان)
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
            <div className="flex flex-wrap gap-2 mt-3">
              {AMOUNT_SHORTCUTS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setRawValue((s.value / 10).toLocaleString('fa-IR'))}
                  className="text-xs bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {s.label} تومان
                </button>
              ))}
            </div>
          </div>
        )}

        {tariff.note && (
          <p className="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
            {tariff.note}
          </p>
        )}

        {/* نتیجه */}
        {showResult && (
          <div className="border-t border-slate-200 pt-6">
            <div className="space-y-3">
              <Row label="حق‌التحریر" value={result.writingFee} />
              {result.registrationFee > 0 && (
                <Row label="حق‌الثبت" value={result.registrationFee} />
              )}
              <Row label="مالیات بر ارزش افزوده (۹٪)" value={result.vat} />
              <Row label="هزینه صدور الکترونیکی" value={result.electronicFee} />

              <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-slate-900">
                <span className="font-bold text-lg text-slate-900">جمع کل تخمینی</span>
                <div className="text-end">
                  <div className="font-bold text-2xl text-amber-600">
                    {formatRial(result.total)}
                    <span className="text-sm font-normal text-slate-500 ms-1">ریال</span>
                  </div>
                  <div className="text-sm text-slate-500">معادل {toToman(result.total)} تومان</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* سلب مسئولیت — بسیار مهم */}
        <div className="bg-slate-100 border-s-4 border-amber-500 rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
          <strong className="block mb-1 text-slate-900">توجه مهم</strong>
          این محاسبه صرفاً <strong>تخمینی</strong> است و جنبه اطلاع‌رسانی دارد. مبلغ قطعی
          توسط سامانه ثبت آنی و بر اساس ارزش منطقه‌ای، نوع ملک و شرایط اختصاصی هر پرونده
          محاسبه می‌شود. برخی هزینه‌ها مانند بهای اوراق، پست و استعلامات در این محاسبه
          لحاظ نشده است.
          <br />
          <span className="block mt-2">
            پرداخت حق‌التحریر معمولاً بالمناصفه بر عهده طرفین است، مگر توافق دیگری شده باشد.
          </span>
        </div>

        <a
          href={`tel:${primaryPhone.tel}`}
          className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all"
        >
          <PhoneIcon className="w-5 h-5 me-2" />
          استعلام مبلغ دقیق: {primaryPhone.display}
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-slate-700">
      <span>{label}</span>
      <span className="font-medium tabular-nums">{formatRial(value)} ریال</span>
    </div>
  );
}
