import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';

export interface Crumb {
  label: string;
  to?: string;
}

/**
 * مسیر راهنما (Breadcrumb) + داده ساختاریافته متناظر.
 * گوگل این مسیر را در نتایج جستجو به‌جای URL خام نمایش می‌دهد.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'خانه', to: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${BUSINESS.domain}${c.to}` } : {}),
    })),
  };

  return (
    <nav aria-label="مسیر صفحه" className="text-sm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-2 text-slate-500">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.to && i < all.length - 1 ? (
              <Link to={c.to} className="hover:text-amber-600 transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-800 font-medium">{c.label}</span>
            )}
            {i < all.length - 1 && <span className="text-slate-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
