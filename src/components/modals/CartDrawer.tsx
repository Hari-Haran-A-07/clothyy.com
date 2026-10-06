import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, Gift, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartCount,
    cartSubtotal,
    isGiftWrapEnabled,
    toggleGiftWrap,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    navigateTo,
    isRTL,
    t
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150; // 150 KD
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

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-full flex`}>
        <motion.div
          initial={{ x: isRTL ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: isRTL ? '-100%' : '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-md bg-[#FAF9F6] dark:bg-[#101115] text-[#121316] dark:text-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E5E1D8] dark:border-[#22242D]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono tracking-widest uppercase font-semibold">
                {t.cart.title}
              </span>
              <span className="text-xs bg-[#EFECE5] dark:bg-[#1E2028] px-2 py-0.5 rounded-full font-mono">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#EFECE5] dark:bg-[#181920] px-6 py-3 border-b border-[#E8E4DA] dark:border-[#22242D]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#1B6B4A] dark:text-[#4ADE80] flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.cart.freeShippingUnlocked}
                </span>
              ) : (
                <span className="text-[#686975]">
                  Add {formatPrice(remainingForFreeShipping)} for Complimentary Global Delivery
                </span>
              )}
              <span className="font-semibold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#DDD8CE] dark:bg-[#282A36] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFECE5] dark:bg-[#1E2028] flex items-center justify-center mx-auto text-[#8A857A]">
                  <Gift className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-medium">{t.cart.empty}</h4>
                <p className="text-xs text-[#8A857A] max-w-xs mx-auto leading-relaxed">
                  {t.cart.emptySubtitle}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-4 inline-block bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black text-xs font-mono uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[#C5A880] transition-colors"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-[#EFECE5] dark:border-[#1E2028]"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-sm flex-shrink-0 bg-[#ECE8E1] dark:bg-[#1C1E26]"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-serif font-medium line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#9A988E] hover:text-[#BD2727] transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#7A7870] font-mono mt-1 space-x-2">
                          <span>Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span>Color: {item.selectedColor}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#DDD8CE] dark:border-[#2C2E38] rounded-sm text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#EAE6DD] dark:hover:bg-[#1E2028] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 font-mono text-[11px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#EAE6DD] dark:hover:bg-[#1E2028] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <span className="text-xs font-serif font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift packaging toggle */}
                <div
                  onClick={toggleGiftWrap}
                  className="flex items-center justify-between p-3 bg-[#EFECE5]/60 dark:bg-[#181920] border border-[#DDD8CE] dark:border-[#262832] rounded-sm cursor-pointer hover:border-[#C5A880] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Gift className={`w-4 h-4 ${isGiftWrapEnabled ? 'text-[#C5A880]' : 'text-[#8A857A]'}`} />
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider block">
                        {t.cart.giftWrap}
                      </span>
                      <span className="text-[10px] text-[#7A7870]">
                        Signature box, embossed ribbon & silk tissue
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiftWrapEnabled}
                    onChange={() => {}}
                    className="accent-[#C5A880] cursor-pointer"
                  />
                </div>

                {/* Promo / VIP code box */}
                <div className="pt-2">
                  {discountCode ? (
                    <div className="flex items-center justify-between bg-[#1B6B4A]/10 text-[#1B6B4A] dark:text-[#4ADE80] border border-[#1B6B4A]/20 p-2.5 rounded text-xs">
                      <span>Code <strong>{discountCode}</strong> applied ({(discountAmount * 100)}% off)</span>
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
                        placeholder="VIP Code (e.g. VIP15)"
                        className="flex-1 bg-[#EFECE5] dark:bg-[#181920] text-xs px-3 py-2 border border-[#DDD8CE] dark:border-[#2A2C37] rounded-sm focus:outline-none focus:border-[#C5A880]"
                      />
                      <button
                        type="submit"
                        className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm hover:bg-[#C5A880] transition-colors"
                      >
                        {t.cart.apply}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E4DA] dark:border-[#22242D] bg-[#FAF9F6] dark:bg-[#101115] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6D6F7C]">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-serif text-sm text-[#121316] dark:text-[#FAF9F6]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#1B6B4A] dark:text-[#4ADE80]">
                    <span>VIP Concierge Discount</span>
                    <span>-{formatPrice(discountValue)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6D6F7C]">
                  <span>{t.cart.shipping}</span>
                  <span className="text-[#1B6B4A] dark:text-[#4ADE80] font-mono">
                    {t.cart.freeShipping}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#EFECE5] dark:border-[#1E2028]">
                  <span>{t.cart.total}</span>
                  <span className="font-serif text-base">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
                <p className="text-[10px] text-[#8A857A] text-center">
                  {t.cart.taxIncluded}
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-3.5 px-4 rounded-sm text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{t.cart.checkout}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleViewCart}
                  className="w-full bg-transparent hover:bg-[#EFECE5] dark:hover:bg-[#1C1E26] text-[#121316] dark:text-[#FAF9F6] py-2.5 px-4 rounded-sm text-xs font-mono uppercase tracking-widest transition-colors border border-[#DDD8CE] dark:border-[#2C2E38]"
                >
                  {t.cart.viewCart}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A857A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>256-Bit Bank-Grade Encrypted Checkout</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
