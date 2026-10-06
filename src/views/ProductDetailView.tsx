import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';
import {
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Ruler,
  Star,
  RotateCw
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setSizeGuideModalOpen,
    addToast,
    t
  } = useStore();

  const product = PRODUCTS.find((p: Product) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.swatches[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [is360Mode, setIs360Mode] = useState(false);

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    composition: true,
    sustainability: false,
    shipping: false,
    certificate: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const isOutOfStock = currentSizeObj?.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      addToast('This size is currently sold out. You have joined the atelier waitlist.', 'info');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast(t.product.linkCopied, 'success');
  };

  const completeTheLookItems = PRODUCTS.filter((p: Product) =>
    product.completeTheLookIds?.includes(p.id)
  );

  const handleAddLookBundle = () => {
    completeTheLookItems.forEach((item: Product) => {
      addToCart(item, item.sizes[0]?.size || 'Standard', item.swatches[0]?.name || 'Standard', 1);
    });
    addToast('All coordinating atelier garments added to your shopping bag.', 'success');
  };

  const handleRotate360 = (direction: 'left' | 'right') => {
    const step = direction === 'left' ? -1 : 1;
    setActiveImageIdx((prev) => {
      const total = product.images.length;
      return (prev + step + total) % total;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[#8A857A]">
        <button onClick={() => navigateTo('home')} className="hover:text-black dark:hover:text-white">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="hover:text-black dark:hover:text-white uppercase"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-black dark:text-white truncate font-medium">
          {product.name}
        </span>
      </nav>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#ECE8E1] dark:bg-[#15171F] group">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="bg-[#0C0C0E]/90 text-[#C5A880] text-[10.5px] font-mono tracking-widest px-3 py-1 uppercase border border-[#2B2C35]">
                  {product.badge}
                </span>
              )}
              {is360Mode && (
                <span className="bg-[#C5A880] text-black text-[10px] font-mono tracking-widest px-2.5 py-0.5 uppercase font-bold">
                  360° SPIN VIEW
                </span>
              )}
            </div>

            {is360Mode && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                <button
                  onClick={() => handleRotate360('left')}
                  className="p-1 hover:text-[#C5A880] transition-colors"
                  aria-label="Rotate left"
                >
                  <RotateCw className="w-4 h-4 transform -scale-x-100" />
                </button>
                <span className="text-xs font-mono text-white tracking-widest">
                  ANGLE {activeImageIdx + 1} / {product.images.length}
                </span>
                <button
                  onClick={() => handleRotate360('right')}
                  className="p-1 hover:text-[#C5A880] transition-colors"
                  aria-label="Rotate right"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIs360Mode(!is360Mode)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF9F6]/90 dark:bg-[#0C0C0E]/90 text-black dark:text-white hover:text-[#C5A880] backdrop-blur-sm shadow-md transition-colors"
              title="Toggle 360 Rotation View"
            >
              <RotateCw className={`w-4 h-4 ${is360Mode ? 'text-[#C5A880]' : ''}`} />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIdx(idx);
                  setIs360Mode(false);
                }}
                className={`w-20 h-24 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIdx === idx && !is360Mode
                    ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pb-4 border-b border-[#E8E4DA] dark:border-[#22242D]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest uppercase text-[#C5A880]">
                {product.origin} • {product.sku}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#8A857A]">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>({product.reviewsCount})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#121316] dark:text-[#FAF9F6]">
              {product.name}
            </h1>
            <p className="text-xs text-[#7A7870] font-light">
              {product.subtitle}
            </p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl font-serif font-semibold text-[#121316] dark:text-[#FAF9F6]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#8A857A] line-through font-light">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-[10px] font-mono uppercase bg-[#1B6B4A]/10 text-[#1B6B4A] dark:text-[#4ADE80] px-2 py-0.5 rounded">
                DDP Duties Included
              </span>
            </div>

            <div className="p-3 bg-[#EFECE5] dark:bg-[#181920] rounded text-xs flex items-center justify-between font-mono text-[#5C5E6D] dark:text-[#A8ABB9]">
              <span>Or 4 interest-free payments of <strong>{formatPrice(product.price / 4)}</strong></span>
              <span className="font-bold text-[#C5A880]">Tamara / Tabby</span>
            </div>
          </div>

          {/* Color Selector */}
          {product.swatches && product.swatches.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#7A7870] block">
                Color: <span className="text-black dark:text-white font-medium">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.swatches.map((swatch: any) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                      selectedColor === swatch.name
                        ? 'border-[#C5A880] bg-[#C5A880]/15 font-semibold'
                        : 'border-[#DDD8CE] dark:border-[#2C2E38]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span>{swatch.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-[#7A7870]">
                Select Atelier Size
              </label>
              <button
                onClick={() => setSizeGuideModalOpen(true)}
                className="text-xs text-[#C5A880] hover:underline font-mono flex items-center gap-1"
              >
                <Ruler className="w-3 h-3" />
                <span>Size Guide & Fit Advisor</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s: any) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-3 px-2 text-center text-xs font-mono border rounded-sm transition-all ${
                    selectedSize === s.size
                      ? 'border-[#C5A880] bg-[#C5A880] text-black font-bold shadow'
                      : s.stock === 0
                      ? 'border-[#DDD8CE] dark:border-[#20222A] text-[#9A988E] line-through cursor-not-allowed bg-[#EFECE5]/40 dark:bg-[#121316]'
                      : 'border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880]'
                  }`}
                >
                  <span className="block font-medium">{s.size.split('/')[0]}</span>
                  <span className="text-[9px] opacity-75">
                    {s.stock === 0 ? 'Sold Out' : s.stock <= 2 ? `Only ${s.stock} left` : 'In Stock'}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#8A857A] italic mt-1">
              {product.fitNotes} {product.modelSpecs}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-[#E8E4DA] dark:border-[#22242D]">
            <div className="flex gap-3">
              <div className="flex items-center border border-[#DDD8CE] dark:border-[#2C2E38] rounded-sm text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-[#EFECE5] dark:hover:bg-[#1C1E26]"
                >
                  -
                </button>
                <span className="px-3 font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-[#EFECE5] dark:hover:bg-[#1C1E26]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-4 px-6 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? t.product.outOfStock : t.product.addToBag}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#BD2727] rounded-sm transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#BD2727] text-[#BD2727]' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-4 border border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880] rounded-sm transition-colors"
                aria-label="Share Garment"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-[#FAF9F6] dark:bg-[#1E2028] hover:bg-[#EFECE5] dark:hover:bg-[#252834] text-[#121316] dark:text-white py-3 rounded-sm text-xs font-mono uppercase tracking-widest transition-colors border border-[#DDD8CE] dark:border-[#2E313E]"
            >
              {t.product.buyNow} (APPLE PAY / KNET)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#E8E4DA] dark:border-[#22242D] text-xs font-light text-[#7A7870]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              <span>Complimentary Insured Dispatch (24-48h)</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#C5A880]" />
              <span>30-Day White-Glove Returns</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="divide-y divide-[#E8E4DA] dark:divide-[#22242D] text-xs">
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full flex items-center justify-between text-left font-mono uppercase tracking-wider py-1"
              >
                <span>{t.product.details}</span>
                {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.details && (
                <div className="pt-2 text-[#5E6070] dark:text-[#A8AAB9] space-y-2 font-light leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 pt-1">
                    {product.details.map((d: string, i: number) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="py-3">
              <button
                onClick={() => toggleAccordion('composition')}
                className="w-full flex items-center justify-between text-left font-mono uppercase tracking-wider py-1"
              >
                <span>{t.product.compositionCare}</span>
                {openAccordions.composition ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.composition && (
                <div className="pt-2 text-[#5E6070] dark:text-[#A8AAB9] space-y-2 font-light leading-relaxed">
                  <p><strong>Composition:</strong> {product.composition}</p>
                  <p><strong>Artisanal Origin:</strong> {product.origin}</p>
                  <div className="pt-1">
                    <strong>Care Guidelines:</strong>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      {product.care.map((c: string, i: number) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="py-3">
              <button
                onClick={() => toggleAccordion('sustainability')}
                className="w-full flex items-center justify-between text-left font-mono uppercase tracking-wider py-1"
              >
                <span>{t.product.sustainability}</span>
                {openAccordions.sustainability ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.sustainability && (
                <div className="pt-2 text-[#5E6070] dark:text-[#A8AAB9] space-y-2 font-light leading-relaxed">
                  <p>{product.sustainability.materials}</p>
                  <p><strong>Certifications:</strong> {product.sustainability.certifications.join(', ')}</p>
                  <p><strong>Traceability:</strong> {product.sustainability.traceability}</p>
                  <p><strong>Carbon Offset:</strong> {product.sustainability.carbonOffset}</p>
                </div>
              )}
            </div>

            <div className="py-3">
              <button
                onClick={() => toggleAccordion('certificate')}
                className="w-full flex items-center justify-between text-left font-mono uppercase tracking-wider py-1"
              >
                <span>{t.product.certificate}</span>
                {openAccordions.certificate ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.certificate && (
                <div className="pt-2 text-[#5E6070] dark:text-[#A8AAB9] space-y-2 font-light leading-relaxed">
                  <p>
                    Every CLOTHYYY piece is authenticated by an encrypted NFC microchip embedded in the atelier label.
                  </p>
                  <p>
                    Accompanied by a physical serialized parchment signed by the master tailor in residence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete The Look */}
      {completeTheLookItems.length > 0 && (
        <section className="p-8 sm:p-12 bg-[#EFECE5]/60 dark:bg-[#13141A] rounded-sm border border-[#E3DFD5] dark:border-[#22242D]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#DDD8CE] dark:border-[#262832]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                STYLED BY CLOTHYYY ATELIER
              </span>
              <h3 className="text-2xl font-serif font-medium mt-1">
                {t.product.completeTheLook}
              </h3>
            </div>
            <button
              onClick={handleAddLookBundle}
              className="mt-3 sm:mt-0 inline-flex items-center gap-2 bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider hover:bg-[#C5A880] transition-colors"
            >
              <span>Add Entire Look to Bag</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeTheLookItems.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Client Reviews */}
      <section className="pt-8 border-t border-[#E8E4DA] dark:border-[#22242D]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] dark:border-[#22242D]">
            <div>
              <h3 className="text-2xl font-serif font-medium">
                {t.product.reviews}
              </h3>
              <p className="text-xs text-[#8A857A]">
                Average rating {product.rating} out of 5 based on verified client deliveries
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev: any) => (
                <div
                  key={rev.id}
                  className="p-5 bg-[#FAF9F6] dark:bg-[#121318] rounded border border-[#E3DFD5] dark:border-[#22242D] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9.5px] font-mono bg-[#1B6B4A]/15 text-[#1B6B4A] dark:text-[#4ADE80] px-2 py-0.5 rounded">
                          Verified Client
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8A857A] font-mono">{rev.date}</span>
                  </div>

                  <div className="flex text-[#C5A880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h5 className="font-serif text-sm font-medium">{rev.title}</h5>
                  <p className="text-xs text-[#6A6C7B] dark:text-[#A4A7B8] font-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8A857A] italic">
                Be the first client to submit a verified atelier evaluation for this piece.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Add-To-Bag Ribbon */}
      <div className="fixed bottom-0 inset-x-0 bg-[#FAF9F6]/95 dark:bg-[#0C0C0E]/95 backdrop-blur-md p-4 border-t border-[#E8E4DA] dark:border-[#22242D] z-30 lg:hidden flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-serif font-semibold block truncate max-w-[150px]">
            {product.name}
          </span>
          <span className="text-xs font-serif font-bold text-[#C5A880]">
            {formatPrice(product.price)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#121316] text-white hover:bg-[#C5A880] hover:text-black py-3 px-4 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
        >
          {t.product.addToBag}
        </button>
      </div>
    </div>
  );
};
