import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const {
    navigateTo,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.swatches[0]?.name || 'Standard');
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAdding, setIsQuickAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setIsQuickAdding(false);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  if (layout === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative bg-[#FAF9F6] dark:bg-[#121318] border border-[#EBE8E0] dark:border-[#22242D] rounded-sm p-4 flex flex-col md:flex-row gap-6 cursor-pointer hover:border-[#C5A880] transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-56 aspect-[3/4] overflow-hidden bg-[#ECE8E1] dark:bg-[#1A1B22] rounded-sm flex-shrink-0">
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover img-editorial-zoom"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-[#0C0C0E] text-[#C5A880] text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#8A857A]">
                {product.origin}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="p-1.5 text-[#121316] dark:text-[#E8E6E0] hover:text-[#C5A880] transition-colors"
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#BD2727] text-[#BD2727]' : ''}`} />
              </button>
            </div>

            <h3 className="text-lg font-serif font-medium text-[#121316] dark:text-[#FAF9F6] mt-1 group-hover:text-[#C5A880] transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-[#707280] mt-1 line-clamp-2 font-light">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-base font-serif font-semibold text-[#121316] dark:text-[#FAF9F6]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#8A857A] line-through font-light">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#EFECE5] dark:border-[#1E2028] mt-4">
            <span className="text-xs text-[#8A857A] mr-2">Quick Add Size:</span>
            {product.sizes.map((s) => (
              <button
                key={s.size}
                disabled={s.stock === 0}
                onClick={(e) => handleQuickAdd(s.size, e)}
                className={`px-2.5 py-1 text-xs border rounded-sm transition-all ${
                  s.stock === 0
                    ? 'border-[#E0DDD5] text-[#AFAEA8] cursor-not-allowed line-through'
                    : 'border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black'
                }`}
              >
                {s.size.split('/')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsQuickAdding(false);
      }}
      onClick={handleCardClick}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8E1] dark:bg-[#16171E] rounded-sm">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover img-editorial-zoom"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="bg-[#0C0C0E]/90 backdrop-blur-sm text-[#C5A880] text-[9.5px] font-mono tracking-widest px-2.5 py-0.5 uppercase border border-[#2B2C35]">
              {product.badge}
            </span>
          ) : (
            <span></span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-[#FAF9F6]/80 dark:bg-[#0C0C0E]/80 backdrop-blur-sm text-[#121316] dark:text-white hover:text-[#BD2727] transition-transform active:scale-90"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist ? 'fill-[#BD2727] text-[#BD2727]' : ''
              }`}
            />
          </button>
        </div>

        {/* Quick View Trigger on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className={`absolute bottom-3 left-3 right-3 bg-[#FAF9F6]/90 dark:bg-[#0C0C0E]/90 backdrop-blur-md text-[#121316] dark:text-[#FAF9F6] hover:bg-[#C5A880] hover:text-[#0C0C0E] py-2 px-3 text-xs tracking-widest font-mono uppercase flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md ${
            isHovered && !isQuickAdding
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>QUICK VIEW</span>
        </button>

        {/* Quick Add Overlay on Hover */}
        {isQuickAdding && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-[#0C0C0E]/95 backdrop-blur-md p-3 text-white transition-all"
          >
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#A0A2B0] mb-2">
              <span>Select Size</span>
              <button
                onClick={() => setIsQuickAdding(false)}
                className="text-white hover:text-[#C5A880]"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`py-1.5 text-[11px] font-mono border rounded-sm transition-colors ${
                    s.stock === 0
                      ? 'border-[#2D2E37] text-[#555866] cursor-not-allowed line-through'
                      : 'border-[#383A48] hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black'
                  }`}
                >
                  {s.size.split('/')[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Color Swatches */}
        {product.swatches && product.swatches.length > 1 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.swatches.map((swatch) => (
              <button
                key={swatch.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(swatch.name);
                }}
                className={`w-3 h-3 rounded-full border transition-transform ${
                  selectedColor === swatch.name
                    ? 'ring-1 ring-[#C5A880] scale-110 border-white'
                    : 'border-[#C2BEB4] hover:scale-110'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-serif font-medium text-[#121316] dark:text-[#FAF9F6] group-hover:text-[#C5A880] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Subtitle / Fabric notes */}
        <p className="text-[11px] text-[#7A7870] dark:text-[#9A9890] mt-0.5 font-light line-clamp-1">
          {product.subtitle}
        </p>

        {/* Price and Compare price */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EFECE5] dark:border-[#1E2028]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif font-semibold text-[#121316] dark:text-[#FAF9F6]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] text-[#9A978E] line-through font-light">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Quick-Add button icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsQuickAdding(true);
            }}
            className="p-1 text-[#121316] dark:text-[#EAE7DF] hover:text-[#C5A880] transition-colors"
            title="Quick Add Size"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
