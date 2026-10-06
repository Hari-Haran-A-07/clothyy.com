import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORES } from '../data/stores';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { StoreLocation } from '../types';

export const StoreLocatorView: React.FC = () => {
  const { navigateTo } = useStore();
  const [selectedStoreId, setSelectedStoreId] = useState(STORES[0].id);

  const activeStore = STORES.find((s: StoreLocation) => s.id === selectedStoreId) || STORES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          GLOBAL BOUTIQUES & SALONS
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium">
          Flagship Salons
        </h1>
        <p className="text-xs text-[#7A7870] font-light">
          Experience our architectural collections in person. Private VIP styling suites, master bespoke tailoring, and champagne lounges available by appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {STORES.map((store: StoreLocation) => (
            <div
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`p-5 rounded-sm border cursor-pointer transition-all ${
                selectedStoreId === store.id
                  ? 'border-[#C5A880] bg-[#FAF9F6] dark:bg-[#151720] shadow-md'
                  : 'border-[#E3DFD5] dark:border-[#22242D] bg-[#FAF9F6]/60 dark:bg-[#101115] hover:border-[#C5A880]/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                    {store.country}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#121316] dark:text-white">
                    {store.name}
                  </h3>
                  <p className="text-xs text-[#7A7870] mt-1 font-light">
                    {store.address}
                  </p>
                </div>
                {store.isFlagship && (
                  <span className="text-[9.5px] font-mono bg-[#121316] text-[#C5A880] px-2 py-0.5 rounded uppercase flex-shrink-0">
                    Flagship
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Active Showcase */}
        <div className="lg:col-span-7 bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6 text-xs">
          <div className="aspect-[16/9] rounded overflow-hidden bg-[#ECE8E1] dark:bg-[#181A22]">
            <img
              src={activeStore.image}
              alt={activeStore.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-medium">
                {activeStore.name}
              </h2>
              <span className="font-mono text-[#C5A880] uppercase">
                {activeStore.city}, {activeStore.country}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
                  <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>{activeStore.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
                  <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span className="font-mono">{activeStore.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
                  <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>{activeStore.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
                  <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <span>{activeStore.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <span className="font-mono uppercase tracking-wider text-[#C5A880] block mb-2 font-semibold">
                SALON SERVICES:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
                {activeStore.services.map((srv: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('contact')}
                className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black hover:bg-[#C5A880] px-6 py-3 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment in {activeStore.city}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
