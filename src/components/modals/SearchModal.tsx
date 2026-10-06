import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    navigateTo,
    formatPrice
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Cmd+K or Ctrl+K & ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
        );
      });

  const trendingTerms = [
    'Double-faced cashmere',
    'Mulberry silk gown',
    'Japanese selvedge',
    'Tuscan leather tote',
    'Savile Row coat',
    'Sculptural mules'
  ];

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product', { productId });
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAF9F6] dark:bg-[#121318] text-[#121316] dark:text-[#FAF9F6] w-full max-w-3xl rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="relative p-5 border-b border-[#E8E4DA] dark:border-[#22242F] flex items-center gap-3">
            <Search className="w-6 h-6 text-[#A09D95] dark:text-[#6C6F7E]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, silk crepe, cashmere, tailoring, origins..."
              className="w-full bg-transparent text-lg font-serif placeholder-[#8F8D84] dark:placeholder-[#6C6F7E] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#8A857A] hover:text-black dark:hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white rounded"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="space-y-6">
                {/* Trending searches */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8A857A] mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>CURATED ATELIER SEARCHES</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTerms.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectTerm(term)}
                        className="text-xs bg-[#EFECE5] dark:bg-[#1A1C24] hover:bg-[#C5A880] hover:text-black text-[#222328] dark:text-[#DCD9D0] px-3 py-1.5 rounded-full transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular department shortcuts */}
                <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8A857A] block mb-3">
                    EXPLORE DEPARTMENTS
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('shop', { category: 'women', gender: 'women' });
                      }}
                      className="p-3 bg-[#EFECE5] dark:bg-[#1A1C24] text-left hover:border-[#C5A880] border border-transparent rounded transition-all"
                    >
                      <span className="font-serif text-sm block">Women's Atelier</span>
                      <span className="text-[10px] text-[#8A857A]">Cashmere & Silk</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('shop', { category: 'men', gender: 'men' });
                      }}
                      className="p-3 bg-[#EFECE5] dark:bg-[#1A1C24] text-left hover:border-[#C5A880] border border-transparent rounded transition-all"
                    >
                      <span className="font-serif text-sm block">Men's Sartorial</span>
                      <span className="text-[10px] text-[#8A857A]">Savile Row Canvas</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('shop', { category: 'accessories' });
                      }}
                      className="p-3 bg-[#EFECE5] dark:bg-[#1A1C24] text-left hover:border-[#C5A880] border border-transparent rounded transition-all"
                    >
                      <span className="font-serif text-sm block">Leather & Bags</span>
                      <span className="text-[10px] text-[#8A857A]">Tuscan Calfskin</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('lookbook');
                      }}
                      className="p-3 bg-[#EFECE5] dark:bg-[#1A1C24] text-left hover:border-[#C5A880] border border-transparent rounded transition-all"
                    >
                      <span className="font-serif text-sm block">The Lookbook</span>
                      <span className="text-[10px] text-[#8A857A]">Runway Hotspots</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8A857A] mb-4">
                  <span>FOUND {filteredProducts.length} ATELIER PIECES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex gap-4 p-3 bg-[#EFECE5]/60 dark:bg-[#1A1C24]/60 hover:bg-[#EFECE5] dark:hover:bg-[#1A1C24] rounded border border-transparent hover:border-[#C5A880] cursor-pointer transition-all"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9.5px] font-mono tracking-widest text-[#C5A880] uppercase">
                            {product.origin}
                          </span>
                          <h4 className="text-sm font-serif font-medium line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#7A776F] line-clamp-1">
                            {product.subtitle}
                          </p>
                        </div>
                        <span className="text-xs font-serif font-semibold text-[#121316] dark:text-[#FAF9F6]">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto opacity-70" />
                <h4 className="font-serif text-lg">No exact garment match for "{query}"</h4>
                <p className="text-xs text-[#8A857A] max-w-sm mx-auto">
                  Our private client concierge can source or custom-tailor unique archival requests.
                </p>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-4 inline-block text-xs font-mono uppercase tracking-widest text-[#C5A880] underline underline-offset-4"
                >
                  Browse Full Collection
                </button>
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="p-3 bg-[#EFECE5] dark:bg-[#0E0F13] border-t border-[#E8E4DA] dark:border-[#22242F] text-[11px] font-mono text-[#8A857A] flex items-center justify-between px-6">
            <span>Press ESC to dismiss</span>
            <span>CLOTHYYY.COM Search Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
