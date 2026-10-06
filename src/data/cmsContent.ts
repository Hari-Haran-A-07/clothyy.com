export interface CMSContentState {
  brandName: string;
  brandTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  announcementText: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  sustainabilityStatement: string;
  contactEmail: string;
  contactPhone: string;
  conciergeHours: string;
}

export const DEFAULT_CMS_CONTENT: CMSContentState = {
  brandName: "CLOTHYYY",
  brandTagline: "HAUTE COUTURE & ARCHITECTURAL LUXURY",
  heroHeadline: "THE ARCHITECTURE OF SILENCE & SILK",
  heroSubheadline: "Sculpted silhouettes, double-faced cashmere, and bespoke Italian tailoring crafted for the discerning modernist.",
  announcementText: "COMPLIMENTARY WHITE-GLOVE GLOBAL SHIPPING ON ALL ORDERS ABOVE KD 150",
  aboutStoryP1: "Founded as an architectural fashion house, CLOTHYYY bridges the purity of modernist structural lines with four centuries of European and Japanese textile heritage. We believe that true luxury does not shout; it is revealed in weightlessness, impeccable cut, and tactile supremacy.",
  aboutStoryP2: "From the unlined double-faced cashmere of Florence to the shuttle-loomed selvedge wools of Okayama, our garments are crafted without compromise. We refuse fast fashion cycles in favor of timeless numbered editions and permanent wardrobe essentials.",
  sustainabilityStatement: "100% of our raw cashmere and silk fibers are certified organic, regeneratively harvested, and carbon-neutralized through audited nature restoration sanctuaries.",
  contactEmail: "concierge@clothyyy.com",
  contactPhone: "+965 2205 8899",
  conciergeHours: "24/7 Global Client Concierge Service"
};

export const FAQ_DATA = [
  {
    category: "Ordering & Bespoke Services",
    questions: [
      {
        q: "How do I place an order for bespoke Made-to-Measure garments?",
        a: "Made-to-Measure atelier appointments can be booked directly through our website, via our WhatsApp Concierge (+965 2205 8899), or at any of our flagship salons in Kuwait City, London, Paris, New York, or Tokyo. Our master tailors will guide you through silhouette selection and bespoke fabric swatches."
      },
      {
        q: "What payment methods are accepted on CLOTHYYY.COM?",
        a: "We accept Visa, MasterCard, American Express, Apple Pay, Google Pay, KNET (Kuwait Debit), Tamara / Tabby (4 interest-free installments), Bank Wire, and luxury crypto settlements (USDT, BTC, ETH)."
      },
      {
        q: "Can I modify or cancel my order after placement?",
        a: "Due to our rapid white-glove dispatch protocols, orders enter atelier fulfillment within 60 minutes. Please contact our 24/7 Client Concierge immediately if you require amendments."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "What are your global delivery timeframes and costs?",
        a: "We offer complimentary Insured Global Express delivery (2–4 business days via DHL Express / FedEx Priority) on all orders above KD 150 (approx. $490 USD). For Kuwait and GCC regions, Same-Day VIP Chauffeur Courier is available for select items."
      },
      {
        q: "Are import duties and taxes included in the displayed price?",
        a: "Yes. All prices shown on CLOTHYYY.COM are fully inclusive of all local customs duties, VAT, and import tariffs (DDP - Delivery Duty Paid). There are no surprise fees at delivery."
      },
      {
        q: "How will my garment be packaged?",
        a: "Every CLOTHYYY garment is delivered in our signature FSC-certified embossed keepsake box, wrapped in archival tissue, accompanied by a solid cedarwood hanger and bespoke canvas dust cover."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is the CLOTHYYY return policy?",
        a: "We offer 30-day complimentary white-glove returns and exchanges worldwide on all unworn items in original condition with security tags attached. A courier will collect the package from your doorstep at your requested time."
      },
      {
        q: "Are Haute Couture and Made-to-Measure items returnable?",
        a: "Custom-tailored and personalized pieces are non-refundable but include complimentary lifetime tailoring and fit adjustments at any CLOTHYYY flagship salon."
      }
    ]
  },
  {
    category: "Authenticity & Care",
    questions: [
      {
        q: "How can I verify the authenticity of my CLOTHYYY garment?",
        a: "Every CLOTHYYY creation features an embedded cryptographic RFID tag woven into the care label and is accompanied by a serialized physical Certificate of Authenticity signed by the master tailor."
      },
      {
        q: "How should I care for double-faced cashmere and silk crepe?",
        a: "We recommend professional luxury eco-dry cleaning only. Each piece comes with a dedicated garment care guide detailing seasonal storage, cedar protection, and gentle steaming recommendations."
      }
    ]
  }
];

export const SIZE_CONVERSION_DATA = {
  women: [
    { fr: "FR 34", it: "IT 38", uk: "UK 6", us: "US 2", bust: "82 cm / 32.3\"", waist: "62 cm / 24.4\"", hips: "88 cm / 34.6\"" },
    { fr: "FR 36", it: "IT 40", uk: "UK 8", us: "US 4", bust: "86 cm / 33.8\"", waist: "66 cm / 26.0\"", hips: "92 cm / 36.2\"" },
    { fr: "FR 38", it: "IT 42", uk: "UK 10", us: "US 6", bust: "90 cm / 35.4\"", waist: "70 cm / 27.5\"", hips: "96 cm / 37.8\"" },
    { fr: "FR 40", it: "IT 44", uk: "UK 12", us: "US 8", bust: "94 cm / 37.0\"", waist: "74 cm / 29.1\"", hips: "100 cm / 39.4\"" },
    { fr: "FR 42", it: "IT 46", uk: "UK 14", us: "US 10", bust: "98 cm / 38.6\"", waist: "78 cm / 30.7\"", hips: "104 cm / 40.9\"" }
  ],
  men: [
    { it: "IT 46", uk: "UK 36", us: "US 36", chest: "92 cm / 36.2\"", waist: "78 cm / 30.7\"", neck: "38 cm / 15.0\"" },
    { it: "IT 48", uk: "UK 38", us: "US 38", chest: "96 cm / 37.8\"", waist: "82 cm / 32.3\"", neck: "39 cm / 15.4\"" },
    { it: "IT 50", uk: "UK 40", us: "US 40", chest: "100 cm / 39.4\"", waist: "86 cm / 33.8\"", neck: "40 cm / 15.7\"" },
    { it: "IT 52", uk: "UK 42", us: "US 42", chest: "104 cm / 40.9\"", waist: "90 cm / 35.4\"", neck: "41 cm / 16.1\"" },
    { it: "IT 54", uk: "UK 44", us: "US 44", chest: "108 cm / 42.5\"", waist: "94 cm / 37.0\"", neck: "42 cm / 16.5\"" }
  ]
};
