/**
 * منبع واحد اطلاعات دفترخانه (Single Source of Truth)
 *
 * هر اطلاعاتی درباره دفتر — تلفن، آدرس، ساعت کاری، مختصات — فقط و فقط
 * در همین فایل تعریف می‌شود. هیچ‌جای دیگری این مقادیر را دستی ننویسید.
 *
 * دلیل: در نسخه‌های قبلی سایت، شماره تلفن در سه جای مختلف سه مقدار متفاوت
 * داشت و ساعت کاری در Schema با متن سایت نمی‌خواند. این ناسازگاری
 * مستقیماً به سئوی محلی (Local SEO) آسیب می‌زند.
 */

export const BUSINESS = {
  name: 'دفتر اسناد رسمی شماره ۱۷۶۲ تهران',
  shortName: 'دفترخانه ۱۷۶۲',
  officeNumber: '۱۷۶۲',
  domain: 'https://www.1762daftarasnad.ir',

  phones: [
    { display: '۰۲۱-۲۶۲۱۲۵۰۶', tel: '02126212506', primary: true },
    { display: '۰۲۱-۲۶۲۱۲۵۰۵', tel: '02126212505', primary: false },
  ],

  whatsapp: { display: '۰۹۲۱۱۷۶۲۱۸۶', link: 'https://wa.me/989211762186' },
  telegram: { display: '@No1762notarypublic', link: 'https://t.me/No1762notarypublic' },
  eitaa: { display: '@No1762notarypublic', link: 'https://eitaa.com/No1762notarypublic' },
  email: 'no1762notarypublic@gmail.com',

  address: {
    full: 'تهران، جردن، پلاک ۲۱۶، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۳',
    street: 'خیابان جردن (نلسون ماندلا)، پلاک ۲۱۶، ساختمان مرکز تجارت ایران، طبقه ۴، واحد ۳',
    city: 'تهران',
    region: 'تهران',
    country: 'IR',
  },

  // مختصات دفترخانه — با تغییر این دو مقدار، نقشه و همه لینک‌های
  // مسیریابی (گوگل مپ، نشان، بلد، ویز) همزمان به‌روز می‌شوند.
  geo: { lat: 35.7796915, lng: 51.4224039 },

  hours: {
    weekdays: { label: 'شنبه تا چهارشنبه', open: '۷:۳۰', close: '۱۵:۳۰', open24: '07:30', close24: '15:30' },
    thursday: { label: 'پنج‌شنبه', open: '۷:۳۰', close: '۱۲:۰۰', open24: '07:30', close24: '12:00' },
    closed: 'جمعه‌ها و تعطیلات رسمی: تعطیل',
  },

  snappKeyword: 'دفتر اسناد رسمی ۱۷۶۲',
} as const;

export const primaryPhone = BUSINESS.phones.find((p) => p.primary)!;

/** لینک‌های مسیریابی، ساخته‌شده از مختصات مرکزی */
export const navigationLinks = {
  google: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.lat}%2C${BUSINESS.geo.lng}`,
  neshan: `https://neshan.org/maps/@${BUSINESS.geo.lat},${BUSINESS.geo.lng},17z,0p`,
  balad: `https://balad.ir/location?latitude=${BUSINESS.geo.lat}&longitude=${BUSINESS.geo.lng}&zoom=17`,
  waze: `https://www.waze.com/ul?ll=${BUSINESS.geo.lat}%2C${BUSINESS.geo.lng}&navigate=yes&zoom=17`,
  embed: `https://maps.google.com/maps?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=17&hl=fa&output=embed`,
};
