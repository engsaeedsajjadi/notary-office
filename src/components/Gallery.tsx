import React, { useCallback, useEffect, useState } from 'react';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

// All photos are 1280×576.
const photos: Photo[] = [
  {
    src: '/gallery/building-entrance.jpg',
    alt: 'ورودی ساختمان مرکز تجارت ایران در خیابان جردن',
    caption: 'ورودی ساختمان مرکز تجارت ایران',
  },
  {
    src: '/gallery/waiting-area.jpg',
    alt: 'فضای انتظار مراجعین در دفتر اسناد رسمی ۱۷۶۲',
    caption: 'فضای انتظار مراجعین',
  },
  {
    src: '/gallery/office-desk.jpg',
    alt: 'میز کار و صندلی مراجعین در دفتر اسناد رسمی ۱۷۶۲',
    caption: 'میز پذیرش مراجعین',
  },
  {
    src: '/gallery/office-window.jpg',
    alt: 'اتاق کار دفتر اسناد رسمی ۱۷۶۲',
    caption: 'اتاق کار',
  },
];

const Gallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + delta + photos.length) % photos.length
    );
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // The page is right-to-left, so the left arrow moves forward.
      if (e.key === 'ArrowLeft') step(1);
      if (e.key === 'ArrowRight') step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-amber-600 font-bold text-sm mb-2 block">گالری</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">نگاهی به دفترخانه</h2>
          <p className="text-slate-500">پیش از مراجعه، ورودی ساختمان و فضای دفتر را ببینید</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {photos.map((photo, i) => (
            <figure key={photo.src} className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-200">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full group focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-amber-400"
                aria-label={`نمایش بزرگ‌تر: ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1280}
                  height={576}
                  loading="lazy"
                  className="w-full aspect-[20/9] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/85 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            autoFocus
            className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="بستن"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="تصویر قبلی"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.alt}
              width={1280}
              height={576}
              className="max-w-full max-h-[80vh] w-auto h-auto mx-auto rounded-lg shadow-2xl"
            />
            <figcaption className="text-center text-slate-200 text-sm mt-4">
              {active.caption}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="تصویر بعدی"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 5-7 7 7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
