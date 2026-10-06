import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setSizeGuideModalOpen
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentColor = selectedColor || quickViewProduct.swatches[0]?.name || 'Standard';
  const currentSize = selectedSize || quickViewProduct.sizes[0]?.size || 'Standard';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product', { productId: id });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FAF9F6] dark:bg-[#121318] text-[#121316] dark:text-[#FAF9F6] w-full max-w-4xl rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-2xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-[#8A857A] hover:text-black dark:hover:text-white bg-[#FAF9F6]/80 dark:bg-[#121318]/80 backdrop-blur-sm rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="bg-[#ECE8E1] dark:bg-[#16171E] p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded overflow-hidden">
              <img
                src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 bg-[#0C0C0E]/90 text-[#C5A880] text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIdx === idx ? 'border-[#C5A880]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                  {quickViewProduct.origin} • {quickViewProduct.composition.split('(')[0]}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-medium mt-1">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs text-[#7A7870] font-light mt-1">
                  {quickViewProduct.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 py-2 border-y border-[#EAE6DD] dark:border-[#1E2028]">
                <span className="text-xl font-serif font-semibold">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-[#9A978E] line-through font-light">
                    {formatPrice(quickViewProduct.compareAtPrice)}
                  </span>
                )}
                <span className="text-[10px] font-mono bg-[#1B6B4A]/10 text-[#1B6B4A] dark:text-[#4ADE80] px-2 py-0.5 rounded">
                  Duties Included
                </span>
              </div>

              {/* Color Swatches */}
              {quickViewProduct.swatches.length > 0 && (
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider block mb-2 text-[#7A7870]">
                    Color: <span className="text-black dark:text-white font-medium">{currentColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {quickViewProduct.swatches.map((swatch) => (
                      <button
                        key={swatch.name}
                        onClick={() => setSelectedColor(swatch.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          currentColor === swatch.name
                            ? 'ring-2 ring-[#C5A880] scale-110 border-white'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#7A7870]">
                    Select Size
                  </label>
                  <button
                    onClick={() => setSizeGuideModalOpen(true)}
                    className="text-xs text-[#C5A880] hover:underline font-mono"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={s.stock === 0}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 text-xs font-mono border rounded-sm transition-all ${
                        currentSize === s.size
                          ? 'border-[#C5A880] bg-[#C5A880] text-black font-semibold'
                          : s.stock === 0
                          ? 'border-[#DDD8CE] dark:border-[#22242D] text-[#A09D94] line-through cursor-not-allowed'
                          : 'border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880]'
                      }`}
                    >
                      {s.size.split('/')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs text-[#6F717E] dark:text-[#A8AAB8] font-light leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Actions Bottom */}
            <div className="pt-6 border-t border-[#EAE6DD] dark:border-[#1E2028] mt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-3 px-6 rounded-sm text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO SHOPPING BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="p-3 border border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#BD2727] rounded-sm transition-colors text-[#121316] dark:text-white"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#BD2727] text-[#BD2727]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullPage}
                className="w-full text-center text-xs font-mono uppercase tracking-widest text-[#8A857A] hover:text-[#C5A880] flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Atelier Garment Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
