// Single source of truth for the office's public details.
// The page components and the JSON-LD in index.html (built in vite.config.ts)
// both read from here. Phone and hours for Google are set separately under
// `google` below.

export const site = {
  name: 'دفتر اسناد رسمی شماره ۱۷۶۲ تهران',
  shortName: 'دفترخانه ۱۷۶۲',
  url: 'https://www.1762daftarasnad.ir',
  domainLabel: 'www.1762daftarasnad.ir',
  description:
    'دفتر اسناد رسمی شماره ۱۷۶۲ تهران ارائه‌دهنده خدمات تنظیم اسناد رسمی، وکالت‌نامه، اجاره‌نامه، رهن و فک رهن.',

  phones: [
    { label: '۰۲۱-۲۶۲۱۲۵۰۶', tel: '+982126212506' },
    { label: '۰۲۱-۲۶۲۱۲۵۰۵', tel: '+982126212505' },
  ],
  email: 'no1762notarypublic@gmail.com',

  address: {
    full: 'تهران، جردن، پلاک ۲۱۶، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۳',
    street: 'خیابان جردن (نلسون ماندلا)، پلاک ۲۱۶، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۳',
    city: 'تهران',
    latitude: 35.7796915,
    longitude: 51.4224039,
  },

  hours: [
    { label: 'شنبه تا چهارشنبه', display: '۷:۳۰ الی ۱۵:۳۰', days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'], opens: '07:30', closes: '15:30' },
    { label: 'پنج‌شنبه‌ها', display: '۷:۳۰ الی ۱۲:۰۰', days: ['Thursday'], opens: '07:30', closes: '12:00' },
  ],
  closedLabel: 'جمعه‌ها و تعطیلات رسمی: تعطیل',

  // Values published to Google (schema.org JSON-LD). Kept as the owner set
  // them; they intentionally differ from the phone/hours shown on the page.
  google: {
    telephone: '+989050890758',
    hours: [
      { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'], opens: '08:00', closes: '16:00' },
    ],
  },

  messengers: {
    eitaa: { handle: '@No1762notarypublic', href: 'https://eitaa.com/No1762notarypublic' },
    telegram: { handle: '@No1762notarypublic', href: 'https://t.me/No1762notarypublic' },
    whatsapp: { handle: '09211762186', href: 'https://wa.me/989211762186' },
  },

  maps: {
    google: 'https://maps.app.goo.gl/9qW1wY8XzZt6nLq8A',
    neshan: 'https://nshn.ir/807bv7JSexi4Ht',
    balad: 'https://balad.ir/p/1TjTcqhuAoBurF',
    waze: 'https://waze.com/ul/htnked1kx5',
  },
} as const;

export const faqs = [
  {
    question: 'مدارک لازم برای تنظیم وکالت‌نامه چیست؟',
    answer:
      'اصل کارت ملی و شناسنامه موکل (شخصی که وکالت می‌دهد) و کپی مدارک وکیل. در صورتی که موضوع وکالت ملک یا خودرو باشد، اسناد مالکیت نیز مورد نیاز است.',
  },
  {
    question: 'آیا برای گواهی امضا حضور خود شخص الزامی است؟',
    answer:
      'بله، طبق قانون برای گواهی امضا، حضور شخص امضا کننده به همراه اصل کارت ملی در محل دفترخانه الزامی است.',
  },
  {
    question: 'هزینه تنظیم اسناد چقدر است؟',
    answer:
      'هزینه‌های دفترخانه دقیقا مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور محاسبه می‌شود و هیچگونه هزینه اضافی دریافت نمی‌گردد. تمامی پرداخت‌ها از طریق دستگاه کارتخوان متصل به سامانه ثبت انجام می‌شود.',
  },
  {
    question: 'ساعات کاری دفترخانه چگونه است؟',
    answer:
      'شنبه تا چهارشنبه از ۷:۳۰ الی ۱۵:۳۰ و پنج‌شنبه‌ها از ۷:۳۰ الی ۱۲:۰۰. جهت رفاه حال مراجعین، امکان هماهنگی برای ساعات خارج از وقت اداری در موارد خاص وجود دارد.',
  },
] as const;

/** JSON-LD blocks injected into index.html at build time. */
export function structuredData(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Notary',
      name: site.name,
      alternateName: site.shortName,
      url: `${site.url}/`,
      logo: `${site.url}/android-chrome-512x512.png`,
      image: `${site.url}/og-image.jpg`,
      description: site.description,
      telephone: site.google.telephone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IR',
        addressRegion: site.address.city,
        addressLocality: site.address.city,
        streetAddress: site.address.street,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.address.latitude,
        longitude: site.address.longitude,
      },
      hasMap: site.maps.google,
      openingHoursSpecification: site.google.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      sameAs: [site.messengers.telegram.href, site.messengers.eitaa.href],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];
}
