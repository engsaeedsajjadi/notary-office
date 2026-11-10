import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { BUSINESS, primaryPhone, navigationLinks } from '../data/business';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';
import { MapPinIcon } from '../../components/icons/MapPinIcon';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { EmailIcon } from '../../components/icons/EmailIcon';

/**
 * صفحه انگلیسی.
 *
 * منطق تجاری: دفتر در جردن قرار دارد — محل تمرکز سفارتخانه‌ها، شرکت‌های
 * خارجی و اتباع بیگانه. عبارت «notary public Tehran» عملاً رقیب ندارد
 * و همین یک صفحه می‌تواند بخش پرارزشی از بازار را جذب کند.
 *
 * محتوا با dir="ltr" و lang="en" رندر می‌شود تا هم برای کاربر و هم برای
 * موتور جستجو صحیح باشد.
 */

const SERVICES_EN = [
  {
    title: 'Property Title Transfer',
    text: 'Official registration of real-estate sale deeds, including all statutory enquiries from the Registry Organisation, municipality and tax authority.',
  },
  {
    title: 'Powers of Attorney',
    text: 'Drafting and registration of general, special and irrevocable powers of attorney, including documents intended for use abroad.',
  },
  {
    title: 'Signature Certification',
    text: 'Certification of signatures on banking forms, corporate undertakings, university commitments and private agreements.',
  },
  {
    title: 'Certified True Copies',
    text: 'Official attestation that a copy of a passport, licence, diploma or corporate record matches the original.',
  },
  {
    title: 'Corporate Documents',
    text: 'Undertakings, acknowledgements and contractual instruments for companies and their representatives in Iran.',
  },
  {
    title: 'Vehicle Documents',
    text: 'Definitive vehicle sale deeds, transfer powers of attorney and lien releases.',
  },
];

const FAQ_EN = [
  {
    q: 'Do I need to attend in person?',
    a: 'Yes. Under Iranian law the notary must verify the identity of every signatory in person. Original identification documents are mandatory; photocopies are not accepted.',
  },
  {
    q: 'What identification do foreign nationals need?',
    a: 'A valid passport with a valid Iranian visa or residence permit. Depending on the transaction, a certified Persian translation of the passport and, in some cases, a tax identification number may also be required.',
  },
  {
    q: 'Are your fees negotiable?',
    a: 'No. Notary fees in Iran are fixed by a national tariff approved by the Judiciary and are identical at every notary office in the country. Payment is made by card through the official registry system, and a receipt is always issued.',
  },
  {
    q: 'Can a document be used outside Iran?',
    a: 'A notarised document generally requires subsequent certification by the Ministry of Justice and the Ministry of Foreign Affairs, and then legalisation by the relevant embassy. We prepare the deed in the form required for that process.',
  },
  {
    q: 'Do you provide interpretation?',
    a: 'The law requires that signatories understand the content of the deed. Where a party does not speak Persian, an official sworn translator must attend. We can advise on arranging one.',
  },
];

export default function EnglishPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en',
    mainEntity: FAQ_EN.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div dir="ltr" lang="en" className="text-left">
      <Seo
        title="Notary Public in Tehran | Official Notary Office No. 1762, Jordan District"
        description="English-speaking notary public office in Tehran's Jordan (Nelson Mandela) district. Property transfers, powers of attorney, signature certification and certified copies for foreign nationals and international companies."
        path="/en"
        keywords={[
          'notary public Tehran',
          'notary office Iran',
          'power of attorney Tehran',
          'English speaking notary Tehran',
          'Jordan district notary',
        ]}
        schema={schema}
        locale="en"
      />

      <section className="pt-32 pb-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 transition-colors mb-6"
          >
            ← نسخه فارسی / Persian version
          </Link>
          <span className="block text-amber-400 font-bold tracking-wider text-sm uppercase mb-3">
            Official Notary Office No. 1762 — Tehran
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight max-w-4xl">
            Notary Public Services in Tehran
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed mb-8">
            Located in the Jordan (Nelson Mandela) district, we assist foreign nationals,
            diplomatic staff and international companies with property transfers, powers of
            attorney and document certification under Iranian law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 px-7 py-4 rounded-xl font-bold transition-colors"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              +98 21 2621 2506
            </a>
            <a
              href={BUSINESS.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-xl font-bold transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Services</h2>
          <p className="text-slate-500 mb-10 max-w-2xl">
            All deeds are registered in the national electronic registry system and carry
            full legal force.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_EN.map((s) => (
              <div key={s.title} className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">What to Bring</h2>
              <ul className="space-y-3">
                {[
                  'Original passport, valid at the time of signing',
                  'A valid Iranian visa, residence permit or work permit',
                  'Certified Persian translation of the passport, where required',
                  'A mobile phone number registered in your own name (a verification code is sent to it)',
                  'Original documents relating to the transaction — title deed, vehicle documents, corporate records',
                  'An official sworn translator, if you do not read Persian',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-2.5" />
                    <span className="text-slate-700 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl p-4 leading-relaxed">
                <strong className="text-slate-900">Please note:</strong> requirements vary by
                transaction and by nationality. Contact us in advance so that we can confirm
                exactly what your case requires — this usually saves a second visit.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Visit Us</h2>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="flex gap-4">
                  <MapPinIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      4th Floor, Unit 3, Iran Trade Centre (Black Tower), No. 216,
                      <br />
                      Jordan (Nelson Mandela) Boulevard, Tehran, Iran
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ClockIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Opening Hours</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Saturday – Wednesday: 07:30 – 15:30
                      <br />
                      Thursday: 07:30 – 12:00
                      <br />
                      Friday and public holidays: closed
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <PhoneIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Telephone</h3>
                    <p className="text-slate-600 text-sm" dir="ltr">
                      +98 21 2621 2506
                      <br />
                      +98 21 2621 2505
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <EmailIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="text-amber-700 text-sm hover:underline"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <a
                  href={navigationLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_EN.map((f, i) => (
              <details
                key={i}
                open={i === 0}
                className="group border border-slate-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 bg-slate-50 cursor-pointer font-bold text-slate-800 hover:bg-slate-100 transition-colors list-none gap-3">
                  {f.q}
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="p-5 text-slate-600 leading-relaxed border-t border-slate-100">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-10 text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-5">
            This page is provided for general information only and does not constitute legal
            advice. Notary fees are set by national tariff and are the same at every notary
            office in Iran; no charge is made outside that tariff.
          </p>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© {new Date().getFullYear()} Official Notary Office No. 1762, Tehran.</p>
          <Link to="/" className="text-amber-400 hover:text-amber-300 transition-colors">
            نسخه فارسی
          </Link>
        </div>
      </footer>
    </div>
  );
}
