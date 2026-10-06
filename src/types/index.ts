export type ProductCategory = 'women' | 'men' | 'accessories' | 'couture' | 'archive' | 'collections';

export type ProductSubcategory = 
  | 'outerwear' 
  | 'tailoring' 
  | 'dresses' 
  | 'knitwear' 
  | 'tops' 
  | 'trousers' 
  | 'footwear' 
  | 'bags' 
  | 'jewelry' 
  | 'silk-scarves';

export interface ProductSwatch {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSize {
  size: string;
  stock: number; // 0 = out of stock, 1-3 = low stock, >3 = in stock
  sku: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback?: 'Runs small' | 'True to size' | 'Runs large';
}

export interface ProductQA {
  id: string;
  question: string;
  answer: string;
  author: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number; // Baseline in KWD (Kuwaiti Dinar base, or convertible to any currency)
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'NEW SEASON' | 'ATELIER EXCLUSIVE' | 'RUNWAY' | 'LIMITED EDITION' | 'BESTSELLER' | 'SUSTAINABLE' | 'ARCHIVE SALE';
  category: ProductCategory;
  subcategory: ProductSubcategory;
  gender: 'women' | 'men' | 'unisex';
  description: string;
  editorialStory?: string;
  details: string[];
  composition: string;
  care: string[];
  origin: string;
  sustainability: {
    materials: string;
    certifications: string[];
    carbonOffset: string;
    traceability: string;
  };
  images: string[];
  swatches: ProductSwatch[];
  sizes: ProductSize[];
  fitNotes: string;
  modelSpecs: string;
  sku: string;
  completeTheLookIds?: string[];
  isFeatured?: boolean;
  isNewIn?: boolean;
  isBestseller?: boolean;
  isRunway?: boolean;
  reviews?: ProductReview[];
  qa?: ProductQA[];
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  heroImage: string;
  secondaryImage?: string;
  description: string;
  category: ProductCategory;
  season: string;
  productCount: number;
  lookbookLink?: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  productId: string;
  title: string;
  price: number;
  image: string;
}

export interface Lookbook {
  id: string;
  title: string;
  season: string;
  photographer: string;
  location: string;
  description: string;
  image: string;
  secondaryImage?: string;
  hotspots: Hotspot[];
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: 'Atelier' | 'Runway' | 'Craftsmanship' | 'Style Guide' | 'Sustainability';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  image: string;
  secondaryImages?: string[];
  content: string[];
  tags: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  image: string;
  isFlagship: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CartItem {
  id: string; // unique item id combining product id + size + color
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rateFromKWD: number; // KWD is our base high-value enterprise currency
  decimalPlaces: number;
  symbolPosition: 'before' | 'after';
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: 'Processing' | 'Tailoring in Atelier' | 'Dispatched' | 'Delivered' | 'Returned';
  trackingNumber: string;
  shippingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: 'Noir Member' | 'Atelier Privé' | 'Couture Client';
  points: number;
  memberSince: string;
  measurements?: {
    chest?: string;
    waist?: string;
    hips?: string;
    height?: string;
  };
  addresses: Address[];
  orders: Order[];
}

export type ViewState = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'account' 
  | 'wishlist' 
  | 'about' 
  | 'lookbook' 
  | 'journal' 
  | 'journal-article' 
  | 'stores' 
  | 'help' 
  | 'contact' 
  | 'legal' 
  | 'polyglot'
  | 'not-found';
