import React from 'react';
import { useStore } from '../context/StoreContext';

export const NotFoundView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] block">
        ERROR 404 • ARCHIVE NOT FOUND
      </span>
      <h1 className="text-4xl sm:text-6xl font-serif font-medium">
        The Requested Atelier Page Does Not Exist
      </h1>
      <p className="text-xs text-[#8A857A] max-w-sm mx-auto leading-relaxed">
        The page you are seeking may have been archived or moved. Explore our latest runway collection or consult with our client concierge.
      </p>
      <div className="pt-4 flex justify-center gap-4">
        <button
          onClick={() => navigateTo('home')}
          className="bg-[#121316] dark:bg-[#FAF9F6] text-white dark:text-black hover:bg-[#C5A880] px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
        >
          Return to Homepage
        </button>
        <button
          onClick={() => navigateTo('shop')}
          className="border border-[#DDD8CE] dark:border-[#2C2E38] px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest hover:bg-[#EFECE5] dark:hover:bg-[#1A1C24] transition-colors"
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
};
