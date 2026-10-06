import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CURRENCIES } from '../../data/currencies';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  Edit3,
  Globe,
  ChevronDown,
  ArrowRight,
  Camera,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    currency,
    setCurrency,
    language,
    setLanguage,
    t,
    isRTL,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    setIsAiStylistOpen,
    setIsCmsCustomizerOpen,
    setIsVisualSearchOpen,
    cmsContent
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    cmsContent.announcementText || t.announcement,
    t.announcement2,
    t.announcement3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.newIn, view: 'shop', category: 'all', gender: 'all', hasMega: null },
    { label: t.nav.women, view: 'shop', category: 'women', gender: 'women', hasMega: 'women' },
    { label: t.nav.men, view: 'shop', category: 'men', gender: 'men', hasMega: 'men' },
    { label: t.nav.collections, view: 'shop', category: 'collections', gender: 'all', hasMega: 'collections' },
    { label: t.nav.lookbook, view: 'lookbook', category: 'all', gender: 'all', hasMega: null },
    { label: t.nav.atelier, view: 'about', category: 'all', gender: 'all', hasMega: null },
    { label: t.nav.journal, view: 'journal', category: 'all', gender: 'all', hasMega: null },
    { label: t.nav.stores, view: 'stores', category: 'all', gender: 'all', hasMega: null },
    { label: t.nav.sale, view: 'shop', category: 'all', gender: 'all', hasMega: null, isSale: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#0C0C0E] text-[#E5E2DC] text-[11px] tracking-widest uppercase border-b border-[#23242A] py-2 px-4 md:px-12 flex items-center justify-between transition-colors">
        <div className="hidden lg:flex items-center gap-4 text-[#A8A59E]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
            ATELIER SALONS: KUWAIT • LONDON • PARIS • NYC • TOKYO
          </span>
        </div>

        {/* Center rotating announcements */}
        <div className="flex-1 text-center font-normal tracking-wider px-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={announcementIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-[#F4F3F0] font-medium text-[10.5px] sm:text-[11px]"
            >
              {announcements[announcementIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right utilities */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('polyglot')}
            className="flex items-center gap-1 bg-[#1E1F25] hover:bg-[#C5A880] hover:text-[#0C0C0E] text-[#D8D5CE] px-2.5 py-0.5 rounded text-[10px] tracking-wider transition-all border border-[#34353E]"
            title="Inspect 11-Language Enterprise Architecture"
          >
            <Cpu className="w-3 h-3 text-[#C5A880]" />
            <span className="hidden sm:inline">11 LANGUAGES</span>
          </button>

          <button
            onClick={() => setIsCmsCustomizerOpen(true)}
            className="flex items-center gap-1 bg-[#1E1F25] hover:bg-[#C5A880] hover:text-[#0C0C0E] text-[#D8D5CE] px-2.5 py-0.5 rounded text-[10px] tracking-wider transition-all border border-[#34353E]"
            title="Edit Brand CMS & Visual Elements"
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">EDIT CMS</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative group">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select Currency"
              className="bg-transparent text-[#E5E2DC] hover:text-[#C5A880] text-[11px] font-medium tracking-wider focus:outline-none cursor-pointer pr-3"
            >
              {Object.keys(CURRENCIES).map((curr) => (
                <option key={curr} value={curr} className="bg-[#121316] text-white">
                  {curr} ({CURRENCIES[curr].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          <span className="text-[#3A3B44]">|</span>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 text-[#E5E2DC] hover:text-[#C5A880] text-[11px] font-medium tracking-wider uppercase transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-[#C5A880]" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Main Glass Header */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 dark:bg-[#0C0C0E]/95 backdrop-blur-md shadow-sm border-b border-[#E8E5DF] dark:border-[#202126] py-3.5'
            : 'bg-[#FAF9F6] dark:bg-[#0C0C0E] border-b border-[#EDEAE3] dark:border-[#1E1F24] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-[#121316] dark:text-white hover:text-[#C5A880] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#121316] dark:text-white hover:text-[#C5A880] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Primary Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.slice(0, 5).map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.hasMega)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() =>
                    navigateTo(item.view as any, {
                      category: item.category as any,
                      gender: item.gender as any
                    })
                  }
                  className={`text-[12.5px] tracking-[0.18em] font-medium transition-colors duration-200 py-2 relative ${
                    item.isSale
                      ? 'text-[#BD2727] hover:text-[#8E1C1C]'
                      : 'text-[#1C1D22] dark:text-[#E8E6E1] hover:text-[#C5A880]'
                  }`}
                >
                  {item.label}
                  {item.hasMega && (
                    <ChevronDown className="w-3 h-3 inline-block ml-1 opacity-50" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigateTo('home')}>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-[0.35em] text-[#0E0F12] dark:text-[#FAF9F6] transition-transform group-hover:scale-[1.02] duration-300">
              {cmsContent.brandName || 'CLOTHYYY'}
            </h1>
            <span className="text-[8.5px] tracking-[0.45em] text-[#8C887F] dark:text-[#9E9B93] uppercase mt-0.5 group-hover:text-[#C5A880] transition-colors">
              {cmsContent.brandTagline || 'HAUTE COUTURE • ATELIER'}
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden xl:flex items-center gap-6">
              {navItems.slice(5).map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    navigateTo(item.view as any, {
                      category: item.category as any,
                      gender: item.gender as any
                    })
                  }
                  className={`text-[12.5px] tracking-[0.18em] font-medium transition-colors duration-200 py-2 ${
                    item.isSale
                      ? 'text-[#BD2727] font-semibold hover:text-[#8E1C1C]'
                      : 'text-[#1C1D22] dark:text-[#E8E6E1] hover:text-[#C5A880]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <span className="hidden xl:inline text-[#D8D4CA] dark:text-[#2E303A]">|</span>

            {/* AI Stylist */}
            <button
              onClick={() => setIsAiStylistOpen(true)}
              className="hidden md:flex items-center gap-1.5 bg-[#F0ECE4] dark:bg-[#1A1B22] hover:bg-[#C5A880] hover:text-[#0C0C0E] text-[#121316] dark:text-[#EAE7DF] px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 border border-[#DDD8CE] dark:border-[#2D2E37]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-[#0C0C0E]" />
              <span className="text-[11px] uppercase tracking-widest">AI STYLIST</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center text-[#1C1D22] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-colors p-1"
              aria-label="Search garments"
              title="Search (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Visual Search */}
            <button
              onClick={() => setIsVisualSearchOpen(true)}
              className="hidden sm:flex items-center text-[#1C1D22] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-colors p-1"
              aria-label="Visual Search by Image"
              title="Visual Search (Upload Runway Photo)"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex items-center text-[#1C1D22] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-colors p-1 relative"
              aria-label="Client Account"
              title="Atelier VIP Client Suite"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="flex items-center text-[#1C1D22] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-colors p-1 relative"
              aria-label="Wishlist"
              title="Saved Pieces"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#C5A880] text-[#0C0C0E] text-[9.5px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center text-[#1C1D22] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-colors p-1 relative"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#121316] text-white dark:bg-[#C5A880] dark:text-[#0C0C0E] text-[9.5px] font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute left-0 right-0 top-full bg-[#FAF9F6] dark:bg-[#0E0F13] border-b border-[#E6E2D8] dark:border-[#22232B] shadow-2xl py-8 px-4 z-50 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                {/* Column 1 */}
                <div className="col-span-3 border-r border-[#ECE8DE] dark:border-[#1E2028] pr-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8A857A] mb-4">
                    GARMENT CATEGORIES
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: activeMegaMenu as any, gender: activeMegaMenu as any });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors font-medium"
                      >
                        All {activeMegaMenu === 'women' ? "Women's" : activeMegaMenu === 'men' ? "Men's" : 'Collection'} Pieces
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: activeMegaMenu as any });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        Double-Faced Cashmere Outerwear
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: activeMegaMenu as any });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        Architectural Tailored Blazers & Trousers
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: activeMegaMenu as any });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        40mm Mulberry Silk Crepe Gowns & Tops
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: activeMegaMenu as any });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        Japanese Selvedge & Wool Chinos
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="col-span-3 border-r border-[#ECE8DE] dark:border-[#1E2028] pr-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8A857A] mb-4">
                    LEATHER & ACCESSORIES
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: 'accessories' });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        Tuscan Calfskin Structured Bags
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: 'accessories' });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        Hand-Welted Boots & Sculpted Mules
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('shop', { category: 'accessories' });
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors text-[#5C5E6B] dark:text-[#A7A9B7]"
                      >
                        18mm Screen-Printed Silk Twill Scarves
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigateTo('lookbook');
                          setActiveMegaMenu(null);
                        }}
                        className="hover:text-[#C5A880] transition-colors font-medium flex items-center gap-1.5 text-[#C5A880] mt-4"
                      >
                        Shop The Runway Lookbook <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3 & 4 */}
                <div className="col-span-6 grid grid-cols-2 gap-4">
                  <div
                    onClick={() => {
                      navigateTo('shop', { category: 'couture' });
                      setActiveMegaMenu(null);
                    }}
                    className="group relative h-48 rounded overflow-hidden cursor-pointer bg-[#15161C]"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
                      alt="Runway Capsule"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                        ATELIER EXCLUSIVE
                      </span>
                      <h5 className="text-white font-serif text-lg font-medium">
                        Autumn / Winter '26 Runway
                      </h5>
                      <span className="text-xs text-white/80 mt-1 underline underline-offset-4 flex items-center gap-1">
                        Explore Collection <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo('journal');
                      setActiveMegaMenu(null);
                    }}
                    className="group relative h-48 rounded overflow-hidden cursor-pointer bg-[#15161C]"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                      alt="Atelier Craft"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                        THE JOURNAL
                      </span>
                      <h5 className="text-white font-serif text-lg font-medium">
                        Deconstructing Double-Faced Cashmere
                      </h5>
                      <span className="text-xs text-white/80 mt-1 underline underline-offset-4 flex items-center gap-1">
                        Read Atelier Article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-0 bottom-0 ${
                isRTL ? 'right-0' : 'left-0'
              } w-full max-w-sm bg-[#FAF9F6] dark:bg-[#0F1014] text-[#121316] dark:text-[#F3F2EE] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto`}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DA] dark:border-[#22242D]">
                  <div className="flex flex-col">
                    <span className="text-xl font-display font-bold tracking-[0.25em]">
                      {cmsContent.brandName || 'CLOTHYYY'}
                    </span>
                    <span className="text-[9px] tracking-[0.3em] text-[#8C877D]">
                      HAUTE COUTURE
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#6D6F7B] hover:text-black dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 my-5">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAiStylistOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-[#121316] text-[#FAF9F6] py-2.5 px-3 rounded text-xs tracking-wider"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>AI STYLIST</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsVisualSearchOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-[#EAE6DD] dark:bg-[#1E2028] py-2.5 px-3 rounded text-xs tracking-wider"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>PHOTO SEARCH</span>
                  </button>
                </div>

                <nav className="space-y-4 text-base font-medium tracking-wider mt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        navigateTo(item.view as any, {
                          category: item.category as any,
                          gender: item.gender as any
                        });
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left py-2 border-b border-[#EFECE5] dark:border-[#1E2028] transition-colors ${
                        item.isSale
                          ? 'text-[#BD2727] font-semibold'
                          : 'hover:text-[#C5A880]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#E8E4DA] dark:border-[#22242D] space-y-4 text-sm">
                <button
                  onClick={() => {
                    navigateTo('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full text-left hover:text-[#C5A880]"
                >
                  <User className="w-4 h-4" />
                  <span>Atelier VIP Client Suite</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('help');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full text-left text-xs text-[#7A7C88]"
                >
                  Client Concierge & 24/7 Support
                </button>

                <div className="flex items-center justify-between pt-2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    aria-label="Select Currency"
                    className="bg-[#EAE6DD] dark:bg-[#1C1E26] text-xs py-1.5 px-3 rounded font-mono"
                  >
                    {Object.keys(CURRENCIES).map((curr) => (
                      <option key={curr} value={curr}>
                        {curr} ({CURRENCIES[curr].symbol.trim()})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setLanguage(language === 'en' ? 'ar' : 'en');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold py-1.5 px-3 bg-[#EAE6DD] dark:bg-[#1C1E26] rounded"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{language === 'en' ? 'العربية' : 'English'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
