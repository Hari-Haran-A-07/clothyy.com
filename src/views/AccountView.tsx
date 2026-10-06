import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  MapPin,
  Ruler,
  Calendar,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { Order, Address } from '../types';

export const AccountView: React.FC = () => {
  const { user, login, logout, formatPrice, navigateTo, wishlist, t } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'measurements' | 'appointments'>('overview');
  const [loginEmail, setLoginEmail] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-xl space-y-6 text-xs">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              ATELIER CLIENT PRIVÉ
            </span>
            <h2 className="text-2xl font-serif font-medium">{t.account.signIn}</h2>
            <p className="text-[#8A857A]">
              Access your private order history, bespoke measurement vault, and VIP styling invitations.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginEmail) login(loginEmail);
            }}
            className="space-y-4"
          >
            <div>
              <label className="font-mono text-[#7A7870] block mb-1">Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="client.vip@clothyyy.com"
                required
                className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-3 rounded text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
            >
              Enter Atelier Suite
            </button>
          </form>

          <p className="text-[10.5px] text-[#8A857A] text-center">
            Invitations to the Noir Privé Circle are issued upon order qualification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-[#0C0C0E] text-white p-8 sm:p-10 rounded-sm border border-[#23242E] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1A1B24] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] text-xl font-serif font-bold">
            {user.firstName[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-medium">
                {user.firstName} {user.lastName}
              </h1>
              <span className="bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-[#C5A880]/30 font-semibold">
                {user.tier}
              </span>
            </div>
            <p className="text-xs text-[#9DA0AE] mt-0.5">
              Client Member since {user.memberSince} • {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="text-right">
            <span className="text-[#8A857A] uppercase block text-[10px]">Atelier Credits</span>
            <span className="text-lg font-serif font-bold text-[#C5A880]">
              {user.points.toLocaleString()} PTS
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2 bg-[#1C1E26] hover:bg-[#BD2727] text-[#9DA0AE] hover:text-white rounded transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8E4DA] dark:border-[#22242D] pb-3 text-xs font-mono">
        {[
          { id: 'overview', label: 'Suite Overview', icon: User },
          { id: 'orders', label: 'Order History', icon: Package },
          { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          { id: 'measurements', label: 'Measurement Vault', icon: Ruler },
          { id: 'appointments', label: 'Stylist Appointments', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-sm uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                  : 'bg-[#EFECE5] dark:bg-[#1A1C24] text-[#6C6E7C] hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="text-xs">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
              <h4 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
                Private VIP Concierge
              </h4>
              <p className="text-[#6C6E7C] leading-relaxed">
                You have unlimited access to our dedicated Senior Stylist hotline and priority atelier runway allocations.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="text-[#121316] dark:text-white underline font-mono flex items-center gap-1"
              >
                <span>Request Styling Call</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
              <h4 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
                Saved Wishlist Pieces
              </h4>
              <p className="text-[#6C6E7C]">
                You have {wishlist.length} bespoke garments in your private wishlist.
              </p>
              <button
                onClick={() => navigateTo('wishlist')}
                className="text-[#121316] dark:text-white underline font-mono flex items-center gap-1"
              >
                <span>Explore Wishlist</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
              <h4 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
                Bespoke Fitting Profile
              </h4>
              <p className="text-[#6C6E7C]">
                Chest: 102cm • Waist: 86cm • Height: 185cm. Fully verified by Florence Atelier.
              </p>
              <button
                onClick={() => setActiveTab('measurements')}
                className="text-[#121316] dark:text-white underline font-mono flex items-center gap-1"
              >
                <span>Update Measurements</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {user.orders.length === 0 ? (
              <div className="text-center py-16 bg-[#FAF9F6] dark:bg-[#121318] rounded border border-[#E3DFD5] dark:border-[#262832] p-8 space-y-3">
                <Package className="w-8 h-8 text-[#8A857A] mx-auto" />
                <h4 className="font-serif text-lg font-medium">{t.account.noOrders}</h4>
                <button
                  onClick={() => navigateTo('shop')}
                  className="mt-3 inline-block bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-2.5 rounded font-mono uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              user.orders.map((ord: Order) => (
                <div
                  key={ord.id}
                  className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded border border-[#E3DFD5] dark:border-[#262832] space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E4DA] dark:border-[#22242D] pb-3">
                    <div>
                      <span className="font-mono font-bold text-sm">Order #{ord.id}</span>
                      <span className="text-[#8A857A] ml-3">{ord.date}</span>
                    </div>
                    <span className="bg-[#1B6B4A]/15 text-[#1B6B4A] dark:text-[#4ADE80] font-mono px-2.5 py-0.5 rounded uppercase font-semibold">
                      {ord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#8A857A] uppercase font-mono block mb-1">Items:</span>
                      {ord.items.map((it) => (
                        <div key={it.id} className="text-[#5C5E6D] dark:text-[#A8AAB9]">
                          {it.quantity}x {it.product.name} ({it.selectedSize})
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <span className="text-[#8A857A] uppercase font-mono block mb-1">Total Paid:</span>
                      <span className="font-serif text-base font-bold text-[#C5A880]">
                        {formatPrice(ord.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {user.addresses.map((addr: Address) => (
              <div
                key={addr.id}
                className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded border border-[#E3DFD5] dark:border-[#262832] space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-serif font-bold text-sm">
                    {addr.firstName} {addr.lastName}
                  </h5>
                  {addr.isDefaultShipping && (
                    <span className="text-[10px] font-mono bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded uppercase">
                      Default Shipping
                    </span>
                  )}
                </div>
                <p className="text-[#6C6E7C]">{addr.street}</p>
                <p className="text-[#6C6E7C]">{addr.city}, {addr.postalCode}</p>
                <p className="text-[#6C6E7C]">{addr.country}</p>
                <p className="font-mono text-[#8A857A]">{addr.phone}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'measurements' && (
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6 max-w-xl">
            <h4 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
              Encrypted Bespoke Measurement Vault
            </h4>
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-3 bg-[#EFECE5] dark:bg-[#181920] rounded">
                <span className="text-[#7A7870] block">Chest Circumference:</span>
                <span className="text-sm font-bold text-black dark:text-white">{user.measurements?.chest || '102 cm'}</span>
              </div>
              <div className="p-3 bg-[#EFECE5] dark:bg-[#181920] rounded">
                <span className="text-[#7A7870] block">Waistline:</span>
                <span className="text-sm font-bold text-black dark:text-white">{user.measurements?.waist || '86 cm'}</span>
              </div>
              <div className="p-3 bg-[#EFECE5] dark:bg-[#181920] rounded">
                <span className="text-[#7A7870] block">Height:</span>
                <span className="text-sm font-bold text-black dark:text-white">{user.measurements?.height || '185 cm'}</span>
              </div>
              <div className="p-3 bg-[#EFECE5] dark:bg-[#181920] rounded">
                <span className="text-[#7A7870] block">Master Tailor:</span>
                <span className="text-sm font-bold text-[#C5A880]">Florence Atelier #04</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4 max-w-xl">
            <h4 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
              VIP Salon Bookings
            </h4>
            <p className="text-[#6C6E7C]">
              You have no active salon bookings scheduled this week.
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black px-6 py-2.5 rounded text-xs font-mono uppercase tracking-wider hover:bg-[#C5A880] transition-colors"
            >
              Book Flagship Salon Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
