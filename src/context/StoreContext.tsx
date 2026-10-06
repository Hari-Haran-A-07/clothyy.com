import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, ViewState, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../data/currencies';
import { TRANSLATIONS, LanguageCode, Translations } from '../data/translations';
import { DEFAULT_CMS_CONTENT, CMSContentState } from '../data/cmsContent';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface NavigateParams {
  productId?: string;
  articleId?: string;
  category?: ProductCategory | 'all';
  gender?: 'all' | 'women' | 'men' | 'unisex';
  collectionId?: string;
}

interface StoreContextType {
  // Navigation & View
  currentView: ViewState;
  selectedProductId: string | null;
  selectedArticleId: string | null;
  selectedCategory: ProductCategory | 'all';
  selectedGender: 'all' | 'women' | 'men' | 'unisex';
  selectedCollectionId: string | null;
  navigateTo: (view: ViewState, params?: NavigateParams) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isGiftWrapEnabled: boolean;
  toggleGiftWrap: () => void;
  discountCode: string | null;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToBag: (productId: string) => void;

  // Currency & Localization
  currency: string;
  setCurrency: (code: string) => void;
  formatPrice: (amountInKWD: number) => string;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  isRTL: boolean;

  // Search & Recent
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Drawers & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isAiStylistOpen: boolean;
  setIsAiStylistOpen: (open: boolean) => void;
  isCmsCustomizerOpen: boolean;
  setIsCmsCustomizerOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideModalOpen: boolean;
  setSizeGuideModalOpen: (open: boolean) => void;

  // Live CMS
  cmsContent: CMSContentState;
  updateCmsContent: (newContent: Partial<CMSContentState>) => void;
  resetCmsContent: () => void;

  // User & Orders
  user: UserProfile | null;
  login: (email: string) => void;
  logout: () => void;
  lastOrder: Order | null;
  createOrder: (orderData: Partial<Order>) => Order;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'clothyyy_cart_v1',
  WISHLIST: 'clothyyy_wishlist_v1',
  CURRENCY: 'clothyyy_curr_v1',
  LANG: 'clothyyy_lang_v1',
  CMS: 'clothyyy_cms_v1',
  USER: 'clothyyy_user_v1',
  RECENT: 'clothyyy_recent_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'women' | 'men' | 'unisex'>('all');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  // Localization
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as LanguageCode) || 'en';
  });
  const [currency, setCurrencyState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'KWD';
  });

  const isRTL = language === 'ar';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Update HTML dir and lang attributes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
  };

  const formatPrice = (amountInKWD: number) => {
    return formatCurrency(amountInKWD, currency);
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isGiftWrapEnabled, setIsGiftWrapEnabled] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['clo-001', 'clo-009'];
    } catch {
      return ['clo-001', 'clo-009'];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // CMS Content State
  const [cmsContent, setCmsContent] = useState<CMSContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CMS);
      return saved ? { ...DEFAULT_CMS_CONTENT, ...JSON.parse(saved) } : DEFAULT_CMS_CONTENT;
    } catch {
      return DEFAULT_CMS_CONTENT;
    }
  });

  const updateCmsContent = (newContent: Partial<CMSContentState>) => {
    setCmsContent(prev => {
      const updated = { ...prev, ...newContent };
      localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(updated));
      return updated;
    });
    addToast("Atelier CMS updated in real-time.", "success");
  };

  const resetCmsContent = () => {
    setCmsContent(DEFAULT_CMS_CONTENT);
    localStorage.removeItem(STORAGE_KEYS.CMS);
    addToast("Content restored to original atelier defaults.", "info");
  };

  // User / Auth State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      id: 'usr-981',
      firstName: 'Al-Mansour',
      lastName: 'Al-Sabah',
      email: 'client.vip@clothyyy.com',
      phone: '+965 9988 7766',
      tier: 'Noir Member',
      points: 1850,
      memberSince: '2024',
      measurements: {
        chest: '102 cm',
        waist: '86 cm',
        height: '185 cm'
      },
      addresses: [
        {
          id: 'addr-1',
          firstName: 'Al-Mansour',
          lastName: 'Al-Sabah',
          street: 'Gulf Road, Block 4, Villa 12',
          apartment: 'Private Residence',
          city: 'Kuwait City',
          postalCode: '13001',
          country: 'Kuwait',
          phone: '+965 9988 7766',
          isDefaultShipping: true,
          isDefaultBilling: true
        }
      ],
      orders: []
    };
  });

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(Math.random() * 10000),
      firstName: email.split('@')[0],
      lastName: 'Client',
      email,
      phone: '+965 9000 0000',
      tier: 'Noir Member',
      points: 500,
      memberSince: '2026',
      addresses: [],
      orders: []
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    addToast(`Welcome to your Atelier Suite, ${newUser.firstName}`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    addToast('Signed out of Atelier Suite.', 'info');
  };

  // Recent Products
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return PRODUCTS.filter(p => ids.includes(p.id));
      }
    } catch {
      // ignore
    }
    return [PRODUCTS[0], PRODUCTS[1], PRODUCTS[3]];
  });

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 6);
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated.map(p => p.id)));
      return updated;
    });
  };

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [isCmsCustomizerOpen, setIsCmsCustomizerOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);

  // Orders State
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (view: ViewState, params?: NavigateParams) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);

    if (params?.productId) {
      setSelectedProductId(params.productId);
      const found = PRODUCTS.find(p => p.id === params.productId);
      if (found) addRecentlyViewed(found);
    }
    if (params?.articleId) {
      setSelectedArticleId(params.articleId);
    }
    if (params?.category !== undefined) {
      setSelectedCategory(params.category);
    }
    if (params?.gender !== undefined) {
      setSelectedGender(params.gender);
    }
    if (params?.collectionId !== undefined) {
      setSelectedCollectionId(params.collectionId);
    }
  };

  // Cart Operations
  const addToCart = (product: Product, size: string, color: string, qty: number = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { id: itemId, product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    addToast(`${product.name} (${size}) added to your shopping bag.`, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item removed from shopping bag.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleGiftWrap = () => {
    setIsGiftWrapEnabled(prev => !prev);
    addToast(isGiftWrapEnabled ? 'Gift packaging removed' : 'Complimentary luxury gift packaging selected', 'info');
  };

  const applyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VIP15' || clean === 'CLOTHYYY' || clean === 'RUNWAY26') {
      setDiscountCode(clean);
      setDiscountAmount(0.15); // 15% discount
      addToast('VIP Concierge code applied (15% off order).', 'success');
      return true;
    } else if (clean === 'ATELIER20') {
      setDiscountCode(clean);
      setDiscountAmount(0.20); // 20% discount
      addToast('Atelier Privé code applied (20% off order).', 'success');
      return true;
    } else {
      addToast('Invalid or expired VIP invitation code.', 'error');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode(null);
    setDiscountAmount(0);
    addToast('Discount code removed.', 'info');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    const title = product?.name || 'Garment';
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`${title} removed from your wishlist.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast(`${title} saved to your private wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToBag = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const defaultSize = product.sizes[0]?.size || 'Standard';
    const defaultColor = product.swatches[0]?.name || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  // Order Creation
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: 'CL-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      shippingCost: 0,
      tax: 0,
      discount: cartSubtotal * discountAmount,
      total: cartSubtotal * (1 - discountAmount),
      currency: currency,
      status: 'Tailoring in Atelier',
      trackingNumber: 'CLT-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-KW',
      shippingAddress: orderData.shippingAddress || {
        id: 'addr-default',
        firstName: 'Valued',
        lastName: 'Client',
        street: 'Luxury Boulevard 101',
        city: 'Kuwait City',
        postalCode: '13001',
        country: 'Kuwait',
        phone: '+965 2205 8899'
      },
      deliveryMethod: orderData.deliveryMethod || 'Complimentary Insured White-Glove Express (2-4 Days)',
      paymentMethod: orderData.paymentMethod || 'Credit Card'
    };

    setLastOrder(newOrder);
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        points: prev.points + Math.floor(newOrder.total * 2),
        orders: [newOrder, ...prev.orders]
      } : null);
    }
    clearCart();
    setDiscountCode(null);
    setDiscountAmount(0);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedArticleId,
        selectedCategory,
        selectedGender,
        selectedCollectionId,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isGiftWrapEnabled,
        toggleGiftWrap,
        discountCode,
        discountAmount,
        applyDiscountCode,
        removeDiscountCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToBag,
        currency,
        setCurrency,
        formatPrice,
        language,
        setLanguage,
        t,
        isRTL,
        searchQuery,
        setSearchQuery,
        recentlyViewed,
        addRecentlyViewed,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAiStylistOpen,
        setIsAiStylistOpen,
        isCmsCustomizerOpen,
        setIsCmsCustomizerOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideModalOpen,
        setSizeGuideModalOpen,
        cmsContent,
        updateCmsContent,
        resetCmsContent,
        user,
        login,
        logout,
        lastOrder,
        createOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
