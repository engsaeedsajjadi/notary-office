/**
 * تعرفه حق‌التحریر دفاتر اسناد رسمی
 *
 * ⚠️ هشدار مهم برای نگهدارنده سایت:
 * این اعداد بر اساس بخشنامه تعرفه حق‌التحریر مصوب قوه قضاییه است و
 * سالانه تغییر می‌کند. پس از هر بخشنامه جدید، مقادیر زیر و همچنین
 * TARIFF_YEAR و TARIFF_UPDATED را حتماً به‌روز کنید.
 *
 * خروجی ماشین‌حساب «تخمینی» است و مبنای قطعی محاسبه، سامانه ثبت آنی است.
 * تمام مبالغ به ریال هستند.
 */

export const TARIFF_YEAR = '۱۴۰۳';
export const TARIFF_UPDATED = 'مطابق آخرین بخشنامه ابلاغی';

/** هزینه صدور الکترونیکی سند (ثابت) */
export const ELECTRONIC_FEE = 50_000;

/** نرخ مالیات بر ارزش افزوده روی حق‌التحریر */
export const VAT_RATE = 0.09;

/**
 * پله‌های محاسبه تصاعدی حق‌التحریر.
 * هر پله: تا سقف `upTo` ریال، به ازای مازاد بر پله قبل، `perThousand` در هزار.
 * `base` مبلغ مقطوع پله اول است.
 */
export interface TariffBracket {
  upTo: number | null; // null یعنی بدون سقف
  perThousand: number;
}

export interface DocumentTariff {
  id: string;
  title: string;
  /** آیا مبلغ سند در محاسبه دخیل است؟ */
  valueBased: boolean;
  /** مبلغ مقطوع (برای اسناد غیرمالی) */
  fixed?: number;
  /** مبلغ مقطوع پله اول (برای اسناد مالی) */
  base?: number;
  baseUpTo?: number;
  brackets?: TariffBracket[];
  /** درصد حق‌الثبت نسبت به مبلغ سند */
  registrationRate?: number;
  note?: string;
}

export const DOCUMENT_TARIFFS: DocumentTariff[] = [
  {
    id: 'ghatee',
    title: 'سند قطعی غیرمنقول (آپارتمان، زمین، ملک)',
    valueBased: true,
    base: 4_725_000,
    baseUpTo: 2_000_000,
    brackets: [
      { upTo: 10_000_000, perThousand: 1.188 },
      { upTo: 50_000_000, perThousand: 0.756 },
      { upTo: 100_000_000, perThousand: 0.243 },
      { upTo: 200_000_000, perThousand: 0.18 },
      { upTo: 500_000_000, perThousand: 0.0675 },
      { upTo: 1_000_000_000, perThousand: 0.03375 },
      { upTo: null, perThousand: 0.0137 },
    ],
    registrationRate: 0.005,
    note: 'حق‌الثبت اسناد قطعی معمولاً نیم درصد مبلغ سند است.',
  },
  {
    id: 'rahni',
    title: 'سند رهنی، با حق استرداد و ذمه',
    valueBased: true,
    base: 2_875_000,
    baseUpTo: 10_000_000,
    brackets: [
      { upTo: 100_000_000, perThousand: 42.9 },
      { upTo: 200_000_000, perThousand: 32.5 },
      { upTo: null, perThousand: 18 },
    ],
    registrationRate: 0.005,
  },
  {
    id: 'ejare',
    title: 'اجاره‌نامه',
    valueBased: true,
    base: 1_112_000,
    baseUpTo: 2_000_000,
    brackets: [
      { upTo: 10_000_000, perThousand: 108.8 },
      { upTo: 200_000_000, perThousand: 18.9 },
      { upTo: null, perThousand: 10 },
    ],
    registrationRate: 0,
  },
  {
    id: 'vekalat-forush',
    title: 'وکالت فروش یا انتقال',
    valueBased: false,
    fixed: 1_500_000,
    note: 'پرداخت بالمناصفه بر عهده طرفین است، مگر توافق دیگری شده باشد.',
  },
  {
    id: 'vekalat-kari',
    title: 'وکالت کاری و اداری',
    valueBased: false,
    fixed: 1_000_000,
  },
  {
    id: 'govahi-emza',
    title: 'گواهی امضا',
    valueBased: false,
    fixed: 1_000_000,
    note: 'حضور شخص امضاکننده با اصل کارت ملی الزامی است.',
  },
  {
    id: 'fak-rahn',
    title: 'فک رهن یا فسخ سند',
    valueBased: false,
    fixed: 4_050_000,
  },
  {
    id: 'ejraiye',
    title: 'صدور اجراییه',
    valueBased: false,
    fixed: 5_400_000,
  },
  {
    id: 'eghrar',
    title: 'اقرارنامه، تعهدنامه و رضایت‌نامه',
    valueBased: false,
    fixed: 1_000_000,
  },
];

export interface FeeBreakdown {
  writingFee: number;
  registrationFee: number;
  vat: number;
  electronicFee: number;
  total: number;
}

/**
 * محاسبه تصاعدی حق‌التحریر بر اساس مبلغ سند.
 * روش: مبلغ مقطوع پله اول + جمع (مازاد هر پله × نرخ در هزار).
 */
export function calculateFee(tariff: DocumentTariff, documentValue: number): FeeBreakdown {
  let writingFee = 0;

  if (!tariff.valueBased) {
    writingFee = tariff.fixed ?? 0;
  } else {
    writingFee = tariff.base ?? 0;
    let previousCeiling = tariff.baseUpTo ?? 0;

    if (documentValue > previousCeiling && tariff.brackets) {
      for (const bracket of tariff.brackets) {
        const ceiling = bracket.upTo ?? Infinity;
        const taxableInBracket = Math.min(documentValue, ceiling) - previousCeiling;
        if (taxableInBracket <= 0) break;
        writingFee += (taxableInBracket / 1000) * bracket.perThousand;
        previousCeiling = ceiling;
        if (documentValue <= ceiling) break;
      }
    }
  }

  writingFee = Math.round(writingFee);
  const registrationFee = Math.round(documentValue * (tariff.registrationRate ?? 0));
  const vat = Math.round(writingFee * VAT_RATE);
  const total = writingFee + registrationFee + vat + ELECTRONIC_FEE;

  return { writingFee, registrationFee, vat, electronicFee: ELECTRONIC_FEE, total };
}

/** تبدیل عدد به رشته فارسی با جداکننده هزارگان */
export function formatRial(amount: number): string {
  return amount.toLocaleString('fa-IR');
}

/** تبدیل ریال به تومان برای نمایش کمکی */
export function toToman(rial: number): string {
  return Math.round(rial / 10).toLocaleString('fa-IR');
}
