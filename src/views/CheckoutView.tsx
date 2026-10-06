import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Address, CartItem } from '../types';
import {
  CreditCard,
  ShieldCheck,
  Truck,
  Sparkles,
  Lock,
  ArrowRight,
  Building,
  Coins
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    formatPrice,
    createOrder,
    navigateTo,
    user,
    t
  } = useStore();

  const [email, setEmail] = useState(user?.email || 'client.vip@clothyyy.com');
  const [firstName, setFirstName] = useState(user?.firstName || 'Al-Mansour');
  const [lastName, setLastName] = useState(user?.lastName || 'Al-Sabah');
  const [phone, setPhone] = useState(user?.phone || '+965 9988 7766');
  const [street, setStreet] = useState('Gulf Road, Block 4, Villa 12');
  const [city, setCity] = useState('Kuwait City');
  const [country, setCountry] = useState('Kuwait');
  const [postalCode, setPostalCode] = useState('13001');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'concierge'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'knet' | 'tamara' | 'crypto'>('card');

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9842');
  const [cardExpiry, setCardExpiry] = useState('12 / 28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('AL-MANSOUR AL-SABAH');

  const [isProcessing, setIsProcessing] = useState(false);

  const discountValue = cartSubtotal * discountAmount;
  const shippingFee = deliveryMethod === 'concierge' ? 15 : 0;
  const totalAmount = cartSubtotal - discountValue + shippingFee;

  if (cart.length === 0) {
    navigateTo('cart');
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: 'addr-' + Math.random().toString(36),
      firstName,
      lastName,
      street,
      city,
      country,
      postalCode,
      phone
    };

    setTimeout(() => {
      createOrder({
        shippingAddress,
        deliveryMethod: deliveryMethod === 'concierge' ? 'Same-Day Atelier VIP Courier' : 'Complimentary Insured Global Express',
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Visa/Amex)' : paymentMethod === 'knet' ? 'KNET Direct Debit' : paymentMethod === 'tamara' ? 'Tamara 4x Installments' : 'Luxury Crypto Settlement'
      });
      setIsProcessing(false);
      navigateTo('order-confirmation');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-[#E8E4DA] dark:border-[#22242D] pb-4 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">{t.checkout.title}</h1>
          <span className="text-xs font-mono text-[#8A857A] uppercase">
            Encrypted White-Glove Order Placement
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#1B6B4A] dark:text-[#4ADE80] font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL 256-Bit Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: 4-Step Form */}
        <div className="lg:col-span-7 space-y-8 text-xs">
          {/* Step 1 */}
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 text-[#C5A880]">
              {t.checkout.customerInfo}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[#7A7870] block mb-1">Email for Atelier Dispatches</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">VIP Concierge Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 text-[#C5A880]">
              {t.checkout.shippingAddress}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[#7A7870] block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-mono text-[#7A7870] block mb-1">Street Address / Villa / Tower</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">City / District</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">Country / Territory</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Kuwait">Kuwait</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="United States">United States</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 text-[#C5A880]">
              {t.checkout.deliveryMethod}
            </h3>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-colors ${
                  deliveryMethod === 'standard'
                    ? 'border-[#C5A880] bg-[#C5A880]/10'
                    : 'border-[#DDD8CE] dark:border-[#2C2E38]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'standard'}
                    onChange={() => setDeliveryMethod('standard')}
                    className="accent-[#C5A880]"
                  />
                  <div>
                    <span className="font-mono uppercase font-semibold block">
                      {t.checkout.standardShipping}
                    </span>
                    <span className="text-[11px] text-[#7A7870]">
                      Insured DHL Express with personalized keepsakes box.
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-[#1B6B4A] dark:text-[#4ADE80]">
                  COMPLIMENTARY
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-colors ${
                  deliveryMethod === 'concierge'
                    ? 'border-[#C5A880] bg-[#C5A880]/10'
                    : 'border-[#DDD8CE] dark:border-[#2C2E38]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'concierge'}
                    onChange={() => setDeliveryMethod('concierge')}
                    className="accent-[#C5A880]"
                  />
                  <div>
                    <span className="font-mono uppercase font-semibold block">
                      {t.checkout.expressConcierge}
                    </span>
                    <span className="text-[11px] text-[#7A7870]">
                      Dedicated Chauffeur delivery in temperature-regulated wardrobe vehicle.
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold">{formatPrice(15)}</span>
              </label>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 text-[#C5A880]">
              {t.checkout.payment}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'knet', label: 'KNET Debit', icon: Building },
                { id: 'tamara', label: 'Tamara 4x', icon: Sparkles },
                { id: 'crypto', label: 'Crypto Pay', icon: Coins }
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === p.id
                        ? 'border-[#C5A880] bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                        : 'border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880]'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">{t.checkout.cardNumber}</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] font-mono focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[#7A7870] block mb-1">{t.checkout.expiry}</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] font-mono focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[#7A7870] block mb-1">{t.checkout.cvv}</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                      className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] font-mono focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">{t.checkout.cardName}</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] font-mono uppercase focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'knet' && (
              <div className="p-4 bg-[#EFECE5] dark:bg-[#181920] rounded border border-[#DDD8CE] dark:border-[#282A36] space-y-2">
                <span className="font-mono uppercase font-semibold text-[#121316] dark:text-white block">
                  Kuwait KNET Electronic Payment Gateway
                </span>
                <p className="text-[#7A7870]">
                  You will be securely routed through the national KNET gateway for direct bank card verification upon confirmation.
                </p>
              </div>
            )}

            {paymentMethod === 'tamara' && (
              <div className="p-4 bg-[#EFECE5] dark:bg-[#181920] rounded border border-[#DDD8CE] dark:border-[#282A36] space-y-2">
                <span className="font-mono uppercase font-semibold text-[#121316] dark:text-white block">
                  Tamara / Tabby — Split into 4 Zero-Interest Payments
                </span>
                <p className="text-[#7A7870]">
                  Pay <strong>{formatPrice(totalAmount / 4)}</strong> today, and the rest in 3 monthly automated installments.
                </p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="p-4 bg-[#EFECE5] dark:bg-[#181920] rounded border border-[#DDD8CE] dark:border-[#282A36] space-y-2">
                <span className="font-mono uppercase font-semibold text-[#121316] dark:text-white block">
                  High-Value Crypto Settlement (USDT, BTC, ETH)
                </span>
                <p className="text-[#7A7870]">
                  Escrow-protected multi-sig smart contract with instantaneous on-chain confirmation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-3">
              {t.checkout.orderSummary} ({cart.length} items)
            </h3>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cart.map((item: CartItem) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover rounded bg-[#ECE8E1] dark:bg-[#181920]"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-serif font-medium truncate">{item.product.name}</h5>
                    <span className="text-[11px] text-[#7A7870] font-mono">
                      {item.selectedSize} • Qty {item.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-serif font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <div className="flex justify-between text-[#6D6F7C]">
                <span>{t.cart.subtotal}</span>
                <span className="font-serif text-sm text-black dark:text-white">
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
                <span className="font-mono">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-serif font-semibold pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
                <span>Total Payable</span>
                <span className="text-lg text-[#C5A880]">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-4 px-6 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Authorizing Atelier Order...</span>
              ) : (
                <>
                  <span>{t.checkout.placeOrder}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10.5px] text-[#8A857A] text-center">
              {t.checkout.securityNote}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
