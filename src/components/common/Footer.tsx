import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Globe,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    navigateTo,
    currency,
    setCurrency,
    language,
    setLanguage,
    t,
    cmsContent,
    addToast
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast(t.newsletter.success, 'success');
  };

  return (
    <footer className="bg-[#0C0C0E] text-[#E5E2DC] pt-16 pb-12 border-t border-[#1F2027]">
      {/* Top Value Badges: White-glove delivery, Bespoke Tailoring, Certified Materials, 24/7 Concierge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#1E2028]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#17181F] text-[#C5A880] rounded-sm border border-[#2B2C36]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
                COMPLIMENTARY WHITE-GLOVE SHIPPING
              </h4>
              <p className="text-xs text-[#8F919E] mt-1 font-light leading-relaxed">
                Insured priority express courier with custom packaging on orders over KD 150.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#17181F] text-[#C5A880] rounded-sm border border-[#2B2C36]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
                BESPOKE ATELIER FIT
              </h4>
              <p className="text-xs text-[#8F919E] mt-1 font-light leading-relaxed">
                Complimentary garment adjustments and master tailor consultations at all flagship salons.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#17181F] text-[#C5A880] rounded-sm border border-[#2B2C36]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
                TRACEABLE & AUTHENTIC
              </h4>
              <p className="text-xs text-[#8F919E] mt-1 font-light leading-relaxed">
                Every piece includes an embedded cryptographic RFID tag and serialized certificate of origin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#17181F] text-[#C5A880] rounded-sm border border-[#2B2C36]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
                24/7 CLIENT CONCIERGE
              </h4>
              <p className="text-xs text-[#8F919E] mt-1 font-light leading-relaxed">
                Dedicated personal stylists available via WhatsApp, live chat, or private appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Newsletter Section */}
        <div className="md:col-span-4 space-y-6">
          <div>
            <span className="text-2xl font-display font-bold tracking-[0.35em] text-[#FAF9F6] block">
              {cmsContent.brandName || 'CLOTHYYY'}
            </span>
            <span className="text-[9px] tracking-[0.4em] text-[#C5A880] uppercase">
              {cmsContent.brandTagline || 'HAUTE COUTURE & ARCHITECTURAL LUXURY'}
            </span>
          </div>

          <p className="text-xs text-[#9CA0AE] font-light leading-relaxed max-w-sm">
            {cmsContent.aboutStoryP1 || t.footer.brandStatement}
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E5E2DC] block mb-2">
              {t.footer.newsletterTitle}
            </span>
            <p className="text-xs text-[#8F919E] mb-3">
              {t.footer.newsletterSubtitle}
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-2 text-xs text-[#C5A880] bg-[#171922] p-3 rounded border border-[#2B2C37]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you. Your VIP invitation has been recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  required
                  className="bg-[#171820] text-xs text-white placeholder-[#686A78] px-4 py-3 rounded-l border border-[#2D2F3C] focus:border-[#C5A880] focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0C0C0E] px-4 py-3 rounded-r text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Column: The House */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
            {t.footer.theHouse}
          </h4>
          <ul className="space-y-2.5 text-xs text-[#9CA0AE]">
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-[#C5A880] transition-colors">
                The Heritage & Atelier
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-[#C5A880] transition-colors">
                Craftsmanship Manifesto
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-[#C5A880] transition-colors">
                Sustainability & Traceability
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('lookbook')} className="hover:text-[#C5A880] transition-colors">
                Seasonal Runway Lookbooks
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('journal')} className="hover:text-[#C5A880] transition-colors">
                The Journal & Fashion Essays
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('stores')} className="hover:text-[#C5A880] transition-colors">
                Global Salon Locations
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('polyglot')} className="text-gold-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-gold-400" />
                <span>11-Language Polyglot Fleet</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Navigation Column: Client Care */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
            {t.footer.clientCare}
          </h4>
          <ul className="space-y-2.5 text-xs text-[#9CA0AE]">
            <li>
              <button onClick={() => navigateTo('help')} className="hover:text-[#C5A880] transition-colors">
                Client Concierge & FAQs
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-[#C5A880] transition-colors">
                Book Private VIP Styling Session
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('help')} className="hover:text-[#C5A880] transition-colors">
                Complimentary White-Glove Returns
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('help')} className="hover:text-[#C5A880] transition-colors">
                International Size & Fit Matrix
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('help')} className="hover:text-[#C5A880] transition-colors">
                RFID Authenticity Verification
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('account')} className="hover:text-[#C5A880] transition-colors">
                Noir Privé Member Suite
              </button>
            </li>
          </ul>
        </div>

        {/* Navigation Column: Salons & Direct Contact */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FAF9F6]">
            {t.footer.boutiques}
          </h4>
          <div className="text-xs text-[#9CA0AE] space-y-2 font-light">
            <p className="text-[#E5E2DC] font-medium">Kuwait Flagship Salon:</p>
            <p>Al Hamra Luxury Center, Level 2, Sharq</p>
            <p className="text-[#C5A880] font-mono">{cmsContent.contactPhone || '+965 2205 8899'}</p>
            <p className="text-[#C5A880]">{cmsContent.contactEmail || 'concierge@clothyyy.com'}</p>

            <div className="pt-3">
              <span className="text-[11px] text-[#787B8A] block mb-2">SALONS WORLDWIDE:</span>
              <span className="text-xs text-[#E5E2DC]">
                Kuwait City • London Mayfair • Paris Vendôme • New York Madison • Tokyo Omotesando
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#1C1E26] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7A7870]">
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span>© {new Date().getFullYear()} {cmsContent.brandName || 'CLOTHYYY'}.COM. {t.footer.allRightsReserved}</span>
          <button onClick={() => navigateTo('legal')} className="hover:text-[#C5A880] underline underline-offset-2">
            Terms & Privacy
          </button>
          <button onClick={() => navigateTo('legal')} className="hover:text-[#C5A880] underline underline-offset-2">
            Ethical Sourcing
          </button>
          <button onClick={() => navigateTo('legal')} className="hover:text-[#C5A880] underline underline-offset-2">
            Cookie Preferences
          </button>
        </div>

        {/* Payment badges */}
        <div className="flex flex-wrap items-center gap-2">
          {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'KNET', 'TAMARA', 'TABBY', 'CRYPTO'].map((badge) => (
            <span
              key={badge}
              className="bg-[#15161C] border border-[#2A2B36] text-[10px] font-mono px-2 py-0.5 rounded text-[#A0A2B0]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Source of truth notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-center">
        <p className="text-[10px] text-[#555866]">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
};
