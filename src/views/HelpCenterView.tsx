import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_DATA } from '../data/cmsContent';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HelpCenterView: React.FC = () => {
  const { navigateTo, setIsAiStylistOpen, addToast } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<string, boolean>>({ '0-0': true });
  const [rfidCode, setRfidCode] = useState('');
  const [rfidResult, setRfidResult] = useState<any | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaqIndices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVerifyRfid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfidCode) return;
    setRfidResult({
      status: 'AUTHENTIC & VERIFIED',
      serial: rfidCode.toUpperCase(),
      garment: 'The Monolith Double-Faced Cashmere Overcoat',
      atelier: 'Florence Atelier, Italy',
      craftsman: 'Master Tailor M. Bellini',
      dateOfFinishing: 'September 2026',
      provenance: '100% SFA Certified Mongolian Cashmere'
    });
    addToast('RFID Cryptographic Certificate of Authenticity verified.', 'success');
  };

  const filteredFaqs = FAQ_DATA.map((cat) => {
    const questions = cat.questions.filter((q) => {
      const s = searchQuery.toLowerCase();
      return q.q.toLowerCase().includes(s) || q.a.toLowerCase().includes(s);
    });
    return { ...cat, questions };
  }).filter((cat) => cat.questions.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          24/7 CLIENT CONCIERGE
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium">
          Help Center & Client Care
        </h1>
        <p className="text-xs text-[#7A7870] font-light max-w-lg mx-auto">
          Answers to global white-glove shipping, bespoke fitting appointments, authenticity certificates, and 30-day returns.
        </p>

        {/* Search Input */}
        <div className="max-w-lg mx-auto relative pt-4">
          <Search className="w-5 h-5 text-[#8A857A] absolute left-4 top-7" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, returns, customs duties, tailoring..."
            className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] pl-12 pr-4 py-3.5 rounded text-xs border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      {/* Quick Category Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#FAF9F6] dark:bg-[#121318] rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-2">
          <Truck className="w-5 h-5 text-[#C5A880]" />
          <h4 className="font-serif text-base font-medium">Global Express Shipping</h4>
          <p className="text-xs text-[#7A7870] font-light">
            Complimentary insured DHL Express courier on all orders above KD 150.
          </p>
        </div>

        <div className="p-6 bg-[#FAF9F6] dark:bg-[#121318] rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-2">
          <RotateCcw className="w-5 h-5 text-[#C5A880]" />
          <h4 className="font-serif text-base font-medium">30-Day White-Glove Returns</h4>
          <p className="text-xs text-[#7A7870] font-light">
            Doorstep courier collection with zero return shipping tariffs worldwide.
          </p>
        </div>

        <div className="p-6 bg-[#FAF9F6] dark:bg-[#121318] rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-2">
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
          <h4 className="font-serif text-base font-medium">Private Styling Support</h4>
          <p className="text-xs text-[#7A7870] font-light">
            Chat instantly with our AI Stylist or book an in-person salon appointment.
          </p>
        </div>
      </div>

      {/* RFID Authenticity Verification Tool */}
      <div className="bg-[#121316] text-white p-8 rounded-sm border border-[#23242E] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>CRYPTOGRAPHIC AUTHENTICITY VERIFIER</span>
        </div>
        <h3 className="text-2xl font-serif font-medium">
          Verify Your Garment's Serialized Certificate
        </h3>
        <p className="text-xs text-[#9DA0AE] font-light max-w-xl">
          Enter the 8-digit cryptographic serial number located on your garment's woven atelier care ribbon or physical Certificate of Authenticity.
        </p>

        <form onSubmit={handleVerifyRfid} className="flex gap-2 max-w-md pt-2">
          <input
            type="text"
            value={rfidCode}
            onChange={(e) => setRfidCode(e.target.value)}
            placeholder="e.g. CLT-8942-KW"
            className="flex-1 bg-[#1C1D26] text-xs px-4 py-3 rounded border border-[#2E3040] focus:outline-none focus:border-[#C5A880] font-mono uppercase"
          />
          <button
            type="submit"
            className="bg-[#C5A880] hover:bg-[#DFC8A8] text-black px-6 py-3 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
          >
            Verify
          </button>
        </form>

        {rfidResult && (
          <div className="mt-4 p-5 bg-[#1B1D28] border border-[#C5A880]/40 rounded text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#1B6B4A] dark:text-[#4ADE80] font-mono font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{rfidResult.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#9DA0AE] pt-2 font-mono">
              <div>Serial: <strong className="text-white">{rfidResult.serial}</strong></div>
              <div>Garment: <strong className="text-white">{rfidResult.garment}</strong></div>
              <div>Atelier: <strong className="text-white">{rfidResult.atelier}</strong></div>
              <div>Master Tailor: <strong className="text-white">{rfidResult.craftsman}</strong></div>
              <div>Date: <strong className="text-white">{rfidResult.dateOfFinishing}</strong></div>
              <div>Provenance: <strong className="text-white">{rfidResult.provenance}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* Accordion FAQ Sections */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif font-medium border-b border-[#E8E4DA] dark:border-[#22242D] pb-3">
          Frequently Inquired Questions
        </h3>

        {filteredFaqs.map((category, catIdx) => (
          <div key={category.category} className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              {category.category}
            </h4>

            <div className="divide-y divide-[#EAE6DD] dark:divide-[#1E2028] bg-[#FAF9F6] dark:bg-[#121318] rounded border border-[#E3DFD5] dark:border-[#262832]">
              {category.questions.map((q, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                const isOpen = openFaqIndices[key];
                return (
                  <div key={q.q} className="p-4">
                    <button
                      onClick={() => toggleFaq(key)}
                      className="w-full flex items-center justify-between text-left font-serif text-sm font-medium"
                    >
                      <span>{q.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isOpen && (
                      <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light leading-relaxed pt-2">
                        {q.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Concierge Link */}
      <div className="p-8 bg-[#EFECE5] dark:bg-[#151720] rounded text-center space-y-3">
        <h4 className="font-serif text-xl font-medium">Require Dedicated Tailoring Assistance?</h4>
        <p className="text-xs text-[#7A7870] max-w-sm mx-auto">
          Our senior private stylists are available 24 hours a day to assist with orders and customizations.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('contact')}
            className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-2.5 rounded text-xs font-mono uppercase tracking-wider"
          >
            Contact Client Concierge
          </button>
          <button
            onClick={() => setIsAiStylistOpen(true)}
            className="border border-[#DDD8CE] dark:border-[#2C2E38] px-6 py-2.5 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Ask AI Stylist</span>
          </button>
        </div>
      </div>
    </div>
  );
};
