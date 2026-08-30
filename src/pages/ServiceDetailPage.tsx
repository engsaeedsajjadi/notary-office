import { Link, useParams, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import DocumentChecklist from '../components/DocumentChecklist';
import { getServiceBySlug, SERVICES } from '../data/services';
import { DOCUMENT_TARIFFS } from '../data/tariffs';
import { BUSINESS, primaryPhone } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <Navigate to="/services" replace />;

  const tariff = service.tariffId
    ? DOCUMENT_TARIFFS.find((t) => t.id === service.tariffId)
    : undefined;

  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug,
  ).slice(0, 3);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.summary,
      serviceType: service.category,
      provider: { '@id': `${BUSINESS.domain}/#organization` },
      areaServed: { '@type': 'City', name: 'تهران' },
      url: `${BUSINESS.domain}/services/${service.slug}`,
    },
    ...(service.faqs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]
      : []),
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `مراحل ${service.title}`,
      step: service.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.description,
      })),
    },
  ];

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        path={`/services/${service.slug}`}
        keywords={service.keywords}
        schema={schema}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            items={[{ label: 'خدمات', to: '/services' }, { label: service.shortTitle }]}
          />
          <span className="inline-block text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mt-6 mb-4">
            {service.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">{service.summary}</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ستون اصلی */}
            <div className="lg:col-span-2 space-y-8">
              <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-5">توضیحات</h2>
                <div className="space-y-4 text-slate-700 leading-loose text-justify">
                  {service.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>

              {/* مراحل */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">مراحل انجام کار</h2>
                <ol className="space-y-5">
                  {service.steps.map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center">
                        {(i + 1).toLocaleString('fa-IR')}
                      </span>
                      <div className="pt-1">
                        <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* سوالات متداول */}
              {service.faqs.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">سوالات متداول</h2>
                  <div className="space-y-4">
                    {service.faqs.map((f, i) => (
                      <details
                        key={i}
                        className="group border border-slate-200 rounded-xl overflow-hidden"
                        open={i === 0}
                      >
                        <summary className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                          {f.question}
                          <svg
                            className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ms-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </summary>
                        <div className="p-4 text-slate-600 leading-relaxed border-t border-slate-100">
                          {f.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ستون کناری */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              <DocumentChecklist fixedServiceSlug={service.slug} />

              {tariff && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-2">هزینه این خدمت</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    برای برآورد تخمینی هزینه بر اساس تعرفه مصوب، از ماشین‌حساب استفاده کنید.
                  </p>
                  <Link
                    to="/fees"
                    className="flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-3 rounded-xl transition-colors"
                  >
                    محاسبه هزینه
                    <ArrowLeftIcon className="w-4 h-4 ms-2" />
                  </Link>
                </div>
              )}

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">مشاوره رایگان</h3>
                <p className="text-sm text-amber-50 leading-relaxed mb-4">
                  پیش از اقدام، با کارشناسان ما مشورت کنید.
                </p>
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="flex items-center justify-center w-full bg-white text-amber-700 font-bold px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 me-2" />
                  {primaryPhone.display}
                </a>
                <Link
                  to="/appointment"
                  className="flex items-center justify-center w-full mt-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium px-4 py-3 rounded-xl transition-colors"
                >
                  درخواست نوبت
                </Link>
              </div>
            </aside>
          </div>

          {/* خدمات مرتبط */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">خدمات مرتبط</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/services/${r.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-amber-300 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{r.shortTitle}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
