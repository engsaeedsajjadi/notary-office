import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="صفحه یافت نشد"
        description="صفحه مورد نظر یافت نشد."
        path="/404"
        noindex
      />
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 pt-28 pb-16">
        <div className="container mx-auto px-6 text-center max-w-lg">
          <p className="text-7xl font-bold text-amber-500 mb-4">۴۰۴</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">این صفحه پیدا نشد</h1>
          <p className="text-slate-600 leading-relaxed mb-8">
            ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              صفحه اصلی
            </Link>
            <Link
              to="/services"
              className="bg-white border border-slate-300 hover:border-amber-400 text-slate-800 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              فهرست خدمات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
