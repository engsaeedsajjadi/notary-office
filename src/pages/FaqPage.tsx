import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES } from '../data/services';
import { BUSINESS } from '../data/business';

/** همه سوالات متداول همه خدمات، یکجا */
const ALL_FAQS = SERVICES.flatMap((s) =>
  s.faqs.map((f) => ({ ...f, service: s.shortTitle, slug: s.slug })),
);

export default function FaqPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <Seo
        title="سوالات متداول"
        description="پاسخ به پرتکرارترین سوالات درباره تنظیم سند رسمی، وکالت‌نامه، هزینه‌ها، مدارک لازم و مراحل کار در دفتر اسناد رسمی ۱۷۶۲ تهران."
        path="/faq"
        keywords={['سوالات متداول دفترخانه', 'پرسش و پاسخ اسناد رسمی']}
        schema={schema}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'سوالات متداول' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">سوالات متداول</h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            {ALL_FAQS.length.toLocaleString('fa-IR')} پرسش پرتکرار مراجعین، دسته‌بندی‌شده بر
            اساس نوع خدمت.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-4">
            {ALL_FAQS.map((f, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 transition-colors list-none gap-3">
                  <span>{f.question}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                  <p className="text-slate-600 leading-relaxed mb-3">{f.answer}</p>
                  <Link
                    to={`/services/${f.slug}`}
                    className="text-sm text-amber-600 font-medium hover:underline"
                  >
                    اطلاعات بیشتر درباره {f.service}
                  </Link>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 bg-slate-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">پاسخ سوال خود را پیدا نکردید؟</h2>
            <p className="text-slate-300 text-sm mb-5">
              مشاوره تلفنی این دفترخانه رایگان است.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BUSINESS.phones[0].tel}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                {BUSINESS.phones[0].display}
              </a>
              <a
                href={BUSINESS.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                پرسش در واتساپ
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
