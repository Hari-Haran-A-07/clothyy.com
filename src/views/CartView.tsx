import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, Gift, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    isGiftWrapEnabled,
    toggleGiftWrap,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    navigateTo,
    t
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  const FREE_SHIPPING_THRESHOLD = 150;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountValue = cartSubtotal * discountAmount;
  const finalTotal = cartSubtotal - discountValue;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    applyDiscountCode(promoInput);
    setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EFECE5] dark:bg-[#1A1C24] flex items-center justify-center mx-auto text-[#8A857A]">
          <Gift className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-medium">{t.cart.empty}</h2>
        <p className="text-xs text-[#8A857A] max-w-sm mx-auto leading-relaxed">
          {t.cart.emptySubtitle}
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 inline-block bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black text-xs font-mono uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-[#C5A880] transition-colors"
        >
          {t.cart.continueShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#E8E4DA] dark:border-[#22242D] pb-4">
        <h1 className="text-3xl font-serif font-medium">{t.cart.title}</h1>
        <span className="text-xs font-mono text-[#8A857A] uppercase">
          {cart.length} distinct atelier creation{cart.length > 1 ? 's' : ''} reserved
        </span>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-[#EFECE5] dark:bg-[#181920] p-4 rounded-sm border border-[#DDD8CE] dark:border-[#282A36]">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          {remainingForFreeShipping === 0 ? (
            <span className="text-[#1B6B4A] dark:text-[#4ADE80] font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {t.cart.freeShippingUnlocked}
            </span>
          ) : (
            <span>
              Add {formatPrice(remainingForFreeShipping)} more to receive Complimentary Global White-Glove Shipping
            </span>
          )}
          <span>{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full bg-[#DDD8CE] dark:bg-[#2A2C38] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C5A880] h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-[#EAE6DD] dark:divide-[#1E2028]">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-28 h-36 object-cover rounded-sm bg-[#ECE8E1] dark:bg-[#1A1C24] flex-shrink-0 cursor-pointer"
                  onClick={() => navigateTo('product', { productId: item.product.id })}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3
                        onClick={() => navigateTo('product', { productId: item.product.id })}
                        className="text-base font-serif font-medium cursor-pointer hover:text-[#C5A880] transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8A857A] hover:text-[#BD2727] p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-[#7A7870] font-mono mt-1 space-x-3">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                      <span>•</span>
                      <span>SKU: {item.product.sku}</span>
                    </div>

                    <p className="text-xs text-[#8A857A] mt-2 font-light line-clamp-1">
                      {item.product.origin}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EFECE5] dark:border-[#1E2028]">
                    <div className="flex items-center border border-[#DDD8CE] dark:border-[#2C2E38] rounded-sm text-xs font-mono">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#EAE6DD] dark:hover:bg-[#1E2028]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#EAE6DD] dark:hover:bg-[#1E2028]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-serif font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Packaging Box */}
          <div
            onClick={toggleGiftWrap}
            className="p-5 bg-[#FAF9F6] dark:bg-[#14151B] border border-[#DDD8CE] dark:border-[#282A36] rounded-sm flex items-center justify-between cursor-pointer hover:border-[#C5A880] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Gift className={`w-5 h-5 ${isGiftWrapEnabled ? 'text-[#C5A880]' : 'text-[#8A857A]'}`} />
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">
                  {t.cart.giftWrap}
                </h4>
                <p className="text-xs text-[#7A7870] font-light">
                  {t.cart.giftWrapDesc}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isGiftWrapEnabled}
              onChange={() => {}}
              className="accent-[#C5A880] cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3">
            {t.checkout.orderSummary}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#6D6F7C]">
              <span>{t.cart.subtotal}</span>
              <span className="font-serif text-sm text-black dark:text-white">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#1B6B4A] dark:text-[#4ADE80]">
                <span>VIP Concierge Discount ({(discountAmount * 100)}%)</span>
                <span>-{formatPrice(discountValue)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#6D6F7C]">
              <span>{t.cart.shipping}</span>
              <span className="text-[#1B6B4A] dark:text-[#4ADE80] font-mono">
                {t.cart.freeShipping}
              </span>
            </div>

            <div className="flex justify-between text-base font-serif font-semibold pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <span>{t.cart.total}</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
            <p className="text-[10.5px] text-[#8A857A]">
              {t.cart.taxIncluded}
            </p>
          </div>

          {/* Promo Code Applicator */}
          <div className="pt-2">
            {discountCode ? (
              <div className="flex items-center justify-between bg-[#1B6B4A]/10 text-[#1B6B4A] dark:text-[#4ADE80] border border-[#1B6B4A]/25 p-3 rounded text-xs">
                <span>Code <strong>{discountCode}</strong> applied</span>
                <button
                  onClick={removeDiscountCode}
                  className="text-xs underline hover:opacity-80"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={t.cart.promoCode}
                  className="flex-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded hover:bg-[#C5A880] transition-colors"
                >
                  {t.cart.apply}
                </button>
              </form>
            )}
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-4 px-6 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span>{t.cart.checkout}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A857A] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>256-Bit Bank-Grade Encrypted Payment Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
