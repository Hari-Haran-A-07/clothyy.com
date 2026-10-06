import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SIZE_CONVERSION_DATA } from '../../data/cmsContent';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideModalOpen, setSizeGuideModalOpen } = useStore();

  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  // Interactive Fit Calculator
  const [calcHeight, setCalcHeight] = useState('175');
  const [calcFitPreference, setCalcFitPreference] = useState<'tailored' | 'relaxed' | 'oversized'>('relaxed');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  if (!sizeGuideModalOpen) return null;

  const handleCalculateFit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseInt(calcHeight) || 175;
    if (activeTab === 'women') {
      if (h < 165) setRecommendedSize(calcFitPreference === 'tailored' ? 'FR 34 / XS' : 'FR 36 / S');
      else if (h <= 175) setRecommendedSize(calcFitPreference === 'oversized' ? 'FR 38 / M' : 'FR 36 / S');
      else setRecommendedSize(calcFitPreference === 'oversized' ? 'FR 40 / L' : 'FR 38 / M');
    } else {
      if (h < 175) setRecommendedSize(calcFitPreference === 'tailored' ? 'IT 46 / US 36' : 'IT 48 / US 38');
      else if (h <= 185) setRecommendedSize(calcFitPreference === 'oversized' ? 'IT 52 / US 42' : 'IT 50 / US 40');
      else setRecommendedSize(calcFitPreference === 'oversized' ? 'IT 54 / US 44' : 'IT 52 / US 42');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FAF9F6] dark:bg-[#121318] text-[#121316] dark:text-[#FAF9F6] w-full max-w-3xl rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h3 className="font-serif text-lg font-medium">ATELIER SIZE & FIT ADVISOR</h3>
              <span className="text-[10px] font-mono text-[#8A857A] uppercase tracking-wider">
                Precision Measurement Conversions
              </span>
            </div>
          </div>
          <button
            onClick={() => setSizeGuideModalOpen(false)}
            className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Tabs & Unit switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAE6DD] dark:border-[#1E2028]">
            <div className="flex bg-[#EFECE5] dark:bg-[#1A1C24] p-1 rounded">
              <button
                onClick={() => {
                  setActiveTab('women');
                  setRecommendedSize(null);
                }}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  activeTab === 'women'
                    ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                    : 'text-[#6C6F7E] hover:text-black dark:hover:text-white'
                }`}
              >
                Women's Sizing
              </button>
              <button
                onClick={() => {
                  setActiveTab('men');
                  setRecommendedSize(null);
                }}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  activeTab === 'men'
                    ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                    : 'text-[#6C6F7E] hover:text-black dark:hover:text-white'
                }`}
              >
                Men's Sizing
              </button>
            </div>

            <div className="text-xs text-[#8A857A] font-mono">
              All garments tailored to international luxury standards.
            </div>
          </div>

          {/* Interactive Fit Recommender Widget */}
          <div className="bg-[#EFECE5] dark:bg-[#181920] p-4 rounded border border-[#DDD8CE] dark:border-[#282A36]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI FIT RECOMMENDER</span>
            </div>
            <form onSubmit={handleCalculateFit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-[#7A7870] block mb-1">
                  Your Height (cm):
                </label>
                <input
                  type="number"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  className="w-full bg-[#FAF9F6] dark:bg-[#121318] text-xs px-3 py-2 border border-[#DDD8CE] dark:border-[#2E303C] rounded focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#7A7870] block mb-1">
                  Desired Fit Silhouette:
                </label>
                <select
                  value={calcFitPreference}
                  onChange={(e) => setCalcFitPreference(e.target.value as any)}
                  className="w-full bg-[#FAF9F6] dark:bg-[#121318] text-xs px-3 py-2 border border-[#DDD8CE] dark:border-[#2E303C] rounded focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="tailored">Tailored / Fitted</option>
                  <option value="relaxed">Relaxed Drape</option>
                  <option value="oversized">Runway Oversized</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#121316] dark:bg-[#C5A880] text-white dark:text-black py-2 px-4 rounded text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Find My Size
                </button>
              </div>
            </form>

            {recommendedSize && (
              <div className="mt-3 p-3 bg-[#C5A880]/15 border border-[#C5A880]/40 rounded text-xs flex items-center justify-between">
                <span>Recommended Size: <strong>{recommendedSize}</strong></span>
                <span className="text-[11px] text-[#8A857A]">Based on {calcFitPreference} silhouette</span>
              </div>
            )}
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EFECE5] dark:bg-[#1A1C24] text-[#8A857A] font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  {activeTab === 'women' ? (
                    <>
                      <th className="p-3">France</th>
                      <th className="p-3">Italy</th>
                      <th className="p-3">UK</th>
                      <th className="p-3">US</th>
                      <th className="p-3">Bust</th>
                      <th className="p-3">Waist</th>
                      <th className="p-3">Hips</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3">Italy / EU</th>
                      <th className="p-3">UK</th>
                      <th className="p-3">US</th>
                      <th className="p-3">Chest</th>
                      <th className="p-3">Waist</th>
                      <th className="p-3">Neck</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE6DD] dark:divide-[#1E2028] font-mono">
                {activeTab === 'women'
                  ? SIZE_CONVERSION_DATA.women.map((row) => (
                      <tr key={row.fr} className="hover:bg-[#EFECE5]/40 dark:hover:bg-[#1A1C24]/40">
                        <td className="p-3 font-semibold text-[#C5A880]">{row.fr}</td>
                        <td className="p-3">{row.it}</td>
                        <td className="p-3">{row.uk}</td>
                        <td className="p-3">{row.us}</td>
                        <td className="p-3 text-[#7A7870]">{row.bust}</td>
                        <td className="p-3 text-[#7A7870]">{row.waist}</td>
                        <td className="p-3 text-[#7A7870]">{row.hips}</td>
                      </tr>
                    ))
                  : SIZE_CONVERSION_DATA.men.map((row) => (
                      <tr key={row.it} className="hover:bg-[#EFECE5]/40 dark:hover:bg-[#1A1C24]/40">
                        <td className="p-3 font-semibold text-[#C5A880]">{row.it}</td>
                        <td className="p-3">{row.uk}</td>
                        <td className="p-3">{row.us}</td>
                        <td className="p-3 text-[#7A7870]">{row.chest}</td>
                        <td className="p-3 text-[#7A7870]">{row.waist}</td>
                        <td className="p-3 text-[#7A7870]">{row.neck}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Guidance */}
          <div className="p-4 bg-[#EFECE5]/50 dark:bg-[#16171E] rounded text-xs space-y-2 text-[#7A7870]">
            <h4 className="font-serif text-sm font-semibold text-[#121316] dark:text-[#FAF9F6]">
              How to Take Accurate Measurements:
            </h4>
            <p><strong>Bust / Chest:</strong> Measure around the fullest part of the chest, keeping the tape horizontal.</p>
            <p><strong>Waist:</strong> Measure around the natural waistline, typically the narrowest point of the torso.</p>
            <p><strong>Hips:</strong> Measure around the fullest part of the hips with feet placed together.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFECE5] dark:bg-[#0E0F13] border-t border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between text-xs font-mono">
          <span>Need custom tailoring? Inquire at any Flagship Salon.</span>
          <button
            onClick={() => setSizeGuideModalOpen(false)}
            className="px-4 py-1.5 bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black rounded"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
