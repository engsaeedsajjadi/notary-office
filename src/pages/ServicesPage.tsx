import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import { BUSINESS } from '../data/business';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export default function ServicesPage() {
  const [category, setCategory] = useState<string>('همه');

  const filtered =
    category === 'همه' ? SERVICES : SERVICES.filter((s) => s.category === category);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'خدمات دفتر اسناد رسمی ۱۷۶۲ تهران',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${BUSINESS.domain}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title="خدمات دفترخانه"
        description="فهرست کامل خدمات دفتر اسناد رسمی ۱۷۶۲ تهران: سند قطعی، وکالت‌نامه، صلح عمری، گواهی امضا، اجاره‌نامه، اسناد خودرو و صدور اجراییه."
        path="/services"
        keywords={['خدمات دفترخانه', 'دفتر اسناد رسمی تهران', 'تنظیم سند رسمی']}
        schema={schema}
      />

      <section className="pt-28 pb-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'خدمات' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            خدمات دفتر اسناد رسمی ۱۷۶۲
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            برای مشاهده مدارک لازم، مراحل انجام و سوالات متداول هر خدمت، روی آن کلیک کنید.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          {/* فیلتر دسته‌بندی */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['همه', ...SERVICE_CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-300 transition-all hover:-translate-y-1 flex flex-col"
              >
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full self-start mb-4">
                  {s.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{s.summary}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-500">{s.documents.length} مدرک لازم</span>
                  <span className="text-amber-600 font-medium flex items-center group-hover:gap-1 transition-all">
                    جزئیات
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
