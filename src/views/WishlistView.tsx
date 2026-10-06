import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

export const WishlistView: React.FC = () => {
  const { wishlist, moveWishlistToBag, navigateTo } = useStore();

  const savedProducts = PRODUCTS.filter((p: Product) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p: Product) => {
      moveWishlistToBag(p.id);
    });
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EFECE5] dark:bg-[#1A1C24] flex items-center justify-center mx-auto text-[#8A857A]">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-medium">Your Wishlist is Empty</h2>
        <p className="text-xs text-[#8A857A] max-w-sm mx-auto leading-relaxed">
          Save garments while exploring our runway lookbooks to review them privately or consult with our AI Stylist.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 inline-block bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black text-xs font-mono uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-[#C5A880] transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E8E4DA] dark:border-[#22242D] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            PRIVATE ATELIER SELECTION
          </span>
          <h1 className="text-3xl font-serif font-medium mt-1">My Saved Wishlist</h1>
          <p className="text-xs text-[#8A857A] mt-1 font-mono">
            {savedProducts.length} archival garment{savedProducts.length > 1 ? 's' : ''} preserved
          </p>
        </div>

        <button
          onClick={handleMoveAllToBag}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Move All to Shopping Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
