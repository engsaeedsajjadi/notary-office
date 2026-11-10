import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import FeeInquiry from '../components/FeeInquiry';

export default function FeesPage() {
  return (
    <>
      <Seo
        title="استعلام هزینه سند و تعرفه دفترخانه"
        description="استعلام رایگان هزینه تنظیم سند رسمی شامل حق‌التحریر، حق‌الثبت و مالیات. هزینه‌ها مطابق تعرفه مصوب سازمان ثبت اسناد و املاک کشور و در همه دفاتر یکسان است."
        path="/fees"
        keywords={[
          'استعلام هزینه سند',
          'تعرفه دفتر اسناد رسمی',
          'حق التحریر',
          'هزینه وکالت نامه',
          'هزینه سند قطعی',
        ]}
      />

      <section className="pt-28 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: 'استعلام هزینه' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            هزینه تنظیم سند
          </h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            هزینه هر سند را سامانه ثبت آنی بر اساس شرایط اختصاصی پرونده محاسبه می‌کند.
            برای اعلام رقم دقیق و رایگان، نوع سند خود را مشخص کنید و با ما تماس بگیرید.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <FeeInquiry />
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">اجزای هزینه سند</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-bold text-slate-800">حق‌التحریر</dt>
                    <dd className="text-slate-600 leading-relaxed">
                      دستمزد دفترخانه بابت تنظیم سند، مطابق تعرفه مصوب قوه قضاییه.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">حق‌الثبت</dt>
                    <dd className="text-slate-600 leading-relaxed">
                      مبلغی که به حساب دولت واریز می‌شود و معمولاً درصدی از مبلغ سند است.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">مالیات بر ارزش افزوده</dt>
                    <dd className="text-slate-600 leading-relaxed">
                      ۹ درصد روی حق‌التحریر محاسبه می‌شود.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">هزینه صدور الکترونیکی</dt>
                    <dd className="text-slate-600 leading-relaxed">
                      مبلغ ثابت بابت صدور سند در سامانه ثبت آنی.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 mb-3">نکات مهم</h2>
                <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc ps-5">
                  <li>پرداخت حق‌التحریر معمولاً بالمناصفه بر عهده طرفین است.</li>
                  <li>تمام پرداخت‌ها از طریق کارتخوان متصل به سامانه ثبت انجام می‌شود.</li>
                  <li>دفترخانه هیچ مبلغی خارج از تعرفه دریافت نمی‌کند.</li>
                  <li>در صورت عدم استطاعت مالی، با تأیید کانون سردفتران امکان ثبت رایگان وجود دارد.</li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h2 className="font-bold mb-2">مدارک لازم را بررسی کنید</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  پیش از مراجعه، از کامل بودن مدارک خود مطمئن شوید.
                </p>
                <Link
                  to="/checklist"
                  className="block text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  چک‌لیست مدارک
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
