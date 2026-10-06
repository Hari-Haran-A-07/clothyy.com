import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { LOOKBOOKS } from '../data/lookbooks';
import { JOURNAL_ARTICLES } from '../data/journal';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  ShoppingBag,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HomeView: React.FC = () => {
  const {
    navigateTo,
    formatPrice,
    addToCart,
    t,
    cmsContent,
    setIsAiStylistOpen,
    setIsVisualSearchOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'outerwear' | 'knitwear' | 'tailoring' | 'accessories'>('all');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const heroCollection = COLLECTIONS[0];
  const activeLookbook = LOOKBOOKS[0];

  const filteredBestsellers = PRODUCTS.filter((p: Product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'outerwear') return p.subcategory === 'outerwear';
    if (activeTab === 'knitwear') return p.subcategory === 'knitwear';
    if (activeTab === 'tailoring') return p.subcategory === 'tailoring' || p.subcategory === 'trousers';
    if (activeTab === 'accessories') return p.category === 'accessories';
    return true;
  }).slice(0, 8);

  const newInProducts = PRODUCTS.filter((p: Product) => p.isNewIn || p.isRunway).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0C0C0E]">
        {/* Background Image with Ken Burns Zoom */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="CLOTHYYY Runway Editorial"
            className="w-full h-full object-cover object-top opacity-70 scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E]/70 via-transparent to-[#0C0C0E]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-mono tracking-widest text-[#C5A880] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-[0.18em] leading-tight text-balance">
              {cmsContent.heroHeadline || t.hero.headline}
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base font-light text-[#E0DDD5] tracking-wide leading-relaxed text-balance">
              {cmsContent.heroSubheadline || t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('shop', { category: 'all' })}
                className="w-full sm:w-auto bg-[#FAF9F6] text-[#0C0C0E] hover:bg-[#C5A880] hover:text-black px-8 py-4 text-xs font-mono uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t.hero.shopCollection}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('lookbook')}
                className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-4 text-xs font-mono uppercase tracking-widest font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>{t.hero.exploreRunway}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating City Attribution */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6 text-[11px] font-mono tracking-widest text-[#A8A59E] uppercase">
          <span>FLORENCE</span>
          <span>•</span>
          <span>PARIS</span>
          <span>•</span>
          <span>KUWAIT CITY</span>
          <span>•</span>
          <span>TOKYO</span>
        </div>
      </section>

      {/* 2. Brand Ethos Marquee Ticker */}
      <div className="w-full bg-[#121316] text-[#E5E2DC] py-4 border-y border-[#202128] overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee uppercase text-xs font-mono tracking-[0.25em]">
          <span className="mx-8">{t.marquee.craft}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.silk}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.tailoring}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.worldwide}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.sustainability}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.craft}</span>
          <span className="text-[#C5A880]">✦</span>
          <span className="mx-8">{t.marquee.silk}</span>
          <span className="text-[#C5A880]">✦</span>
        </div>
      </div>

      {/* 3. Curated Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E4DA] dark:border-[#22242D]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              DEPARTMENTS & ARCHIVES
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium mt-1">
              {t.categories.title}
            </h2>
          </div>
          <p className="text-xs text-[#7A7870] max-w-md mt-2 md:mt-0 font-light">
            {t.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Women's Tailoring */}
          <div
            onClick={() => navigateTo('shop', { category: 'women', gender: 'women' })}
            className="group relative md:col-span-7 h-[460px] rounded-sm overflow-hidden cursor-pointer bg-[#14151B]"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
              alt="Women's Architectural Tailoring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end">
              <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                ATELIER EDIT
              </span>
              <h3 className="text-white text-2xl sm:text-3xl font-serif font-medium mt-1">
                {t.categories.womenTailoring}
              </h3>
              <p className="text-xs text-[#D5D2C8] mt-2 font-light max-w-md">
                Double-faced cashmere coats, fluid palazzo trousers, and 40mm silk crepe gowns.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.categories.discoverMore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Men's Outerwear */}
          <div
            onClick={() => navigateTo('shop', { category: 'men', gender: 'men' })}
            className="group relative md:col-span-5 h-[460px] rounded-sm overflow-hidden cursor-pointer bg-[#14151B]"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
              alt="Men's Outerwear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end">
              <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                SARTORIAL ATELIER
              </span>
              <h3 className="text-white text-2xl font-serif font-medium mt-1">
                {t.categories.menOuterwear}
              </h3>
              <p className="text-xs text-[#D5D2C8] mt-2 font-light">
                Super 150s floating canvas coats and Scottish 4-ply cashmere sweaters.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.categories.discoverMore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Tuscan Leathergoods */}
          <div
            onClick={() => navigateTo('shop', { category: 'accessories' })}
            className="group relative md:col-span-4 h-[380px] rounded-sm overflow-hidden cursor-pointer bg-[#14151B]"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85"
              alt="Tuscan Leathergoods"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                TUSCAN ARTISANS
              </span>
              <h3 className="text-white text-xl font-serif font-medium mt-1">
                {t.categories.italianLeather}
              </h3>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Card 4: Haute Couture Eveningwear */}
          <div
            onClick={() => navigateTo('shop', { category: 'couture' })}
            className="group relative md:col-span-8 h-[380px] rounded-sm overflow-hidden cursor-pointer bg-[#14151B]"
          >
            <img
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85"
              alt="Haute Couture Eveningwear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                NUMBERED EDITIONS
              </span>
              <h3 className="text-white text-2xl font-serif font-medium mt-1">
                {t.categories.eveningCouture}
              </h3>
              <p className="text-xs text-[#D5D2C8] mt-1 font-light">
                Hand-pleated Japanese silk gazar and bias-cut architectural silhouettes.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                <span>View Capsule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Runway Drops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8E4DA] dark:border-[#22242D]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              AUTUMN / WINTER '26
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-1">
              {t.newArrivals.title}
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs font-mono uppercase tracking-widest text-[#121316] dark:text-[#FAF9F6] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
          >
            <span>{t.newArrivals.viewAllNew}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newInProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Interactive Hotspot Editorial Lookbook */}
      <section className="bg-[#121316] text-white py-20 border-y border-[#23242E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              {t.lookbookSection.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium">
              {t.lookbookSection.title}
            </h2>
            <p className="text-xs text-[#9DA0AE] font-light">
              {t.lookbookSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Hotspot Canvas */}
            <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] rounded-sm overflow-hidden bg-[#181920]">
              <img
                src={activeLookbook.image}
                alt={activeLookbook.title}
                className="w-full h-full object-cover"
              />

              {/* Floating Hotspots */}
              {activeLookbook.hotspots.map((hs: any) => (
                <div
                  key={hs.id}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  onMouseEnter={() => setActiveHotspot(hs.id)}
                  onClick={() => setActiveHotspot(hs.id)}
                >
                  <div className="w-6 h-6 rounded-full bg-[#FAF9F6]/90 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-xl border border-black/20 animate-pulse-subtle group-hover:scale-125 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#0C0C0E]" />
                  </div>

                  {/* Tooltip Card */}
                  {activeHotspot === hs.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-[#FAF9F6] text-[#0C0C0E] p-3 rounded-sm shadow-2xl z-30 pointer-events-auto"
                    >
                      <div className="flex gap-2.5">
                        <img
                          src={hs.image}
                          alt={hs.title}
                          className="w-12 h-14 object-cover rounded flex-shrink-0"
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
                            className="mt-1 text-[10px] font-mono uppercase tracking-wider text-black underline flex items-center gap-1 hover:text-[#C5A880]"
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
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest block">
                  {activeLookbook.season} • {activeLookbook.location}
                </span>
                <h3 className="text-2xl font-serif font-medium mt-1 text-white">
                  {activeLookbook.title}
                </h3>
                <p className="text-xs text-[#9DA0AE] mt-2 font-light leading-relaxed">
                  {activeLookbook.description}
                </p>
              </div>

              {/* Items in look */}
              <div className="space-y-3 pt-4 border-t border-[#262832]">
                <span className="text-xs font-mono text-[#D8D5CE] uppercase tracking-wider block">
                  GARMENTS IN THIS ENSEMBLE:
                </span>
                <div className="space-y-2">
                  {activeLookbook.hotspots.map((hs: any) => (
                    <div
                      key={hs.id}
                      onClick={() => navigateTo('product', { productId: hs.productId })}
                      className="flex items-center justify-between p-3 bg-[#1A1C24] hover:bg-[#232530] border border-[#2B2D3A] rounded cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={hs.image}
                          alt={hs.title}
                          className="w-10 h-12 object-cover rounded"
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

              <button
                onClick={() => navigateTo('lookbook')}
                className="w-full bg-[#FAF9F6] text-[#0C0C0E] hover:bg-[#C5A880] py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
              >
                {t.lookbookSection.exploreLookbook}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Bestsellers with Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#E8E4DA] dark:border-[#22242D]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              CORE REPERTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-1">
              THE ATELIER ICONS
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {[
              { id: 'all', label: 'All Icons' },
              { id: 'outerwear', label: 'Cashmere Outerwear' },
              { id: 'tailoring', label: 'Bespoke Tailoring' },
              { id: 'knitwear', label: 'Merino & Knitwear' },
              { id: 'accessories', label: 'Tuscan Leather' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold shadow'
                    : 'bg-[#EFECE5] dark:bg-[#1A1C24] text-[#6C6E7C] hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBestsellers.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Craftsmanship Manifesto */}
      <section className="bg-[#FAF9F6] dark:bg-[#0E0F14] py-20 border-y border-[#E8E4DA] dark:border-[#20222B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              {t.craftsmanship.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-balance">
              {t.craftsmanship.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6A6C7B] dark:text-[#A4A7B8] font-light leading-relaxed">
              {cmsContent.sustainabilityStatement || t.craftsmanship.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E2DDD3] dark:border-[#22242F]">
              <div>
                <span className="text-2xl font-serif font-semibold text-[#121316] dark:text-[#FAF9F6] block">
                  {t.craftsmanship.stat1Value}
                </span>
                <span className="text-[10px] font-mono text-[#8A857A] uppercase">
                  {t.craftsmanship.stat1Label}
                </span>
              </div>
              <div>
                <span className="text-2xl font-serif font-semibold text-[#121316] dark:text-[#FAF9F6] block">
                  {t.craftsmanship.stat2Value}
                </span>
                <span className="text-[10px] font-mono text-[#8A857A] uppercase">
                  {t.craftsmanship.stat2Label}
                </span>
              </div>
              <div>
                <span className="text-2xl font-serif font-semibold text-[#121316] dark:text-[#FAF9F6] block">
                  {t.craftsmanship.stat3Value}
                </span>
                <span className="text-[10px] font-mono text-[#8A857A] uppercase">
                  {t.craftsmanship.stat3Label}
                </span>
              </div>
              <div>
                <span className="text-2xl font-serif font-semibold text-[#C5A880] block">
                  {t.craftsmanship.stat4Value}
                </span>
                <span className="text-[10px] font-mono text-[#8A857A] uppercase">
                  {t.craftsmanship.stat4Label}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('about')}
              className="inline-flex items-center gap-2 bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
            >
              <span>{t.craftsmanship.button}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85"
                alt="Atelier Tailoring"
                className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg"
              />
              <div className="p-4 bg-[#EFECE5] dark:bg-[#181922] rounded-sm text-xs text-[#7A7870]">
                <span className="font-mono text-[#C5A880] uppercase block mb-1">
                  FLORENCE ATELIER
                </span>
                Hand-split double faced cashmere construction.
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-[#EFECE5] dark:bg-[#181922] rounded-sm text-xs text-[#7A7870]">
                <span className="font-mono text-[#C5A880] uppercase block mb-1">
                  OKAYAMA SHUTTLE WEAVE
                </span>
                1950s low-tension vintage selvedge mechanics.
              </div>
              <img
                src="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=85"
                alt="Japanese Selvedge Loom"
                className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. VIP Private Styling Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-[#0C0C0E] text-white p-8 sm:p-14 border border-[#23242E] shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              BESPOKE CLIENT CONCIERGE
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-medium leading-snug">
              Book a Private Styling Appointment at Our Flagship Salons
            </h3>
            <p className="text-xs text-[#9DA0AE] font-light leading-relaxed">
              Experience one-on-one master tailoring, archival fabric swatches, and bespoke evening fittings in Kuwait City, London Mayfair, or Paris Place Vendôme.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('contact')}
                className="bg-[#C5A880] text-[#0C0C0E] hover:bg-[#DFC8A8] px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
              >
                Schedule Private Fitting
              </button>
              <button
                onClick={() => setIsAiStylistOpen(true)}
                className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span>Consult AI Stylist</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-50 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=85"
              alt="Salon Suite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E] via-[#0C0C0E]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* 9. Editorial Journal Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8E4DA] dark:border-[#22242D]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              ATELIER ESSAYS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-1">
              THE JOURNAL
            </h2>
          </div>
          <button
            onClick={() => navigateTo('journal')}
            className="text-xs font-mono uppercase tracking-widest text-[#121316] dark:text-[#FAF9F6] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All Essays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article: any) => (
            <div
              key={article.id}
              onClick={() => navigateTo('journal-article', { articleId: article.id })}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-[#ECE8E1] dark:bg-[#181A22] mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#8A857A] uppercase mb-1">
                  <span className="text-[#C5A880]">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-medium group-hover:text-[#C5A880] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-[#7A7870] font-light mt-1.5 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                Read Essay <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
