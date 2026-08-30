import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import Contact from '../../components/Contact';
import { BUSINESS } from '../data/business';

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `تماس با ${BUSINESS.name}`,
    url: `${BUSINESS.domain}/contact`,
    mainEntity: { '@id': `${BUSINESS.domain}/#organization` },
  };

  return (
    <>
      <Seo
        title="تماس و آدرس"
        description={`آدرس و راه‌های ارتباطی دفتر اسناد رسمی ۱۷۶۲ تهران: ${BUSINESS.address.full}. مسیریابی با گوگل مپ، نشان، بلد و ویز.`}
        path="/contact"
        keywords={['آدرس دفترخانه جردن', 'تلفن دفتر اسناد رسمی ۱۷۶۲', 'مسیریابی دفترخانه']}
        schema={schema}
      />

      <section className="pt-28 pb-10 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'تماس و آدرس' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            تماس با ما و مسیریابی
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">{BUSINESS.address.full}</p>
        </div>
      </section>

      <Contact />
    </>
  );
}
