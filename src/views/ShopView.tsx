import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Product, ProductCategory, ProductSubcategory } from '../types';
import {
  SlidersHorizontal,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  List,
  X,
  RotateCcw
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    selectedCategory,
    selectedGender,
    formatPrice
  } = useStore();

  // Filters State
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(selectedCategory || 'all');
  const [activeGender, setActiveGender] = useState<'all' | 'women' | 'men' | 'unisex'>(selectedGender || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4 | 'list'>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available Filter Options
  const allSubcategories = [
    { id: 'all', label: 'All Garments' },
    { id: 'outerwear', label: 'Cashmere Outerwear' },
    { id: 'tailoring', label: 'Architectural Tailoring' },
    { id: 'dresses', label: 'Silk Gowns & Dresses' },
    { id: 'knitwear', label: 'Fine Merino & Knitwear' },
    { id: 'trousers', label: 'Palazzo & Selvedge Trousers' },
    { id: 'bags', label: 'Tuscan Leather Bags' },
    { id: 'footwear', label: 'Hand-Welted Footwear' },
    { id: 'silk-scarves', label: 'Printed Silk Twill' }
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'FR 34', 'FR 36', 'FR 38', 'FR 40', 'IT 46', 'IT 48', 'IT 50', 'IT 52'];
  const allColors = [
    { name: 'Noir', hex: '#111215' },
    { name: 'Alabaster', hex: '#FAF9F6' },
    { name: 'Camel', hex: '#C2A582' },
    { name: 'Ochre', hex: '#A37A4C' },
    { name: 'Espresso', hex: '#3E342F' },
    { name: 'Slate', hex: '#7A7C85' }
  ];
  const allMaterials = ['Cashmere', 'Mulberry Silk', 'Merino Wool', 'Japanese Selvedge', 'Tuscan Calfskin'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setActiveGender('all');
    setSelectedSubcategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setMaxPrice(1000);
    setSortBy('featured');
  };

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (activeGender !== 'all' ? 1 : 0) +
    (selectedSubcategory !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    selectedMaterials.length +
    (maxPrice < 1000 ? 1 : 0);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;
      if (activeGender !== 'all' && product.gender !== activeGender && product.gender !== 'unisex') return false;
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) return false;
      if (product.price > maxPrice) return false;

      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) =>
          selectedSizes.some((selected) => s.size.toUpperCase().includes(selected.toUpperCase()))
        );
        if (!hasSize) return false;
      }

      if (selectedColors.length > 0) {
        const hasColor = product.swatches.some((swatch) =>
          selectedColors.some((c) => swatch.name.toLowerCase().includes(c.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      if (selectedMaterials.length > 0) {
        const hasMat = selectedMaterials.some((mat) =>
          product.composition.toLowerCase().includes(mat.toLowerCase())
        );
        if (!hasMat) return false;
      }

      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'newest') return (b.isNewIn ? 1 : 0) - (a.isNewIn ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, activeGender, selectedSubcategory, maxPrice, selectedSizes, selectedColors, selectedMaterials, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Collection Banner */}
      <div className="relative rounded-sm overflow-hidden bg-[#101115] text-white p-8 sm:p-12 border border-[#22242D]">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            PERMANENT ARCHIVE & AUTUMN/WINTER '26
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium">
            {activeCategory === 'women'
              ? "Women's Architectural Collection"
              : activeCategory === 'men'
              ? "Men's Sartorial Line"
              : activeCategory === 'accessories'
              ? 'Tuscan Leathergoods & Footwear'
              : activeCategory === 'couture'
              ? 'Atelier Haute Couture'
              : 'The Complete Garment Repertory'}
          </h1>
          <p className="text-xs text-[#9DA0AE] font-light max-w-lg">
            Sculpted silhouettes, unlined double-faced cashmere, and bias-cut silk crepe engineered without compromise.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
            alt="Runway Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E8E4DA] dark:border-[#22242D]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 bg-[#EFECE5] dark:bg-[#1A1C24] hover:border-[#C5A880] text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-sm border border-[#DDD8CE] dark:border-[#2C2E38] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#121316] text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Gender Pills */}
          <div className="hidden sm:flex bg-[#EFECE5] dark:bg-[#1A1C24] p-1 rounded">
            {[
              { id: 'all', label: 'All' },
              { id: 'women', label: 'Women' },
              { id: 'men', label: 'Men' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGender(g.id as any)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  activeGender === g.id
                    ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                    : 'text-[#6C6E7C] hover:text-black dark:hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#8A857A] font-mono hidden md:inline">
            Showing {filteredProducts.length} pieces
          </span>
        </div>

        {/* Layout Switcher & Sort Selector */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1 border border-[#DDD8CE] dark:border-[#2C2E38] rounded-sm p-1">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1.5 rounded ${gridColumns === 2 ? 'bg-[#DDD8CE] dark:bg-[#2C2E38]' : 'text-[#8A857A]'}`}
              title="2-Column View"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded ${gridColumns === 3 ? 'bg-[#DDD8CE] dark:bg-[#2C2E38]' : 'text-[#8A857A]'}`}
              title="3-Column View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 rounded ${gridColumns === 4 ? 'bg-[#DDD8CE] dark:bg-[#2C2E38]' : 'text-[#8A857A]'}`}
              title="4-Column View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns('list')}
              className={`p-1.5 rounded ${gridColumns === 'list' ? 'bg-[#DDD8CE] dark:bg-[#2C2E38]' : 'text-[#8A857A]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#8A857A] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#EFECE5] dark:bg-[#1A1C24] text-xs py-2 px-3 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="featured">Featured Atelier Edit</option>
              <option value="newest">Newest Runway Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-[#8A857A]">Active Filters:</span>
          {activeCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Department: {activeCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveCategory('all')} />
            </span>
          )}
          {activeGender !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Gender: {activeGender}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveGender('all')} />
            </span>
          )}
          {selectedSubcategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Type: {selectedSubcategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubcategory('all')} />
            </span>
          )}
          {selectedSizes.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Size: {s}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(s)} />
            </span>
          ))}
          {selectedColors.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Color: {c}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleColor(c)} />
            </span>
          ))}
          {selectedMaterials.map((m) => (
            <span key={m} className="inline-flex items-center gap-1 bg-[#EFECE5] dark:bg-[#1A1C24] text-xs px-2.5 py-1 rounded-full border border-[#DDD8CE] dark:border-[#282A36]">
              Material: {m}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleMaterial(m)} />
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#C5A880] underline hover:text-[#0C0C0E] dark:hover:text-white font-mono ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>
      )}

      {/* Main Content Area: Sidebar Filter Drawer + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {isMobileFilterOpen && (
          <aside className="lg:col-span-3 bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA] dark:border-[#22242D]">
              <span className="font-mono uppercase tracking-widest font-semibold">
                FILTER ATELIER REPERTORY
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#C5A880] hover:underline"
              >
                Clear
              </button>
            </div>

            {/* Subcategory */}
            <div>
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-2">
                Garment Type
              </label>
              <div className="space-y-1.5">
                {allSubcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                      selectedSubcategory === sub.id
                        ? 'bg-[#121316] text-white dark:bg-[#C5A880] dark:text-black font-semibold'
                        : 'text-[#5C5E6D] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="text-[#7A7870] uppercase">Max Price:</span>
                <span className="font-semibold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

            {/* Size Selector */}
            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-2">
                Sizes
              </label>
              <div className="grid grid-cols-3 gap-1.5 font-mono">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`py-1.5 text-center border rounded transition-colors ${
                      selectedSizes.includes(s)
                        ? 'border-[#C5A880] bg-[#C5A880] text-black font-bold'
                        : 'border-[#DDD8CE] dark:border-[#2C2E38] hover:border-[#C5A880]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-2">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {allColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-all ${
                      selectedColors.includes(c.name)
                        ? 'border-[#C5A880] bg-[#C5A880]/15 font-semibold'
                        : 'border-[#DDD8CE] dark:border-[#2C2E38]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028]">
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-2">
                Noble Materials
              </label>
              <div className="space-y-1.5">
                {allMaterials.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2 cursor-pointer text-[#5C5E6D] hover:text-black dark:hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="accent-[#C5A880]"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className={isMobileFilterOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAF9F6] dark:bg-[#121318] border border-[#E3DFD5] dark:border-[#262832] rounded p-8 space-y-4">
              <h3 className="font-serif text-2xl font-medium">
                No garments found with active filter criteria
              </h3>
              <p className="text-xs text-[#8A857A] max-w-sm mx-auto">
                Adjust your price thresholds or selected size swatches to view our complete repertory.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-block bg-[#121316] dark:bg-[#C5A880] text-white dark:text-black text-xs font-mono uppercase tracking-widest px-6 py-3 rounded"
              >
                Reset All Filters
              </button>
            </div>
          ) : gridColumns === 'list' ? (
            <div className="space-y-4">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridColumns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridColumns === 4
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
