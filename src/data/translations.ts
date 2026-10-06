export type LanguageCode = 'en' | 'ar';

export interface Translations {
  announcement: string;
  announcement2: string;
  announcement3: string;
  nav: {
    newIn: string;
    women: string;
    men: string;
    collections: string;
    atelier: string;
    lookbook: string;
    journal: string;
    stores: string;
    about: string;
    sale: string;
    search: string;
    account: string;
    wishlist: string;
    bag: string;
    allProducts: string;
    viewAll: string;
    featured: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    exploreRunway: string;
    shopCollection: string;
    curatedBy: string;
  };
  marquee: {
    craft: string;
    silk: string;
    tailoring: string;
    worldwide: string;
    sustainability: string;
  };
  categories: {
    title: string;
    subtitle: string;
    womenTailoring: string;
    menOuterwear: string;
    silkCapsule: string;
    italianLeather: string;
    eveningCouture: string;
    discoverMore: string;
  };
  newArrivals: {
    title: string;
    subtitle: string;
    viewAllNew: string;
    quickAdd: string;
    quickView: string;
  };
  craftsmanship: {
    tag: string;
    title: string;
    description: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    stat4Label: string;
    stat4Value: string;
    button: string;
  };
  lookbookSection: {
    tag: string;
    title: string;
    subtitle: string;
    shopThisLook: string;
    exploreLookbook: string;
  };
  newsletter: {
    tag: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
    privacy: string;
    success: string;
  };
  product: {
    addToBag: string;
    buyNow: string;
    outOfStock: string;
    lowStock: string;
    inStock: string;
    selectSize: string;
    selectColor: string;
    sizeGuide: string;
    details: string;
    compositionCare: string;
    sustainability: string;
    shippingReturns: string;
    certificate: string;
    completeTheLook: string;
    similarItems: string;
    reviews: string;
    qa: string;
    writeReview: string;
    askQuestion: string;
    addedToBag: string;
    addedToWishlist: string;
    removedFromWishlist: string;
    shareProduct: string;
    linkCopied: string;
    installments: string;
    deliveryEstimate: string;
    dimensions: string;
  };
  cart: {
    title: string;
    empty: string;
    emptySubtitle: string;
    continueShopping: string;
    subtotal: string;
    shipping: string;
    freeShipping: string;
    freeShippingUnlocked: string;
    awayFromFreeShipping: string;
    checkout: string;
    viewCart: string;
    promoCode: string;
    apply: string;
    promoApplied: string;
    giftWrap: string;
    giftWrapDesc: string;
    total: string;
    taxIncluded: string;
    remove: string;
  };
  checkout: {
    title: string;
    customerInfo: string;
    shippingAddress: string;
    deliveryMethod: string;
    payment: string;
    orderSummary: string;
    placeOrder: string;
    expressCheckout: string;
    standardShipping: string;
    expressConcierge: string;
    creditCard: string;
    knet: string;
    installmentsTamara: string;
    crypto: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
    saveCard: string;
    billingSame: string;
    securityNote: string;
  };
  account: {
    welcome: string;
    tier: string;
    points: string;
    orders: string;
    addresses: string;
    measurements: string;
    stylist: string;
    settings: string;
    signOut: string;
    signIn: string;
    signUp: string;
    noOrders: string;
    trackOrder: string;
  };
  footer: {
    brandStatement: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    boutiques: string;
    clientCare: string;
    theHouse: string;
    legal: string;
    allRightsReserved: string;
    madeWithExcellence: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    announcement: "COMPLIMENTARY WHITE-GLOVE GLOBAL SHIPPING ON ALL ORDERS ABOVE KD 150",
    announcement2: "DISCOVER THE AUTUMN/WINTER '26 RUNWAY CAPSULE — ATELIER EDITION",
    announcement3: "BOOK A PRIVATE STYLING APPOINTMENT AT OUR FLAGSHIP SALONS",
    nav: {
      newIn: "NEW IN",
      women: "WOMEN",
      men: "MEN",
      collections: "COLLECTIONS",
      atelier: "THE ATELIER",
      lookbook: "LOOKBOOK",
      journal: "JOURNAL",
      stores: "BOUTIQUES",
      about: "ABOUT",
      sale: "ARCHIVE SALE",
      search: "Search garments, silk, tailoring...",
      account: "Account",
      wishlist: "Wishlist",
      bag: "Bag",
      allProducts: "View All Products",
      viewAll: "Explore All",
      featured: "Featured Highlights"
    },
    hero: {
      badge: "AUTUMN / WINTER '26 EDITORIAL",
      headline: "THE ARCHITECTURE OF SILENCE & SILK",
      subheadline: "Sculpted silhouettes, double-faced cashmere, and bespoke Italian tailoring crafted for the discerning minimalist.",
      exploreRunway: "DISCOVER THE RUNWAY",
      shopCollection: "EXPLORE COLLECTION",
      curatedBy: "CURATED ATELIER EDIT"
    },
    marquee: {
      craft: "ITALIAN ARTISANAL HERITAGE",
      silk: "100% ORGANIC MULBERRY SILK",
      tailoring: "BESPOKE ARCHITECTURAL CUTS",
      worldwide: "GLOBAL WHITE-GLOVE DELIVERY",
      sustainability: "CIRCULAR LUXURY COMMITMENT"
    },
    categories: {
      title: "CURATED DEPARTMENTS",
      subtitle: "Explore foundational wardrobe elements designed with quiet luxury and structural purity.",
      womenTailoring: "Women's Architectural Tailoring",
      menOuterwear: "Men's Cashmere & Outerwear",
      silkCapsule: "Pure Silk Slip & Eveningwear",
      italianLeather: "Handcrafted Tuscan Leathergoods",
      eveningCouture: "Atelier Haute Couture",
      discoverMore: "Explore Category"
    },
    newArrivals: {
      title: "THE LATEST DROPS",
      subtitle: "Uncompromising pieces precision-cut from rare Japanese selvedge and Italian mills.",
      viewAllNew: "View All New Arrivals",
      quickAdd: "Quick Add",
      quickView: "Quick View"
    },
    craftsmanship: {
      tag: "THE ATELIER MANIFESTO",
      title: "CRAFTED WITHOUT COMPROMISE",
      description: "Every CLOTHYYY garment begins with certified regenerative materials, precision pattern drafting, and hand-finished handwork by master artisans with over four decades of European heritage.",
      stat1Value: "100%",
      stat1Label: "Traceable Organic Fibers",
      stat2Value: "48 Hrs",
      stat2Label: "Artisanal Hand-Finishing",
      stat3Value: "Zero",
      stat3Label: "Compromise on Durability",
      stat4Value: "2 Trillion",
      stat4Label: "Standard of Excellence",
      button: "Read The Craftsmanship Story"
    },
    lookbookSection: {
      tag: "INTERACTIVE RUNWAY",
      title: "SHOP THE EDITORIAL LOOKBOOK",
      subtitle: "Hover over the styling pins to inspect and instantly acquire garments straight from the runway.",
      shopThisLook: "Shop This Look",
      exploreLookbook: "View Complete Lookbook"
    },
    newsletter: {
      tag: "NOIR PRIVÉ MEMBERSHIP",
      title: "JOIN THE CLOTHYYY CIRCLE",
      description: "Receive private invitations to runway previews, archive allocations, and bespoke styling sessions.",
      placeholder: "Enter your email address...",
      button: "REQUEST INVITATION",
      privacy: "By subscribing, you agree to our privacy policy and exclusive membership terms.",
      success: "Thank you for requesting an invitation. Welcome to the CLOTHYYY Privé Circle."
    },
    product: {
      addToBag: "ADD TO SHOPPING BAG",
      buyNow: "EXPRESS CHECKOUT",
      outOfStock: "SOLD OUT / JOIN WAITLIST",
      lowStock: "LOW STOCK — ONLY A FEW REMAINING",
      inStock: "IN STOCK — DISPATCHES IN 24H",
      selectSize: "Select Size",
      selectColor: "Color Variant",
      sizeGuide: "Size Guide & Fit Advisor",
      details: "Design & Silhouette Notes",
      compositionCare: "Materials, Composition & Care",
      sustainability: "Provenance & Sustainability",
      shippingReturns: "White-Glove Shipping & Returns",
      certificate: "Certificate of Authenticity",
      completeTheLook: "COMPLETE THE LOOK",
      similarItems: "YOU MAY ALSO APPRECIATE",
      reviews: "Client Reviews & Feedback",
      qa: "Atelier Questions & Answers",
      writeReview: "Write a Client Review",
      askQuestion: "Inquire with Concierge",
      addedToBag: "Garment added to your shopping bag",
      addedToWishlist: "Saved to your private wishlist",
      removedFromWishlist: "Removed from your wishlist",
      shareProduct: "Share Garment",
      linkCopied: "Garment link copied to clipboard",
      installments: "Or 4 interest-free installments with Tamara or Tabby",
      deliveryEstimate: "Estimated delivery: 2-3 business days with insured courier",
      dimensions: "Garment Dimensions"
    },
    cart: {
      title: "YOUR SHOPPING BAG",
      empty: "YOUR SHOPPING BAG IS CURRENTLY EMPTY",
      emptySubtitle: "Explore our latest runway drops and curated wardrobe staples.",
      continueShopping: "EXPLORE THE RUNWAY",
      subtotal: "Subtotal",
      shipping: "White-Glove Shipping",
      freeShipping: "COMPLIMENTARY",
      freeShippingUnlocked: "You have unlocked Complimentary White-Glove Shipping!",
      awayFromFreeShipping: "Add {amount} more for Complimentary Global Delivery",
      checkout: "PROCEED TO SECURE CHECKOUT",
      viewCart: "View Full Bag",
      promoCode: "Promotion or VIP Code",
      apply: "Apply",
      promoApplied: "VIP Concierge discount applied (15% off)",
      giftWrap: "Complimentary Luxury Gift Packaging",
      giftWrapDesc: "Includes embossed gift box, scented silk tissue & custom calligraphy card.",
      total: "Estimated Total",
      taxIncluded: "All customs duties and taxes included",
      remove: "Remove"
    },
    checkout: {
      title: "ENTERPRISE CHECKOUT",
      customerInfo: "1. Contact & VIP Identification",
      shippingAddress: "2. White-Glove Delivery Address",
      deliveryMethod: "3. Shipping Concierge Method",
      payment: "4. Secure Payment Method",
      orderSummary: "Order Overview",
      placeOrder: "CONFIRM & PLACE ORDER",
      expressCheckout: "EXPRESS WALLET CHECKOUT",
      standardShipping: "Insured Global Express (2-4 Days) — Complimentary",
      expressConcierge: "Same-Day Atelier VIP Courier (Kuwait & Gulf Salons) — KD 15.000",
      creditCard: "Credit / Debit Card (Visa, Mastercard, Amex)",
      knet: "KNET Payment Gateway (Direct Debit)",
      installmentsTamara: "Tamara / Tabby — Split in 4 Payments",
      crypto: "Luxury Crypto Settlement (USDT, BTC, ETH)",
      cardNumber: "Card Number",
      expiry: "MM / YY",
      cvv: "CVV / CVC",
      cardName: "Name on Card",
      saveCard: "Save card securely for future purchases",
      billingSame: "Billing address same as shipping address",
      securityNote: "Encrypted with 256-bit TLS bank-grade security. Certified PCI-DSS Level 1."
    },
    account: {
      welcome: "Welcome to your Atelier Suite",
      tier: "Noir Privé Member",
      points: "Atelier Loyalty Credits",
      orders: "Order History & Tracking",
      addresses: "Saved Addresses",
      measurements: "Bespoke Measurement Vault",
      stylist: "Personal Stylist Consultations",
      settings: "Account & Security",
      signOut: "Sign Out",
      signIn: "Sign In to Atelier Suite",
      signUp: "Create Client Account",
      noOrders: "No previous orders recorded yet.",
      trackOrder: "Track Shipment"
    },
    footer: {
      brandStatement: "CLOTHYYY is an international luxury fashion atelier defined by architectural purity, sublime materials, and uncompromising European and Japanese craftsmanship.",
      newsletterTitle: "ATELIER DISPATCHES",
      newsletterSubtitle: "Subscribe to receive private preview allocations and seasonal lookbooks.",
      boutiques: "BOUTIQUES & SALONS",
      clientCare: "CLIENT CONCIERGE",
      theHouse: "THE HOUSE",
      legal: "LEGAL & ETHICS",
      allRightsReserved: "All rights reserved. Designed with enterprise-grade distinction.",
      madeWithExcellence: "CLOTHYYY.COM Global Luxury Platform",
      disclaimer: "Reference brand identity for CLOTHYYY.COM. All placeholder data is structured for seamless CMS integration."
    }
  },
  ar: {
    announcement: "شحن عالمي فاخر ومجاني لجميع الطلبات التي تتجاوز ١٥٠ د.ك",
    announcement2: "اكتشفوا تشكيلة خريف/شتاء ٢٠٢٦ الخاصة بعروض الأزياء — إصدار الأتيليه",
    announcement3: "احجزوا موعد استشارة وتنسيق أزياء خاص في صالوناتنا الرئيسية",
    nav: {
      newIn: "وصل حديثاً",
      women: "النساء",
      men: "الرجال",
      collections: "المجموعات",
      atelier: "الأتيليه",
      lookbook: "كتالوج الأزياء",
      journal: "المجلة",
      stores: "البوتيكات",
      about: "عن الدار",
      sale: "الأرشيف والتخفيضات",
      search: "ابحث عن الملابس، الحرير، الخياطة الراقية...",
      account: "حسابي",
      wishlist: "المفضلة",
      bag: "الحقيبة",
      allProducts: "عرض جميع المنتجات",
      viewAll: "استكشف الكل",
      featured: "أبرز المختارات"
    },
    hero: {
      badge: "مجموعة خريف / شتاء ٢٠٢٦",
      headline: "هندسة الحرير والهدوء الراقي",
      subheadline: "قصات معمارية، كشمير إيطالي مزدوج الوجه، وخياطة مصممة بعناية لا متناهية لأصحاب الذوق الرفيع.",
      exploreRunway: "اكتشف العرض",
      shopCollection: "تسوق المجموعة",
      curatedBy: "مختارات الأتيليه الخاصة"
    },
    marquee: {
      craft: "حرفية إيطالية عريقة",
      silk: "حرير التوت الطبيعي ١٠٠٪",
      tailoring: "قصات معمارية مخصصة",
      worldwide: "توصيل عالمي VIP فائق العناية",
      sustainability: "التزام كامل بالفخامة المستدامة"
    },
    categories: {
      title: "الأقسام المختارة",
      subtitle: "استكشف أساسيات خزانة الملابس المصممة بفخامة هادئة ونقاء هيكلي.",
      womenTailoring: "الخياطة النسائية المعمارية",
      menOuterwear: "الكشمير والمعاطف الرجالية",
      silkCapsule: "فساتين الحرير وأزياء السهرة",
      italianLeather: "الجلديات الإيطالية المصنوعة يدوياً",
      eveningCouture: "أزياء الهوت كوتور الراقية",
      discoverMore: "استكشف القسم"
    },
    newArrivals: {
      title: "أحدث الإطلاقات",
      subtitle: "قطع استثنائية مقصوصة بدقة من أفخر الأقمشة اليابانية والإيطالية النادرة.",
      viewAllNew: "عرض كل ما وصل حديثاً",
      quickAdd: "إضافة سريعة",
      quickView: "معاينة سريعة"
    },
    craftsmanship: {
      tag: "بيان الأتيليه",
      title: "صناعة بلا تنازلات",
      description: "تبدأ كل قطعة في CLOTHYYY بمواد عضوية متجددة معتمدة، وقص دقيق وتفصيل يدوي من قبل حرفيين خبراء يمتلكون أكثر من أربعة عقود من الخبرة الأوروبية.",
      stat1Value: "١٠٠٪",
      stat1Label: "ألياف عضوية قابلة للتتبع",
      stat2Value: "٤٨ ساعة",
      stat2Label: "تشطيب يدوي متقن",
      stat3Value: "صفر",
      stat3Label: "مساومة على المتانة والجودة",
      stat4Value: "٢ تريليون",
      stat4Label: "معيار التميز الاستثنائي",
      button: "اقرأ قصة الحرفية"
    },
    lookbookSection: {
      tag: "منصة العرض التفاعلية",
      title: "تسوق إطلالات الكتالوج",
      subtitle: "حرك المؤشر فوق نقاط التنسيق لمعاينة واقتناء القطع المعروضة مباشرة من المنصة.",
      shopThisLook: "تسوق هذه الإطلالة",
      exploreLookbook: "عرض الكتالوج الكامل"
    },
    newsletter: {
      tag: "عضوية نوار الخاصة",
      title: "انضم إلى دائرة CLOTHYYY الخاصة",
      description: "احصل على دعوات حصرية لمعاينات عروض الأزياء وقطع الأرشيف المحدودة وجلسات التنسيق المخصصة.",
      placeholder: "أدخل بريدك الإلكتروني...",
      button: "طلب الدعوة",
      privacy: "بالاشتراك، فإنك توافق على سياسة الخصوصية وشروط العضوية الحصرية.",
      success: "شكراً لطلبك. مرحباً بك في دائرة CLOTHYYY الخاصة."
    },
    product: {
      addToBag: "إضافة إلى حقيبة التسوق",
      buyNow: "الدفع السريع",
      outOfStock: "نفدت الكمية / انضم لقائمة الانتظار",
      lowStock: "كمية محدودة — تبقت قطع قليلة فقط",
      inStock: "متوفر — يتم الشحن خلال ٢٤ ساعة",
      selectSize: "اختر المقاس",
      selectColor: "اللون",
      sizeGuide: "دليل المقاسات ومستشار المقاس",
      details: "تفاصيل التصميم والقصة",
      compositionCare: "المواد، التركيبة وإرشادات العناية",
      sustainability: "المصدر والاستدامة",
      shippingReturns: "الشحن الفاخر وسياسة الإرجاع",
      certificate: "شهادة الأصالة والمصدر",
      completeTheLook: "أكمل الإطلالة",
      similarItems: "قد ينال إعجابك أيضاً",
      reviews: "تقييمات وآراء العملاء",
      qa: "أسئلة وأجوبة الأتيليه",
      writeReview: "كتابة تقييم",
      askQuestion: "استفسر من خدمة العملاء",
      addedToBag: "تمت إضافة القطعة إلى حقيبة التسوق",
      addedToWishlist: "تم الحفظ في قائمتك المفضلة",
      removedFromWishlist: "تمت الإزالة من قائمتك المفضلة",
      shareProduct: "مشاركة القطعة",
      linkCopied: "تم نسخ رابط القطعة للحافظة",
      installments: "أو ٤ دفعات بدون فوائد مع تمارا أو تابي",
      deliveryEstimate: "التوصيل المتوقع: خلال ٢-٣ أيام عمل مع شحن مؤمن",
      dimensions: "أبعاد القطعة"
    },
    cart: {
      title: "حقيبة التسوق الخاصة بك",
      empty: "حقيبة التسوق الخاصة بك فارغة حالياً",
      emptySubtitle: "استكشف أحدث إصدارات عروض الأزياء وأساسيات الأناقة الفاخرة.",
      continueShopping: "استكشف التشكيلة",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن الفاخر",
      freeShipping: "مجاني",
      freeShippingUnlocked: "لقد حصلت على الشحن الفاخر المجاني!",
      awayFromFreeShipping: "أضف {amount} إضافية للحصول على توصيل مجاني",
      checkout: "المتابعة لإتمام الطلب بأمان",
      viewCart: "عرض الحقيبة كاملة",
      promoCode: "رمز الخصم أو رمز VIP",
      apply: "تطبيق",
      promoApplied: "تم تطبيق خصم العملاء المميزين (١٥٪)",
      giftWrap: "تغليف هدايا فاخر ومجاني",
      giftWrapDesc: "يتضمن صندوقاً منقوشاً، وورق حرير معطر، وبطاقة خط عربي مخصصة.",
      total: "المجموع الإجمالي",
      taxIncluded: "تشمل جميع الرسوم الجمركية والضرائب",
      remove: "إزالة"
    },
    checkout: {
      title: "إتمام الطلب الفاخر",
      customerInfo: "١. بيانات التواصل وعضوية VIP",
      shippingAddress: "٢. عنوان التوصيل الفاخر",
      deliveryMethod: "٣. خيار الشحن والتوصيل",
      payment: "٤. طريقة الدفع الآمنة",
      orderSummary: "ملخص الطلب",
      placeOrder: "تأكيد وإتمام الطلب",
      expressCheckout: "الدفع السريع عبر المحفظة",
      standardShipping: "شحن سريع عالمي مؤمن (٢-٤ أيام) — مجاني",
      expressConcierge: "توصيل فوري VIP في نفس اليوم (الكويت والخليج) — ١٥.٠٠٠ د.ك",
      creditCard: "بطاقة الائتمان / الخصم (فيزا، ماستركارد، أمريكان إكسبريس)",
      knet: "بوابة كي نت KNET (دفع إلكتروني مباشر)",
      installmentsTamara: "تمارا / تابي — قسّمها على ٤ دفعات بدون فوائد",
      crypto: "الدفع بالعملات الرقمية الفاخرة (USDT, BTC, ETH)",
      cardNumber: "رقم البطاقة",
      expiry: "الشهر / السنة",
      cvv: "رمز الأمان CVV",
      cardName: "الاسم على البطاقة",
      saveCard: "حفظ البطاقة بأمان للمشتريات المستقبلية",
      billingSame: "عنوان الفاتورة هو نفسه عنوان الشحن",
      securityNote: "مشفر بأعلى درجات الأمان المصرفي 256-bit TLS ومطابق لمعيار PCI-DSS المستوى الأول."
    },
    account: {
      welcome: "مرحباً بكم في جناح الأتيليه الخاص",
      tier: "عضو نوار بريفيه",
      points: "نقاط ولاء الأتيليه",
      orders: "سجل الطلبات والتتبع",
      addresses: "العناوين المحفوظة",
      measurements: "سجل المقاسات المخصصة",
      stylist: "استشارات منسق الأزياء الشخصي",
      settings: "إعدادات الحساب والأمان",
      signOut: "تسجيل الخروج",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب جديد",
      noOrders: "لا توجد طلبات سابقة مسجلة حتى الآن.",
      trackOrder: "تتبع الشحنة"
    },
    footer: {
      brandStatement: "CLOTHYYY دار أزياء فاخرة عالمية تتميز بالنقاء المعماري، وأفخر الخامات، والحرفية الأوروبية واليابانية التي لا تضاهى.",
      newsletterTitle: "رسائل الأتيليه",
      newsletterSubtitle: "اشترك لتصلك أولويات الحجز المسبق وإصدارات كتالوجات الموسم.",
      boutiques: "البوتيكات والصالونات",
      clientCare: "خدمة العملاء والكونسيرج",
      theHouse: "عن الدار",
      legal: "الشروط والسياسات",
      allRightsReserved: "جميع الحقوق محفوظة. صُمم وفق أعلى معايير التميز العالمية.",
      madeWithExcellence: "منصة CLOTHYYY.COM العالمية للفخامة",
      disclaimer: "الهوية المعتمدة لدار CLOTHYYY.COM. جميع البيانات النموذجية قابلة للتعديل عبر نظام إدارة المحتوى."
    }
  }
};
