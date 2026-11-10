import { REVIEWS, reviewStats } from '../data/reviews';

function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-slate-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.958a1 1 0 0 0-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .951-.69l1.285-3.958Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16 bg-white" id="reviews">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">نظر مراجعین</h2>
          <div className="flex items-center justify-center gap-3">
            <Stars rating={Math.round(reviewStats.average)} />
            <span className="text-slate-700 font-bold">
              {reviewStats.average.toLocaleString('fa-IR')} از ۵
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 text-sm">
              {reviewStats.count.toLocaleString('fa-IR')} نظر ثبت‌شده
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <Stars rating={r.rating} />
                <span className="text-xs text-slate-400">{r.date}</span>
              </div>
              <blockquote className="text-slate-700 leading-relaxed text-sm flex-1">
                {r.body}
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{r.author}</span>
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                  {r.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          نظرات درج‌شده با اجازه مراجعین و به‌صورت خلاصه منتشر شده است.
        </p>
      </div>
    </section>
  );
}
