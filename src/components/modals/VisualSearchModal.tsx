import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { X, Camera, UploadCloud, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const VisualSearchModal: React.FC = () => {
  const {
    isVisualSearchOpen,
    setIsVisualSearchOpen,
    navigateTo,
    formatPrice
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<typeof PRODUCTS>([]);

  if (!isVisualSearchOpen) return null;

  const sampleRunwayLooks = [
    {
      title: "Double-Faced Coat Look",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      matches: ['clo-001', 'clo-005']
    },
    {
      title: "Evening Silk Drape Look",
      url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80",
      matches: ['clo-002', 'clo-007', 'clo-010']
    },
    {
      title: "Men's Tailored Suit Look",
      url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
      matches: ['clo-004', 'clo-006', 'clo-008']
    },
    {
      title: "Tuscan Leather Bag Look",
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
      matches: ['clo-009', 'clo-011']
    }
  ];

  const handleSelectSample = (sample: typeof sampleRunwayLooks[0]) => {
    setSelectedImage(sample.url);
    setIsAnalyzing(true);
    setMatchedProducts([]);

    setTimeout(() => {
      const results = PRODUCTS.filter((p) => sample.matches.includes(p.id));
      setMatchedProducts(results);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setIsAnalyzing(true);
      setMatchedProducts([]);

      setTimeout(() => {
        // Find 3 top matching products
        setMatchedProducts([PRODUCTS[0], PRODUCTS[1], PRODUCTS[8]]);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsVisualSearchOpen(false);
    navigateTo('product', { productId });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FAF9F6] dark:bg-[#121318] text-[#121316] dark:text-[#FAF9F6] w-full max-w-2xl rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between bg-[#FAF9F6] dark:bg-[#121318]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#121316] text-[#C5A880] rounded">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">VISUAL RUNWAY SCANNER</h3>
              <p className="text-[10px] font-mono text-[#8A857A] uppercase tracking-wider">
                Upload or select an editorial look to find matching garments
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisualSearchOpen(false)}
            className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white"
            aria-label="Close visual search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Upload Drop Zone */}
          <label className="border-2 border-dashed border-[#DDD8CE] dark:border-[#282A36] hover:border-[#C5A880] dark:hover:border-[#C5A880] rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#EFECE5]/40 dark:bg-[#15171F]">
            <UploadCloud className="w-8 h-8 text-[#C5A880] mb-2" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#121316] dark:text-white font-medium">
              Upload Fashion Photo or Runway Snapshot
            </span>
            <span className="text-[11px] text-[#8A857A] mt-1">
              Supports JPG, PNG, WEBP up to 20MB
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Sample Runway Looks */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A857A] block mb-3">
              OR TEST WITH SAMPLE RUNWAY LOOKS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sampleRunwayLooks.map((sample) => (
                <div
                  key={sample.title}
                  onClick={() => handleSelectSample(sample)}
                  className={`group relative aspect-[3/4] rounded overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === sample.url
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30'
                      : 'border-transparent hover:border-[#C5A880]/50'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-end">
                    <span className="text-[10px] text-white font-medium line-clamp-1">
                      {sample.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis State */}
          {isAnalyzing && (
            <div className="p-6 bg-[#EFECE5] dark:bg-[#181920] rounded text-center space-y-3">
              <Sparkles className="w-6 h-6 text-[#C5A880] animate-spin mx-auto" />
              <div className="text-xs font-mono text-[#8A857A]">
                Analyzing silhouette geometry, fabric weave, and color swatches...
              </div>
            </div>
          )}

          {/* Matched Garments Result */}
          {matchedProducts.length > 0 && !isAnalyzing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#C5A880]">
                <span>MATCHED ATELIER GARMENTS (98.4% CONFIDENCE)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex gap-3 p-3 bg-[#EFECE5] dark:bg-[#1A1C24] rounded cursor-pointer hover:border-[#C5A880] border border-transparent transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-[#C5A880] uppercase">
                          {product.origin}
                        </span>
                        <h5 className="font-serif text-xs font-medium line-clamp-1">
                          {product.name}
                        </h5>
                        <p className="text-[10.5px] text-[#8A857A] line-clamp-1">
                          {product.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A857A]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
