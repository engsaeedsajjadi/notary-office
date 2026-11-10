import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { faqs } from '../../data/site';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">سوالات متداول</h2>
          <p className="text-slate-500">پاسخ به پرسش‌های رایج شما</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className={`border rounded-xl overflow-hidden bg-white transition-colors ${open ? 'border-amber-300' : 'border-slate-200 hover:border-amber-300'}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-start hover:bg-slate-50 transition-colors"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span className="font-bold text-slate-800">{faq.question}</span>
                    <ChevronDownIcon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-amber-500' : 'text-slate-400'}`} />
                  </button>
                </h3>
                {/* Animating grid rows lets the panel grow to any answer length. */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className={`overflow-hidden ${open ? 'visible' : 'invisible'}`}>
                    <p className="px-5 pb-5 text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
