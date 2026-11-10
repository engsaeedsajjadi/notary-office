import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import FloatingContact from './components/FloatingContact';

export default function Layout() {
  const { pathname } = useLocation();
  // نسخه انگلیسی هدر و فوتر فارسی خودش را دارد
  const isEnglish = pathname.startsWith('/en');

  if (isEnglish) {
    return (
      <div className="bg-white text-slate-800 font-sans">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-800 font-sans selection:bg-amber-200 selection:text-slate-900">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
