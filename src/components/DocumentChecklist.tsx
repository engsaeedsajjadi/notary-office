import { useEffect, useMemo, useState } from 'react';
import { SERVICES } from '../data/services';
import { BUSINESS, primaryPhone } from '../data/business';

/**
 * چک‌لیست هوشمند مدارک.
 *
 * هدف تجاری: جلوگیری از مراجعه ناقص. هر مراجعه بی‌نتیجه هم وقت دفترخانه
 * را می‌گیرد و هم نارضایتی مشتری می‌سازد.
 *
 * وضعیت تیک‌ها در localStorage ذخیره می‌شود تا کاربر بتواند صفحه را
 * ببندد و بعداً ادامه دهد.
 */

const STORAGE_KEY = 'nc-1762-checklist';

interface Props {
  /** اگر مشخص شود، انتخابگر خدمت نمایش داده نمی‌شود */
  fixedServiceSlug?: string;
}

export default function DocumentChecklist({ fixedServiceSlug }: Props) {
  const [slug, setSlug] = useState(fixedServiceSlug ?? SERVICES[0].slug);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const service = useMemo(
    () => SERVICES.find((s) => s.slug === slug) ?? SERVICES[0],
    [slug],
  );

  // بازیابی وضعیت ذخیره‌شده
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}-${slug}`);
      setChecked(saved ? JSON.parse(saved) : {});
    } catch {
      setChecked({});
    }
  }, [slug]);

  const toggle = (doc: string) => {
    setChecked((prev) => {
      const next = { ...prev, [doc]: !prev[doc] };
      try {
        localStorage.setItem(`${STORAGE_KEY}-${slug}`, JSON.stringify(next));
      } catch {
        /* اگر حافظه در دسترس نبود، بی‌صدا رد شو */
      }
      return next;
    });
  };

  const doneCount = service.documents.filter((d) => checked[d]).length;
  const total = service.documents.length;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;
  const allDone = doneCount === total && total > 0;

  const handlePrint = () => window.print();

  const handleShare = () => {
    const lines = [
      `مدارک لازم — ${service.title}`,
      `${BUSINESS.name}`,
      '',
      ...service.documents.map((d, i) => `${i + 1}. ${checked[d] ? '✅' : '⬜'} ${d}`),
      '',
      `تلفن: ${primaryPhone.display}`,
      BUSINESS.domain,
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-0">
      <div className="bg-slate-900 px-6 py-5 print:bg-white print:text-black">
        <h3 className="text-xl font-bold text-white print:text-black">چک‌لیست مدارک لازم</h3>
        <p className="text-slate-400 text-sm mt-1 print:text-slate-700">
          پیش از مراجعه، مدارک را تیک بزنید تا چیزی جا نماند.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {!fixedServiceSlug && (
          <div className="print:hidden">
            <label htmlFor="checklist-service" className="block font-bold text-slate-800 mb-2">
              نوع خدمت
            </label>
            <select
              id="checklist-service"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            >
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* نوار پیشرفت */}
        <div className="print:hidden">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">
              {doneCount} از {total} مدرک آماده است
            </span>
            <span className={`font-bold ${allDone ? 'text-green-600' : 'text-amber-600'}`}>
              {progress.toLocaleString('fa-IR')}٪
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                allDone ? 'bg-green-500' : 'bg-amber-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {allDone && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 text-sm print:hidden">
            <strong>مدارک شما کامل است.</strong> می‌توانید برای هماهنگی زمان مراجعه تماس بگیرید.
          </div>
        )}

        <ul className="space-y-2">
          {service.documents.map((doc) => {
            const isChecked = !!checked[doc];
            return (
              <li key={doc}>
                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-green-50 border-green-300'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(doc)}
                    className="mt-1 w-5 h-5 accent-amber-500 flex-shrink-0"
                  />
                  <span
                    className={`leading-relaxed ${
                      isChecked ? 'text-green-900 line-through decoration-green-500/50' : 'text-slate-700'
                    }`}
                  >
                    {doc}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-3 rounded-xl transition-colors"
          >
            چاپ / ذخیره PDF
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-3 rounded-xl transition-colors"
          >
            ارسال در واتساپ
          </button>
        </div>

        <p className="text-sm text-slate-600 bg-slate-100 rounded-xl p-3 leading-relaxed">
          در همه موارد، ارائه <strong>اصل کارت ملی هوشمند</strong> الزامی است و کپی به‌تنهایی
          پذیرفته نمی‌شود. در صورت تردید درباره مدارک، پیش از مراجعه با شماره{' '}
          <a href={`tel:${primaryPhone.tel}`} className="text-amber-700 font-bold hover:underline">
            {primaryPhone.display}
          </a>{' '}
          تماس بگیرید.
        </p>
      </div>
    </div>
  );
}
