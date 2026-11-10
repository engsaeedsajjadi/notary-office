import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import DocumentChecklist from '../components/DocumentChecklist';
import { BUSINESS } from '../data/business';

export default function ChecklistPage() {
  return (
    <>
      <Seo
        title="چک‌لیست مدارک لازم دفترخانه"
        description="فهرست دقیق مدارک لازم برای هر خدمت دفتر اسناد رسمی. پیش از مراجعه تیک بزنید تا مراجعه شما بی‌نتیجه نماند."
        path="/checklist"
        keywords={['مدارک لازم دفترخانه', 'چک لیست مدارک', 'مدارک تنظیم سند']}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'مدارک لازم' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            چک‌لیست مدارک لازم
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            نوع خدمت را انتخاب کنید، مدارک را تیک بزنید و فهرست را چاپ یا در واتساپ ذخیره
            کنید. وضعیت تیک‌ها در مرورگر شما نگهداری می‌شود.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <DocumentChecklist />
            </div>

            <aside className="space-y-6 print:hidden">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">چرا اصل مدارک؟</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  سردفتر موظف به احراز هویت قطعی مراجعین است. این الزام قانونی برای
                  جلوگیری از جعل وضع شده و استثناپذیر نیست. همچنین شماره تلفن همراه باید
                  به نام خود شخص باشد، زیرا کد تأیید سامانه ثبت به آن ارسال می‌شود.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">ساعات مراجعه</h2>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>
                    {BUSINESS.hours.weekdays.label}: {BUSINESS.hours.weekdays.open} تا{' '}
                    {BUSINESS.hours.weekdays.close}
                  </li>
                  <li>
                    {BUSINESS.hours.thursday.label}: {BUSINESS.hours.thursday.open} تا{' '}
                    {BUSINESS.hours.thursday.close}
                  </li>
                  <li className="text-slate-500">{BUSINESS.hours.closed}</li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h2 className="font-bold mb-2">هماهنگی پیش از مراجعه</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  با ارسال درخواست، پرونده شما پیش از حضور آماده می‌شود.
                </p>
                <Link
                  to="/appointment"
                  className="block text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  درخواست نوبت
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
