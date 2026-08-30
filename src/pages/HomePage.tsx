import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reviews from '../components/Reviews';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import FAQ, { faqs } from '../../components/FAQ';
import Contact from '../../components/Contact';
import { SERVICES } from '../data/services';
import { ARTICLES } from '../data/articles';
import { REVIEWS, reviewStats } from '../data/reviews';
import { BUSINESS } from '../data/business';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { DocumentTextIcon } from '../../components/icons/DocumentTextIcon';
import { ScaleIcon } from '../../components/icons/ScaleIcon';
import { CheckBadgeIcon } from '../../components/icons/CheckBadgeIcon';

/** ابزارهای کاربردی که کاربر را از «بازدیدکننده» به «مراجع» تبدیل می‌کنند */
const TOOLS = [
  {
    to: '/fees',
    Icon: ScaleIcon,
    title: 'استعلام هزینه سند',
    text: 'نوع سند را مشخص کنید و رقم دقیق را رایگان از کارشناس ما بپرسید.',
  },
  {
    to: '/checklist',
    Icon: CheckBadgeIcon,
    title: 'چک‌لیست مدارک',
    text: 'فهرست مدارک هر خدمت؛ تیک بزنید و پیش از مراجعه مطمئن شوید.',
  },
  {
    to: '/appointment',
    Icon: DocumentTextIcon,
    title: 'درخواست نوبت',
    text: 'زمان مراجعه را هماهنگ کنید تا پرونده پیش از حضور شما آماده شود.',
  },
];

export default function HomePage() {
  /**
   * داده ساختاریافته صفحه اصلی.
   *
   * نکته مهم درباره ستاره‌ها: aggregateRating باید روی همان موجودیتی بنشیند
   * که در index.html با @id تعریف شده (Notary/Organization). با تکرار همان
   * @id، گوگل این گره را با گره اصلی ادغام می‌کند و ستاره‌ها به کسب‌وکار
   * نسبت داده می‌شود — نه به یک WebSite که پشتیبانی نمی‌شود.
   */
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BUSINESS.domain}/#website`,
      name: BUSINESS.name,
      url: BUSINESS.domain,
      inLanguage: 'fa-IR',
      publisher: { '@id': `${BUSINESS.domain}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': ['Notary', 'LocalBusiness'],
      '@id': `${BUSINESS.domain}/#organization`,
      name: BUSINESS.name,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewStats.average,
        reviewCount: reviewStats.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: REVIEWS.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.isoDate,
        reviewBody: r.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="دفتر اسناد رسمی ۱۷۶۲ تهران | جردن"
        description="دفتر اسناد رسمی شماره ۱۷۶۲ تهران در جردن: تنظیم سند قطعی، وکالت‌نامه، صلح عمری، گواهی امضا و اسناد خودرو. محاسبه آنلاین هزینه و چک‌لیست مدارک."
        path="/"
        keywords={[
          'دفتر اسناد رسمی ۱۷۶۲',
          'دفترخانه جردن',
          'دفتر اسناد رسمی تهران',
          'محضر جردن',
        ]}
        schema={schema}
      />

      <Hero />
      <Features />

      {/* ابزارهای آنلاین */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-amber-600 font-bold tracking-wider text-sm uppercase mb-2 block">
              ابزارهای آنلاین
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              پیش از مراجعه، همه‌چیز را بدانید
            </h2>
            <p className="text-slate-500 leading-relaxed">
              هزینه را برآورد کنید، مدارک را آماده کنید و زمان مراجعه را هماهنگ کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOOLS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group bg-slate-50 rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:border-amber-300 transition-all hover:-translate-y-1"
              >
                <span className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <t.Icon className="w-7 h-7" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-4">{t.text}</p>
                <span className="text-amber-600 font-medium text-sm flex items-center">
                  شروع کنید
                  <ArrowLeftIcon className="w-4 h-4 ms-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* راهنمای خدمات */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-amber-600 font-bold tracking-wider text-sm uppercase mb-2 block">
              راهنمای تخصصی
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              صفحه اختصاصی هر خدمت
            </h2>
            <p className="text-slate-500 leading-relaxed">
              مدارک لازم، مراحل انجام و سوالات متداول هر خدمت را جداگانه
              بخوانید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-amber-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{s.shortTitle}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.summary}</p>
                  </div>
                  <ArrowLeftIcon className="w-5 h-5 text-slate-300 group-hover:text-amber-500 flex-shrink-0 mt-1 transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              مشاهده همه خدمات
              <ArrowLeftIcon className="w-4 h-4 ms-2" />
            </Link>
          </div>
        </div>
      </section>

      <Reviews />

      {/* مقالات */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-amber-600 font-bold tracking-wider text-sm uppercase mb-2 block">
                مرکز دانش
              </span>
              <h2 className="text-3xl font-bold text-slate-900">مقالات حقوقی</h2>
            </div>
            <Link
              to="/articles"
              className="text-amber-600 font-medium flex items-center hover:text-amber-700 transition-colors"
            >
              همه مقالات
              <ArrowLeftIcon className="w-4 h-4 ms-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to={`/articles/${a.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-300 transition-all hover:-translate-y-1"
              >
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  {a.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Contact />
    </>
  );
}
