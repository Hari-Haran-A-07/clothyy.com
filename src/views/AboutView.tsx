import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Award, Leaf, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { cmsContent, navigateTo } = useStore();

  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          THE MAISON & ATELIER
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-medium leading-tight text-balance">
          The Architecture of Quiet Luxury
        </h1>
        <p className="text-xs sm:text-sm text-[#6C6E7C] dark:text-[#A8AAB9] font-light max-w-2xl mx-auto leading-relaxed">
          {cmsContent.aboutStoryP1}
        </p>
      </section>

      {/* Editorial Image Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[21/9] rounded-sm overflow-hidden bg-[#121316]">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=85"
            alt="CLOTHYYY Atelier Craftsmen"
            className="w-full h-full object-cover opacity-85"
          />
        </div>
      </div>

      {/* 3 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <div className="p-3 bg-[#121316] text-[#C5A880] rounded inline-block">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-medium">1. Purity of Architectural Form</h3>
            <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light leading-relaxed">
              Every seam, lapel angle, and hem drop is calculated with golden-ratio proportions. We eliminate synthetic canvasing and unnecessary ornamentation to let the weight and drape of pure natural fibers sculpt the human silhouette.
            </p>
          </div>

          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <div className="p-3 bg-[#121316] text-[#C5A880] rounded inline-block">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-medium">2. European & Japanese Artisanship</h3>
            <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light leading-relaxed">
              {cmsContent.aboutStoryP2}
            </p>
          </div>

          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <div className="p-3 bg-[#121316] text-[#C5A880] rounded inline-block">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-medium">3. Regenerative Sustainability</h3>
            <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light leading-relaxed">
              {cmsContent.sustainabilityStatement}
            </p>
          </div>
        </div>
      </section>

      {/* Provenance Map & Traceability */}
      <section className="bg-[#121316] text-white py-16 border-y border-[#23242E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              GLOBAL ATELIER NETWORK
            </span>
            <h2 className="text-3xl font-serif font-medium">Artisanal Origins & Guilds</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#1A1C24] rounded border border-[#2B2D3A] space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase">FLORENCE, ITALY</span>
              <h4 className="font-serif text-lg">Double-Faced Cashmere</h4>
              <p className="text-xs text-[#9DA0AE] font-light">
                Two layers of pure Mongolian cashmere split by hand and invisibly joined.
              </p>
            </div>

            <div className="p-6 bg-[#1A1C24] rounded border border-[#2B2D3A] space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase">LYON, FRANCE</span>
              <h4 className="font-serif text-lg">Mulberry Silk Crepe & Twill</h4>
              <p className="text-xs text-[#9DA0AE] font-light">
                40mm heavyweight silk crepe de chine and 14-pass hand-screened twill scarves.
              </p>
            </div>

            <div className="p-6 bg-[#1A1C24] rounded border border-[#2B2D3A] space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase">OKAYAMA, JAPAN</span>
              <h4 className="font-serif text-lg">Vintage Shuttle Selvedge</h4>
              <p className="text-xs text-[#9DA0AE] font-light">
                Loomed on 1950s Toyoda shuttle mechanics with natural organic slack.
              </p>
            </div>

            <div className="p-6 bg-[#1A1C24] rounded border border-[#2B2D3A] space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase">SANTA CROCE, TUSCANY</span>
              <h4 className="font-serif text-lg">Vegetable-Tanned Calfskin</h4>
              <p className="text-xs text-[#9DA0AE] font-light">
                Chestnut tree tannin preservation with hand-buffed edge sealant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-6">
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black hover:bg-[#C5A880] px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-colors shadow-xl inline-flex items-center gap-2"
        >
          <span>Explore The Garment Repertory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
