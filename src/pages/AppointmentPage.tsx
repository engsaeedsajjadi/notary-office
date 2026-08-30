import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import AppointmentForm from '../components/AppointmentForm';
import { BUSINESS, primaryPhone } from '../data/business';

export default function AppointmentPage() {
  return (
    <>
      <Seo
        title="درخواست نوبت و هماهنگی مراجعه"
        description="فرم درخواست هماهنگی مراجعه به دفتر اسناد رسمی ۱۷۶۲ تهران. نوع خدمت، تعداد مراجعین و زمان دلخواه خود را اعلام کنید."
        path="/appointment"
        keywords={['نوبت دفترخانه', 'هماهنگی مراجعه', 'وقت دفتر اسناد رسمی']}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'درخواست نوبت' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            درخواست هماهنگی مراجعه
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            با اعلام قبلی نوع خدمت، استعلامات و مقدمات پرونده پیش از حضور شما انجام
            می‌شود و زمان مراجعه به‌طور محسوسی کوتاه‌تر خواهد شد.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <AppointmentForm />
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">پس از ارسال چه می‌شود؟</h2>
                <ol className="space-y-3 text-sm text-slate-600">
                  {[
                    'درخواست شما در واتساپ دفتر ثبت می‌شود.',
                    'کارشناس ما مدارک لازم را برای شما ارسال می‌کند.',
                    'زمان مراجعه تلفنی تأیید می‌شود.',
                    'در زمان مقرر با اصل مدارک مراجعه می‌کنید.',
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                        {(i + 1).toLocaleString('fa-IR')}
                      </span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">ترجیح می‌دهید تماس بگیرید؟</h2>
                <ul className="space-y-2 text-sm">
                  {BUSINESS.phones.map((p) => (
                    <li key={p.tel}>
                      <a
                        href={`tel:${p.tel}`}
                        className="text-amber-700 font-bold hover:underline"
                      >
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  {BUSINESS.hours.weekdays.label}: {BUSINESS.hours.weekdays.open} تا{' '}
                  {BUSINESS.hours.weekdays.close}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h2 className="font-bold text-amber-900 mb-2">توجه مهم</h2>
                <p className="text-sm text-amber-800 leading-relaxed">
                  این فرم بخشی از سامانه رسمی نوبت‌دهی سازمان ثبت نیست و صرفاً ابزار
                  هماهنگی داخلی این دفترخانه است. مراجعه حضوری بدون هماهنگی قبلی نیز در
                  ساعات کاری امکان‌پذیر است.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
