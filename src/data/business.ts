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

  // شماره پیام‌رسان‌ها — یک شماره واحد روی همه پیام‌رسان‌ها فعال است
  messengerPhone: { display: '۰۹۲۱۱۷۶۲۱۸۶', intl: '989211762186', local: '09211762186' },

  whatsapp: { display: '۰۹۲۱۱۷۶۲۱۸۶', link: 'https://wa.me/989211762186' },
  telegram: { display: '@No1762notarypublic', link: 'https://t.me/No1762notarypublic' },
  eitaa: { display: '@No1762notarypublic', link: 'https://eitaa.com/No1762notarypublic' },
  rubika: { display: '۰۹۲۱۱۷۶۲۱۸۶', link: 'https://rubika.ir/09211762186' },
  bale: { display: '۰۹۲۱۱۷۶۲۱۸۶', link: 'https://ble.ir/09211762186' },
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
/**
 * لینک‌های مسیریابی.
 *
 * ⚠️ نکته مهم: برای گوگل مپ، نشان و بلد از **لینک مکان ثبت‌شده** استفاده
 * می‌شود، نه از جستجوی مختصات. تفاوت زیاد است:
 *
 *   جستجوی مختصات  → کاربر روی یک نقطه خالی می‌افتد، بدون نام و اطلاعات دفتر.
 *   لینک مکان ثبت‌شده → صفحه خود دفترخانه با نام، تلفن، ساعت کاری و امتیاز.
 *
 * پس این لینک‌ها را با مختصات جایگزین نکنید. اگر مکان در سرویس جدیدی ثبت
 * شد، لینک اشتراک‌گذاری همان سرویس را اینجا اضافه کنید.
 *
 * ویز مکان ثبت‌شده ندارد، بنابراین همچنان بر پایه مختصات کار می‌کند.
 */
export const navigationLinks = {
  google: 'https://maps.app.goo.gl/Xj2Cf8hQFPXwiarr7',
  neshan: 'https://nshn.ir/80rbv7JSexi4Ht',
  balad: 'https://balad.ir/p/1TjTcqhuAoBurF',
  waze: `https://www.waze.com/ul?ll=${BUSINESS.geo.lat}%2C${BUSINESS.geo.lng}&navigate=yes&zoom=17`,

  // نقشه تعبیه‌شده: با جستجوی نام کسب‌وکار، پین همراه با نام دفتر نمایش
  // داده می‌شود — برخلاف جستجوی مختصات که فقط یک نقطه بی‌نام است.
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(
    'دفتر اسناد رسمی ۱۷۶۲ تهران',
  )}&ll=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=17&hl=fa&output=embed`,
};
