import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LOOKBOOKS } from '../data/lookbooks';
import { ArrowRight, MapPin } from 'lucide-react';
import { Lookbook, Hotspot } from '../types';
import { motion } from 'framer-motion';

export const LookbookView: React.FC = () => {
  const { navigateTo, formatPrice } = useStore();
  const [activeLookbookIdx, setActiveLookbookIdx] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const lookbook = LOOKBOOKS[activeLookbookIdx] || LOOKBOOKS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          RUNWAY EDITORIAL ARCHIVE
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium">
          The Seasonal Lookbooks
        </h1>
        <p className="text-xs text-[#7A7870] font-light">
          Inspect full styling coordinates captured on location across Venice, Poissy, and London. Click on floating garment pins to inspect and acquire each piece.
        </p>

        {/* Season Lookbook Selectors */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {LOOKBOOKS.map((lb: Lookbook, idx: number) => (
            <button
              key={lb.id}
              onClick={() => {
                setActiveLookbookIdx(idx);
                setActiveHotspotId(null);
              }}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                activeLookbookIdx === idx
                  ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                  : 'bg-[#EFECE5] dark:bg-[#1A1C24] text-[#6C6E7C] hover:text-black dark:hover:text-white'
              }`}
            >
              {lb.title.split('—')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Lookbook Canvas */}
      <div className="bg-[#121316] text-white p-6 sm:p-10 rounded-sm border border-[#23242E] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Full Interactive Hotspot Image */}
        <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#181920]">
          <img
            src={lookbook.image}
            alt={lookbook.title}
            className="w-full h-full object-cover"
          />

          {/* Floating Hotspot Pins */}
          {lookbook.hotspots.map((hs: Hotspot) => (
            <div
              key={hs.id}
              style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              onMouseEnter={() => setActiveHotspotId(hs.id)}
              onClick={() => setActiveHotspotId(hs.id)}
            >
              <div className="w-7 h-7 rounded-full bg-[#FAF9F6]/90 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-2xl border border-black/20 animate-pulse group-hover:scale-125 transition-transform">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0C0C0E]" />
              </div>

              {/* Tooltip Card */}
              {activeHotspotId === hs.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 bg-[#FAF9F6] text-[#0C0C0E] p-3.5 rounded-sm shadow-2xl z-30 pointer-events-auto"
                >
                  <div className="flex gap-3">
                    <img
                      src={hs.image}
                      alt={hs.title}
                      className="w-14 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-xs font-semibold truncate">
                        {hs.title}
                      </h5>
                      <span className="text-xs font-serif font-bold text-[#C5A880] block mt-0.5">
                        {formatPrice(hs.price)}
                      </span>
                      <button
                        onClick={() => navigateTo('product', { productId: hs.productId })}
                        className="mt-1.5 text-[10px] font-mono uppercase tracking-wider text-black underline flex items-center gap-1 hover:text-[#C5A880]"
                      >
                        Inspect Garment <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Lookbook Details */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lookbook.location}</span>
            </div>
            <h3 className="text-2xl font-serif font-medium mt-1">
              {lookbook.title}
            </h3>
            <p className="text-xs text-[#9DA0AE] mt-2 font-light leading-relaxed">
              {lookbook.description}
            </p>
            <span className="text-[11px] text-[#7A7870] font-mono block mt-2">
              Photography: {lookbook.photographer}
            </span>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#262832]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D8D5CE] block">
              COORDINATING RUNWAY GARMENTS:
            </span>
            <div className="space-y-2">
              {lookbook.hotspots.map((hs: Hotspot) => (
                <div
                  key={hs.id}
                  onClick={() => navigateTo('product', { productId: hs.productId })}
                  className="flex items-center justify-between p-3 bg-[#1A1C24] hover:bg-[#252834] border border-[#2B2D3A] rounded cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={hs.image}
                      alt={hs.title}
                      className="w-12 h-14 object-cover rounded"
                    />
                    <div>
                      <h6 className="font-serif text-xs font-medium line-clamp-1">
                        {hs.title}
                      </h6>
                      <span className="font-serif text-xs text-[#C5A880]">
                        {formatPrice(hs.price)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8A857A]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
