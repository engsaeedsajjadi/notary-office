import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './src/Layout';
import ScrollToTop from './src/components/ScrollToTop';
import Analytics from './src/components/Analytics';

import HomePage from './src/pages/HomePage';
import ServicesPage from './src/pages/ServicesPage';
import ServiceDetailPage from './src/pages/ServiceDetailPage';
import FeesPage from './src/pages/FeesPage';
import ChecklistPage from './src/pages/ChecklistPage';
import ArticlesPage from './src/pages/ArticlesPage';
import ArticleDetailPage from './src/pages/ArticleDetailPage';
import AppointmentPage from './src/pages/AppointmentPage';
import TrackingPage from './src/pages/TrackingPage';
import PartnersPage from './src/pages/PartnersPage';
import ContactPage from './src/pages/ContactPage';
import FaqPage from './src/pages/FaqPage';
import EnglishPage from './src/pages/EnglishPage';
import NotFoundPage from './src/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticleDetailPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="en" element={<EnglishPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
