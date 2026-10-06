import React, { useState } from 'react';

export const LegalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'ethics' | 'cookies'>('terms');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-xs">
      <div className="border-b border-[#E8E4DA] dark:border-[#22242D] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="text-3xl font-serif font-medium mt-1">
          Governance & Client Privacy Terms
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 font-mono">
        {[
          { id: 'terms', label: 'Terms of Service' },
          { id: 'privacy', label: 'Privacy & Security Policy' },
          { id: 'ethics', label: 'Ethical Sourcing & Traceability' },
          { id: 'cookies', label: 'Cookie Preferences' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                : 'bg-[#EFECE5] dark:bg-[#1A1C24] text-[#6C6E7C] hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6 leading-relaxed text-[#5C5E6D] dark:text-[#A8AAB9]">
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-black dark:text-white">
              Terms of Service & White-Glove Commerce
            </h3>
            <p>
              Welcome to CLOTHYYY.COM. By browsing our collections or acquiring garments through our digital or physical salons, you enter into an agreement with CLOTHYYY Maison.
            </p>
            <h4 className="font-serif text-sm font-semibold text-black dark:text-white">
              1. Made-to-Measure & Archival Allocations
            </h4>
            <p>
              All bespoke garments are custom-drafted according to your individualized measurements. Delivery Duty Paid (DDP) terms ensure all international customs duties and import taxes are prepaid on your behalf.
            </p>
            <h4 className="font-serif text-sm font-semibold text-black dark:text-white">
              2. 30-Day White-Glove Returns
            </h4>
            <p>
              Ready-to-wear creations may be returned within 30 days of delivery provided all cryptographic RFID security tags remain intact.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-black dark:text-white">
              Client Privacy & Data Sovereignty
            </h3>
            <p>
              We maintain absolute discretion regarding client identities, private styling records, and bespoke measurements.
            </p>
            <p>
              All transactions are encrypted with 256-bit TLS bank-grade security protocols. We do not sell or disclose client records to third-party advertisers.
            </p>
          </div>
        )}

        {activeTab === 'ethics' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-black dark:text-white">
              Ethical Sourcing & Artisanal Traceability
            </h3>
            <p>
              100% of our natural raw fibers are audited according to the Sustainable Fibre Alliance (SFA) and Responsible Wool Standard (RWS).
            </p>
            <p>
              We operate exclusively with European and Japanese family-owned mills providing living wages, safe artisanal working environments, and zero toxic chemical effluents.
            </p>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-black dark:text-white">
              Cookie & Session Management
            </h3>
            <p>
              We utilize essential session cookies to preserve your shopping bag contents, selected currency preferences, and client authentication status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
