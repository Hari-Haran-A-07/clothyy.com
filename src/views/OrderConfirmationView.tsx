import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Printer,
  ArrowRight
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { lastOrder, formatPrice, navigateTo } = useStore();

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A880', '#0C0C0E', '#EAE6DD', '#8A6E4B']
    });
  }, []);

  const order = lastOrder || {
    id: 'CL-984210',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    items: [],
    subtotal: 680,
    shippingCost: 0,
    tax: 0,
    discount: 0,
    total: 680,
    currency: 'KWD',
    status: 'Tailoring in Atelier',
    trackingNumber: 'CLT-8942-KW',
    shippingAddress: {
      id: 'addr-default',
      firstName: 'Al-Mansour',
      lastName: 'Al-Sabah',
      street: 'Gulf Road, Block 4, Villa 12',
      city: 'Kuwait City',
      postalCode: '13001',
      country: 'Kuwait',
      phone: '+965 9988 7766'
    },
    deliveryMethod: 'Complimentary Insured White-Glove Express',
    paymentMethod: 'Credit Card (Authorized)'
  };

  const steps = [
    { title: 'Order Authorized', desc: 'Cryptographic receipt confirmed', time: 'Just now', done: true },
    { title: 'Atelier Tailoring & Inspection', desc: 'Hand finishing and RFID serialization', time: 'In progress', done: true, active: true },
    { title: 'Signature Gift Packaging', desc: 'Embossed wooden box & cedar hanger', time: 'Pending', done: false },
    { title: 'White-Glove Courier Dispatch', desc: 'Insured priority flight logistics', time: 'Estimated 24-48h', done: false }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Top Banner */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#1B6B4A]/10 text-[#1B6B4A] dark:text-[#4ADE80] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] block">
          ATELIER ORDER AUTHORIZED
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-medium">
          Thank You For Your Acquisition
        </h1>

        <p className="text-xs text-[#7A7870] font-light max-w-md mx-auto">
          Your order <strong>#{order.id}</strong> has entered our master tailoring queue. An encrypted receipt and digital Certificate of Authenticity have been dispatched to your email.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DDD8CE] dark:border-[#2C2E38] rounded text-xs font-mono uppercase tracking-wider hover:bg-[#EFECE5] dark:hover:bg-[#1A1C24] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Luxury Receipt</span>
          </button>
        </div>
      </div>

      {/* Live Atelier Tracking Timeline */}
      <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4DA] dark:border-[#22242D] pb-4">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#121316] dark:text-white">
              LIVE ATELIER FULFILLMENT TIMELINE
            </h3>
            <span className="text-xs text-[#8A857A] font-mono">
              Tracking Reference: <strong>{order.trackingNumber}</strong>
            </span>
          </div>
          <span className="text-xs bg-[#C5A880]/15 text-[#C5A880] px-3 py-1 rounded-full font-mono uppercase font-semibold mt-2 sm:mt-0">
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2 relative">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                    step.active
                      ? 'bg-[#C5A880] text-black font-bold animate-pulse'
                      : step.done
                      ? 'bg-[#121316] text-white dark:bg-white dark:text-black'
                      : 'bg-[#DDD8CE] dark:bg-[#282A36] text-[#8A857A]'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="text-xs font-serif font-semibold">{step.title}</span>
              </div>
              <p className="text-[11px] text-[#7A7870] font-light">{step.desc}</p>
              <span className="text-[10px] font-mono text-[#8A857A] block">{step.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
        <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-2 text-[#C5A880]">
            Delivery Concierge Destination
          </h4>
          <div className="space-y-1 text-[#5C5E6D] dark:text-[#A8AAB9]">
            <p className="font-semibold text-black dark:text-white">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
            <p className="font-mono">{order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider font-semibold border-b border-[#E8E4DA] dark:border-[#22242D] pb-2 text-[#C5A880]">
            Payment & VIP Credits
          </h4>
          <div className="space-y-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-mono text-black dark:text-white">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-serif font-bold text-sm text-[#C5A880]">
                {formatPrice(order.total)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#EAE6DD] dark:border-[#1E2028] text-[#1B6B4A] dark:text-[#4ADE80]">
              <span>Noir Tier Loyalty Credits Earned:</span>
              <span className="font-mono font-bold">+{Math.floor(order.total * 2)} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('home')}
          className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black hover:bg-[#C5A880] px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
        >
          <span>Return To Atelier Experience</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
