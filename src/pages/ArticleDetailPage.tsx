import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { ARTICLES, getArticleBySlug } from '../data/articles';
import { getServiceBySlug } from '../data/services';
import { BUSINESS, primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/articles" replace />;

  const relatedService = article.relatedService
    ? getServiceBySlug(article.relatedService)
    : undefined;
  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    inLanguage: 'fa-IR',
    author: { '@type': 'Organization', name: BUSINESS.name },
    publisher: { '@id': `${BUSINESS.domain}/#organization` },
    mainEntityOfPage: `${BUSINESS.domain}/articles/${article.slug}`,
  };

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/articles/${article.slug}`}
        keywords={article.keywords}
        schema={schema}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            items={[{ label: 'مقالات', to: '/articles' }, { label: article.category }]}
          />
          <div className="flex items-center gap-3 mt-6 mb-4 text-sm">
            <span className="font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-slate-400">{article.date}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">
              {article.readingMinutes.toLocaleString('fa-IR')} دقیقه
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight max-w-4xl">
            {article.title}
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">{article.excerpt}</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 md:p-10">
              {article.sections.map((sec, i) => (
                <section key={i} className={i > 0 ? 'mt-10' : ''}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-amber-500 inline-block">
                    {sec.heading}
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-loose text-justify mt-4">
                    {sec.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {sec.list && (
                    <ul className="mt-5 space-y-3">
                      {sec.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-2.5" />
                          <span className="text-slate-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="mt-10 pt-8 border-t border-slate-200 bg-slate-50 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-6 md:p-10 rounded-b-2xl">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">سلب مسئولیت:</strong> این مطلب صرفاً
                  جنبه اطلاع‌رسانی حقوقی دارد و جایگزین مشاوره تخصصی برای پرونده شما نیست.
                  برای بررسی شرایط اختصاصی خود با دفترخانه تماس بگیرید.
                </p>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28">
              {relatedService && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="font-bold text-slate-900 mb-2">خدمت مرتبط</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {relatedService.summary}
                  </p>
                  <Link
                    to={`/services/${relatedService.slug}`}
                    className="block text-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-3 rounded-xl transition-colors"
                  >
                    {relatedService.shortTitle}
                  </Link>
                </div>
              )}

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-lg mb-2">سوالی دارید؟</h2>
                <p className="text-sm text-amber-50 leading-relaxed mb-4">
                  مشاوره تلفنی رایگان است.
                </p>
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="flex items-center justify-center w-full bg-white text-amber-700 font-bold px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 me-2" />
                  {primaryPhone.display}
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-4">مطالب دیگر</h2>
                <ul className="space-y-4">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/articles/${o.slug}`}
                        className="text-sm text-slate-700 hover:text-amber-600 transition-colors leading-relaxed block"
                      >
                        {o.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
