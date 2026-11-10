import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { ARTICLES } from '../data/articles';
import { BUSINESS } from '../data/business';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export default function ArticlesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'مرکز دانش حقوقی دفترخانه ۱۷۶۲',
    url: `${BUSINESS.domain}/articles`,
    blogPost: ARTICLES.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.isoDate,
      url: `${BUSINESS.domain}/articles/${a.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title="مقالات و راهنمای حقوقی"
        description="مقالات آموزشی درباره اسناد رسمی: تفاوت سند رسمی و عادی، خطرات خرید با وکالت، مراحل فک رهن، استعلام ثبتی و راهنمای مدارک."
        path="/articles"
        keywords={['مقالات حقوقی', 'آموزش اسناد رسمی', 'راهنمای دفترخانه']}
        schema={schema}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'مقالات' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            مرکز دانش حقوقی
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            آنچه پیش از هر معامله و تنظیم سند باید بدانید — به زبان ساده و کاربردی.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                to={`/articles/${a.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-300 transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4 text-xs">
                  <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-slate-400">
                    {a.readingMinutes.toLocaleString('fa-IR')} دقیقه مطالعه
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{a.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{a.excerpt}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{a.date}</span>
                  <span className="text-amber-600 font-medium flex items-center">
                    ادامه
                    <ArrowLeftIcon className="w-4 h-4 ms-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
