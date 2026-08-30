
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import ServicesDetail from './components/ServicesDetail';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans selection:bg-amber-200 selection:text-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <ServicesDetail />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
