import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'clo-001',
    name: 'The Monolith Double-Faced Cashmere Overcoat',
    slug: 'monolith-double-faced-cashmere-overcoat',
    subtitle: '100% Loro Piana Grade Cashmere | Hand-Stitched Peak Lapel',
    price: 680, // KD 680
    compareAtPrice: 820,
    rating: 4.9,
    reviewsCount: 28,
    badge: 'RUNWAY',
    category: 'women',
    subcategory: 'outerwear',
    gender: 'women',
    description: 'An architectural silhouette crafted from unlined double-faced cashmere sourced from Piedmont, Italy. Cut with dropped shoulders, deep welt pockets, and an elongated single-breasted horn button closure.',
    editorialStory: 'First debuted at Paris Fashion Week Autumn/Winter, The Monolith Overcoat embodies minimalist luxury. Two layers of pure cashmere are split at the edges and folded invisibly by hand in our Florence atelier.',
    details: [
      'Unlined double-face construction with invisible hand-sewn seams',
      'Exaggerated architectural peak lapels',
      'Genuine Buffalo horn buttons with laser-etched CLOTHYYY serial',
      'Deep side pockets and internal passport slip',
      'Includes padded silk-covered hanger and bespoke canvas garment bag'
    ],
    composition: '100% Virgin Cashmere (480gsm, Piedmont Italy)',
    care: [
      'Specialist dry clean only with hydrocarbon solvent',
      'Do not wash with water',
      'Iron on reverse with low heat using pressing cloth',
      'Store hanging on cedar wood support in breathable bag'
    ],
    origin: 'Handcrafted in Florence, Italy',
    sustainability: {
      materials: 'Ethically harvested Mongolian cashmere certified by the Sustainable Fibre Alliance (SFA).',
      certifications: ['SFA Certified', 'OEKO-TEX 100 Class I', 'Zero-Chemical Washing'],
      carbonOffset: '100% of transport emissions neutralized via verified regenerative forest projects.',
      traceability: 'Fully traceable from herd #M-891 to Florence Atelier.'
    },
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Onyx Noir', hex: '#111215', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85' },
      { name: 'Camel Sand', hex: '#C2A582', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85' },
      { name: 'Heather Slate', hex: '#7A7C85', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'FR 34 / XS', stock: 2, sku: 'CLO-001-XS' },
      { size: 'FR 36 / S', stock: 5, sku: 'CLO-001-S' },
      { size: 'FR 38 / M', stock: 8, sku: 'CLO-001-M' },
      { size: 'FR 40 / L', stock: 3, sku: 'CLO-001-L' },
      { size: 'FR 42 / XL', stock: 1, sku: 'CLO-001-XL' }
    ],
    fitNotes: 'Designed for a fluid, oversized silhouette. We recommend taking your normal size for the runway drape, or one size down for a closer fit.',
    modelSpecs: 'Model is 179cm / 5\'10.5" and wears size FR 36 / S.',
    sku: 'CLT-AW26-CASH-001',
    completeTheLookIds: ['clo-003', 'clo-005', 'clo-009'],
    isFeatured: true,
    isNewIn: true,
    isRunway: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Lady Eleanor V.',
        rating: 5,
        date: 'October 2026',
        title: 'Masterpiece of modern outerwear',
        comment: 'The weightlessness and pure thermal comfort of this cashmere is unmatched. The lapel construction sits impeccably.',
        verified: true,
        fitFeedback: 'True to size'
      },
      {
        id: 'rev-2',
        author: 'Dr. Faisal Al-Sabah',
        rating: 5,
        date: 'September 2026',
        title: 'Exquisite craftsmanship',
        comment: 'Purchased for my wife. The unboxing experience with the silk cover and cedar hanger was exceptional.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ],
    qa: [
      {
        id: 'qa-1',
        question: 'Does this coat come with internal lining?',
        answer: 'The coat utilizes true double-faced craftsmanship, which connects two layers of pure cashmere without synthetic lining, ensuring featherlight warmth and superior drape.',
        author: 'CLOTHYYY Atelier Concierge',
        date: '2026-09-15'
      }
    ]
  },
  {
    id: 'clo-002',
    name: 'Architectural Silk Crepe Asymmetric Gown',
    slug: 'architectural-silk-crepe-asymmetric-gown',
    subtitle: 'Heavyweight Mulberry Silk | Bias-Cut Fluidity',
    price: 520,
    rating: 5.0,
    reviewsCount: 16,
    badge: 'ATELIER EXCLUSIVE',
    category: 'women',
    subcategory: 'dresses',
    gender: 'women',
    description: 'Cut on the bias from 40mm silk crepe de chine. Features a high sculptural draped neckline cascading into a dramatic open-back architectural cowl.',
    details: [
      '100% Grade 6A Mulberry Silk Crepe (40mm heavy gauge)',
      'Sculptural draped neckline with concealed interior anchor ribbons',
      'Deep architectural open back with delicate horizontal bar',
      'Floor-sweeping train with concealed wrist loop for evening movement',
      'Hand-rolled hems finished in Lyon, France'
    ],
    composition: '100% Mulberry Silk Crepe de Chine',
    care: [
      'Professional luxury dry clean only',
      'Do not steam directly on silk face',
      'Store flat in acid-free archival tissue paper'
    ],
    origin: 'Crafted in Lyon, France',
    sustainability: {
      materials: 'Regenerative pesticide-free mulberry trees, non-toxic water-based vegetable dyes.',
      certifications: ['GOTS Certified Silk', 'OEKO-TEX Standard 100'],
      carbonOffset: 'Crafted in a solar-powered French atelier with closed-loop water filtration.',
      traceability: 'Direct farm-to-loom certification provided with serialized RFID chip.'
    },
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Champagne Alabaster', hex: '#F4EFEA', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=85' },
      { name: 'Nocturne Black', hex: '#0D0D10', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85' },
      { name: 'Burnt Ochre', hex: '#8F5338', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'FR 34 / XS', stock: 1, sku: 'CLO-002-XS' },
      { size: 'FR 36 / S', stock: 4, sku: 'CLO-002-S' },
      { size: 'FR 38 / M', stock: 3, sku: 'CLO-002-M' },
      { size: 'FR 40 / L', stock: 2, sku: 'CLO-002-L' }
    ],
    fitNotes: 'Cut on the bias to mold effortlessly to the contours of the body. Floor-length with standard 10cm heel clearance.',
    modelSpecs: 'Model is 180cm / 5\'11" and wears size FR 36 / S.',
    sku: 'CLT-COUT-SLK-002',
    completeTheLookIds: ['clo-010', 'clo-011'],
    isFeatured: true,
    isRunway: true
  },
  {
    id: 'clo-003',
    name: 'Merino Wool Sculptural Turtleneck Knit',
    slug: 'merino-wool-sculptural-turtleneck-knit',
    subtitle: '16-Gauge Ultra-Fine Extrafine Merino | Seamless 3D Knit',
    price: 195,
    compareAtPrice: 240,
    rating: 4.8,
    reviewsCount: 34,
    badge: 'BESTSELLER',
    category: 'women',
    subcategory: 'knitwear',
    gender: 'women',
    description: 'Seamlessly engineered using Japanese zero-waste 3D knitting technology. Features a standing architectural funnel neck that holds its form without constriction.',
    details: [
      '100% 19.5-micron Tasmanian Extrafine Merino Wool',
      'Zero-waste whole-garment 3D knitting with no abrasive seams',
      'Ribbed elongated cuffs with subtle thumb slits for winter layering',
      'Naturally thermoregulating, anti-microbial and wrinkle resistant'
    ],
    composition: '100% Tasmanian Extrafine Merino Wool (16-Gauge)',
    care: ['Hand wash cold with wool detergent or delicate dry clean', 'Dry flat away from direct heat', 'Do not tumble dry'],
    origin: 'Spun and knitted in Kyoto, Japan',
    sustainability: {
      materials: 'ZQRX certified regenerative merino wool with zero animal mulesing.',
      certifications: ['ZQRX Certified', 'Cradle to Cradle Gold'],
      carbonOffset: 'Net-zero production footprint utilizing Japanese geothermal energy.',
      traceability: 'Direct farm audit from Tasmania station #T-42.'
    },
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Chalk White', hex: '#F9F8F5', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=85' },
      { name: 'Oatmeal Taupe', hex: '#D6C8B8', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=85' },
      { name: 'Carbon Black', hex: '#1C1D21', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'XS', stock: 6, sku: 'CLO-003-XS' },
      { size: 'S', stock: 12, sku: 'CLO-003-S' },
      { size: 'M', stock: 14, sku: 'CLO-003-M' },
      { size: 'L', stock: 7, sku: 'CLO-003-L' }
    ],
    fitNotes: 'Second-skin fit that retains its structure. Perfect for tucking into high-rise tailoring.',
    modelSpecs: 'Model is 176cm / 5\'9.5" and wears size S.',
    sku: 'CLT-KNIT-MER-003',
    completeTheLookIds: ['clo-005', 'clo-009'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'clo-004',
    name: 'Men’s Atelier Double-Breasted Tailored Coat',
    slug: 'mens-atelier-double-breasted-tailored-coat',
    subtitle: 'Super 150s Virgin Wool & Cashmere | Savile Row Structure',
    price: 740,
    compareAtPrice: 890,
    rating: 5.0,
    reviewsCount: 19,
    badge: 'NEW SEASON',
    category: 'men',
    subcategory: 'outerwear',
    gender: 'men',
    description: 'A monument to modern masculine tailoring. Built with a full canvas floating chest piece, roped shoulder expression, and an elongated 6x2 double-breasted stance.',
    details: [
      'Full floating horsehair canvas interlining for supreme chest shaping',
      'Super 150s Virgin Wool blended with 15% Mongolian Cashmere (520gsm)',
      'Hand-sewn milanese buttonhole on left lapel',
      'Cupro jacquard lining featuring the subtle CLOTHYYY watermark',
      'Dual deep internal cigar/smartphone pockets'
    ],
    composition: '85% Super 150s Virgin Wool, 15% Cashmere (Loro Piana Mills, Biella)',
    care: ['Professional dry clean only', 'Store on broad wooden shoulder hanger', 'Steam gently when required'],
    origin: 'Hand-tailored in Naples, Italy',
    sustainability: {
      materials: 'RWS (Responsible Wool Standard) certified wool with zero toxic dye residues.',
      certifications: ['RWS Certified', 'Loro Piana Green Label'],
      carbonOffset: 'Shipped in biodegradable FSC-certified garment box with climate tracking.',
      traceability: 'Audited mills in Biella, Northern Italy.'
    },
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Charcoal Shadow', hex: '#222328', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85' },
      { name: 'Midnight Navy', hex: '#151C2C', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=85' },
      { name: 'Espresso Melange', hex: '#3E342F', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'IT 46 / US 36', stock: 3, sku: 'CLO-004-46' },
      { size: 'IT 48 / US 38', stock: 7, sku: 'CLO-004-48' },
      { size: 'IT 50 / US 40', stock: 10, sku: 'CLO-004-50' },
      { size: 'IT 52 / US 42', stock: 5, sku: 'CLO-004-52' },
      { size: 'IT 54 / US 44', stock: 2, sku: 'CLO-004-54' }
    ],
    fitNotes: 'Structured tailoring with defined shoulders and a relaxed drape through the waist.',
    modelSpecs: 'Model is 188cm / 6\'2" with 98cm chest, wearing size IT 48 / US 38.',
    sku: 'CLT-MEN-COAT-004',
    completeTheLookIds: ['clo-006', 'clo-008', 'clo-012'],
    isFeatured: true,
    isNewIn: true,
    isRunway: true
  },
  {
    id: 'clo-005',
    name: 'Pleated Wide-Leg Palazzo Wool Trousers',
    slug: 'pleated-wide-leg-palazzo-wool-trousers',
    subtitle: 'High-Waisted Architectural Drape | Italian Tropical Wool',
    price: 240,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'NEW SEASON',
    category: 'women',
    subcategory: 'trousers',
    gender: 'women',
    description: 'High-rise trousers cut with double deep forward pleats and an expansive wide-leg volume. Designed to pool gently over boots or pointed heels.',
    details: [
      'High-waisted silhouette with extended tab waistband and buckle adjusters',
      'Double forward deep pleats engineered for fluid stride movement',
      'Pure Italian tropical lightweight wool that resists creasing',
      'Slanted side pockets and rear welt pockets with horn buttons',
      'Unfinished 92cm inseam with complimentary hem tailoring available'
    ],
    composition: '100% Superfine Tropical Virgin Wool (Vitale Barberis Canonico)',
    care: ['Dry clean only', 'Press with damp cloth', 'Hang by the cuffs to preserve crease lines'],
    origin: 'Made in Milan, Italy',
    sustainability: {
      materials: 'ZQ Certified ethical wool with closed-circuit water finishing.',
      certifications: ['OEKO-TEX Class 1', 'RWS Wool'],
      carbonOffset: 'Zero single-use plastics in transport.',
      traceability: 'From wool clip to Milan atelier fully certified.'
    },
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Ecru Chalk', hex: '#ECE8E1', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=85' },
      { name: 'Onyx Black', hex: '#121316', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'FR 34 / US 2', stock: 4, sku: 'CLO-005-34' },
      { size: 'FR 36 / US 4', stock: 8, sku: 'CLO-005-36' },
      { size: 'FR 38 / US 6', stock: 11, sku: 'CLO-005-38' },
      { size: 'FR 40 / US 8', stock: 5, sku: 'CLO-005-40' }
    ],
    fitNotes: 'High-rise waist. Designed to fit snug at the natural waist and flow freely through the hips.',
    modelSpecs: 'Model is 178cm / 5\'10" and wears size FR 36.',
    sku: 'CLT-WMN-TRS-005',
    completeTheLookIds: ['clo-001', 'clo-003', 'clo-009'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'clo-006',
    name: 'Heavyweight Cashmere Crewneck Sweater',
    slug: 'heavyweight-cashmere-crewneck-sweater',
    subtitle: '7-Gauge 4-Ply Cashmere | Hand-Linked Collar',
    price: 310,
    compareAtPrice: 380,
    rating: 4.9,
    reviewsCount: 41,
    badge: 'BESTSELLER',
    category: 'men',
    subcategory: 'knitwear',
    gender: 'men',
    description: 'An enduring wardrobe cornerstone. Knitted from ultra-dense 4-ply Mongolian cashmere for extraordinary warmth, sublime loft, and resistance to pilling.',
    details: [
      'Dense 7-gauge 4-ply pure cashmere yarn',
      'Hand-linked ribbed collar that maintains elasticity',
      'Raglan shoulder construction for unimpeded movement',
      'Ribbed cuffs and hem with subtle recovery elastane core'
    ],
    composition: '100% Grade A Mongolian Cashmere',
    care: ['Gentle hand wash in lukewarm water with cashmere shampoo', 'Roll in towel to remove moisture', 'Dry flat'],
    origin: 'Crafted in Hawick, Scotland',
    sustainability: {
      materials: 'Sustainably comb-harvested cashmere from free-roaming nomadic herds.',
      certifications: ['GOTS Approved Dyeing', 'Scottish Heritage Mill Guarantee'],
      carbonOffset: '100% neutralized delivery.',
      traceability: 'Single-source certified yarn.'
    },
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Oatmeal Heather', hex: '#DDD2C3', image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=85' },
      { name: 'Obsidian Noir', hex: '#111215', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=85' },
      { name: 'Forest Moss', hex: '#3B4738', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'S / US 38', stock: 4, sku: 'CLO-006-S' },
      { size: 'M / US 40', stock: 12, sku: 'CLO-006-M' },
      { size: 'L / US 42', stock: 15, sku: 'CLO-006-L' },
      { size: 'XL / US 44', stock: 6, sku: 'CLO-006-XL' }
    ],
    fitNotes: 'Regular modern fit. Fits true to size with comfortable room for a shirt underneath.',
    modelSpecs: 'Model is 187cm / 6\'1.5" and wears size M.',
    sku: 'CLT-MEN-KNT-006',
    completeTheLookIds: ['clo-004', 'clo-008', 'clo-012'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'clo-007',
    name: 'The Sculpted Origami Silk Evening Cape',
    slug: 'the-sculpted-origami-silk-evening-cape',
    subtitle: 'Hand-Pleated Mulberry Gazar | Runway Archive Edition',
    price: 890,
    rating: 5.0,
    reviewsCount: 9,
    badge: 'ATELIER EXCLUSIVE',
    category: 'couture',
    subcategory: 'outerwear',
    gender: 'women',
    description: 'An exhibition-level showpiece from the Autumn/Winter Runway. Constructed from 48 meters of architectural Japanese silk gazar, precision hand-folded and steam-set over 72 hours.',
    details: [
      'Pure Japanese Silk Gazar with stiffened hand-creased facets',
      'Magnetic neck closure concealed beneath hand-cast bronze medallion',
      'Internal grosgrain shoulder harness to balance cape weight dynamically',
      'Limited production run of only 25 pieces worldwide with engraved edition number',
      'Includes bespoke velvet-lined wooden archival chest'
    ],
    composition: '100% Japanese Silk Gazar (Yokohama Looms)',
    care: ['Archival museum dry clean only', 'Keep away from moisture and direct sunlight', 'Do not iron pleats'],
    origin: 'Hand-sculpted in Paris Atelier',
    sustainability: {
      materials: 'Cradle-to-Cradle Gold certified natural silk fibers.',
      certifications: ['Cradle to Cradle Gold', 'UNESCO Living Heritage Craft'],
      carbonOffset: '100% emission certified.',
      traceability: 'Serialized edition with physical NFT authentication token.'
    },
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Imperial Obsidian', hex: '#0A0A0C', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85' },
      { name: 'Burnished Gold Gazar', hex: '#C5A880', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'Taille Unique / One Size', stock: 2, sku: 'CLO-007-OS' }
    ],
    fitNotes: 'Universal sculptural silhouette with interior ergonomic harness that fits all body types.',
    modelSpecs: 'Model is 181cm / 5\'11.5".',
    sku: 'CLT-RUNWAY-CAP-007',
    completeTheLookIds: ['clo-002', 'clo-010', 'clo-011'],
    isFeatured: true,
    isRunway: true
  },
  {
    id: 'clo-008',
    name: 'Japanese Selvedge Wool Tailored Trousers',
    slug: 'japanese-selvedge-wool-tailored-trousers',
    subtitle: 'Shuttle-Loomed Okayama Wool-Cotton | Single Forward Pleat',
    price: 210,
    rating: 4.8,
    reviewsCount: 18,
    badge: 'NEW SEASON',
    category: 'men',
    subcategory: 'trousers',
    gender: 'men',
    description: 'Woven on vintage 1950s Toyoda shuttle looms in Kojima, Japan. Combines the tactile grain of raw selvedge with the refined drape of worsted wool.',
    details: [
      'Woven with distinctive red selvedge ID visible on cuff turnaround',
      'Internal curtained waistband tailored from breathable cotton sateen',
      'Side waist adjusters with brushed gunmetal hardware',
      'Natural horn buttons and heavy-duty YKK Excella zipper'
    ],
    composition: '65% Worsted Wool, 35% Organic Long-Staple Cotton (Okayama, Japan)',
    care: ['Gentle dry clean or cold soak by hand', 'Hang dry in shade', 'Do not tumble dry'],
    origin: 'Tailored in Okayama, Japan',
    sustainability: {
      materials: 'Organic cotton and non-mulesed wool loomed using low-speed vintage mechanics.',
      certifications: ['GOTS Organic Cotton', 'Japan Selvedge Guild'],
      carbonOffset: 'Direct green freight to Gulf and European hubs.',
      traceability: 'Numbered selvedge batch tag.'
    },
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Graphite Charcoal', hex: '#2A2C31', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=85' },
      { name: 'Raw Sandstone', hex: '#C7BCAE', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'EU 46 / W30', stock: 4, sku: 'CLO-008-30' },
      { size: 'EU 48 / W32', stock: 9, sku: 'CLO-008-32' },
      { size: 'EU 50 / W34', stock: 11, sku: 'CLO-008-34' },
      { size: 'EU 52 / W36', stock: 6, sku: 'CLO-008-36' }
    ],
    fitNotes: 'Medium-high rise with gentle taper from knee to hem. Unfinished 88cm hem allows bespoke length.',
    modelSpecs: 'Model is 186cm / 6\'1" wearing EU 48 / W32.',
    sku: 'CLT-MEN-TRS-008',
    completeTheLookIds: ['clo-004', 'clo-006', 'clo-012'],
    isFeatured: false
  },
  {
    id: 'clo-009',
    name: 'The Arches Tuscan Calfskin Structured Tote',
    slug: 'the-arches-tuscan-calfskin-structured-tote',
    subtitle: 'Vegetable-Tanned Full Grain Leather | Hand-Painted Edge Lacquer',
    price: 490,
    compareAtPrice: 580,
    rating: 5.0,
    reviewsCount: 37,
    badge: 'BESTSELLER',
    category: 'accessories',
    subcategory: 'bags',
    gender: 'unisex',
    description: 'A structural totem designed with purest geometry. Handcrafted from 2.2mm full-grain Tuscan calfskin with seven coats of hand-buffed edge sealant and solid brass hardware.',
    details: [
      'Full-grain vegetable-tanned French calfskin leather',
      'Solid architectural brass feet and bridge lock with brushed finish',
      'Soft lambskin nappa interior lining with magnetic phone and card slots',
      'Detachable and adjustable leather shoulder strap (48cm - 58cm drop)',
      'Dimensions: 34cm (W) x 26cm (H) x 13cm (D) | Fits 13" laptop'
    ],
    composition: '100% Full-Grain Tuscan Calfskin, 100% Lambskin Nappa Lining',
    care: ['Condition twice yearly with natural beeswax leather balm', 'Avoid prolonged contact with water', 'Store in cotton dust bag with paper stuffing'],
    origin: 'Handmade in Santa Croce sull\'Arno, Tuscany',
    sustainability: {
      materials: 'Consorzio Vera Pelle certified vegetable tanning using chestnut and mimosa tannins.',
      certifications: ['Consorzio Vera Pelle Italiana', 'LWG Gold Medal Tannery'],
      carbonOffset: 'Carbon-neutral regional logistics in Northern Italy.',
      traceability: 'Serialized guarantee certificate included.'
    },
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Caramel Cuoio', hex: '#8B5A2B', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85' },
      { name: 'Onyx Polish', hex: '#141416', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=85' },
      { name: 'Alabaster Chalk', hex: '#EBE6DC', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'Medium (34cm)', stock: 5, sku: 'CLO-009-MED' },
      { size: 'Grande (40cm)', stock: 3, sku: 'CLO-009-LRG' }
    ],
    fitNotes: 'Structured base that holds its architectural shape whether empty or full.',
    modelSpecs: 'Includes dust bag, care balm, and solid brass serial tag.',
    sku: 'CLT-ACC-BAG-009',
    completeTheLookIds: ['clo-001', 'clo-005', 'clo-010'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'clo-010',
    name: 'Sculptural Pointed Heel Leather Mules',
    slug: 'sculptural-pointed-heel-leather-mules',
    subtitle: 'Hand-Carved Brushed Brass Heel | Glove-Soft Kidskin',
    price: 360,
    rating: 4.9,
    reviewsCount: 15,
    badge: 'NEW SEASON',
    category: 'accessories',
    subcategory: 'footwear',
    gender: 'women',
    description: 'An elongated, razor-sharp pointed toe balanced against a bespoke 75mm geometric brass heel carved with architectural balance.',
    details: [
      'Glove-soft Italian kidskin leather with memory foam padded insole',
      'Hand-cast architectural brass heel with matte satin lacquer',
      'Natural hand-stitched leather sole with protective rubber injected island',
      '75mm (2.9 inch) ergonomically centered heel height'
    ],
    composition: '100% Italian Kidskin Leather, Solid Cast Brass Heel',
    care: ['Store with shoe trees', 'Protect brass heel from abrasive surfaces', 'Professional cobbler maintenance'],
    origin: 'Crafted in Civitanova Marche, Italy',
    sustainability: {
      materials: 'Chromium-free tanned kidskin sourced from certified Italian family farms.',
      certifications: ['OEKO-TEX Leather Standard', 'LWG Certified'],
      carbonOffset: '100% neutralized delivery.',
      traceability: 'Tannery batch #CV-902.'
    },
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Midnight Onyx', hex: '#101114', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=85' },
      { name: 'Porcelain Ivory', hex: '#F3EFE9', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'EU 36 / US 6', stock: 2, sku: 'CLO-010-36' },
      { size: 'EU 37 / US 7', stock: 6, sku: 'CLO-010-37' },
      { size: 'EU 38 / US 8', stock: 8, sku: 'CLO-010-38' },
      { size: 'EU 39 / US 9', stock: 4, sku: 'CLO-010-39' },
      { size: 'EU 40 / US 10', stock: 2, sku: 'CLO-010-40' }
    ],
    fitNotes: 'Fits true to European sizing. For wider feet, consider taking a half size up.',
    modelSpecs: 'Comes with travel shoe bags and replacement brass tap tips.',
    sku: 'CLT-ACC-SHOE-010',
    completeTheLookIds: ['clo-002', 'clo-005', 'clo-009'],
    isFeatured: true
  },
  {
    id: 'clo-011',
    name: 'Geometric Heavyweight Silk Twill Scarf 90cm',
    slug: 'geometric-heavyweight-silk-twill-scarf',
    subtitle: 'Hand-Screen Printed 18mm Silk Twill | Hand-Rolled French Edge',
    price: 135,
    rating: 4.9,
    reviewsCount: 48,
    badge: 'BESTSELLER',
    category: 'accessories',
    subcategory: 'silk-scarves',
    gender: 'unisex',
    description: 'An abstract architectural print reflecting light through structural arches. Hand-screen printed in 14 individual color passes on heavy 18mm mulberry silk twill.',
    details: [
      '100% Pure Mulberry Silk Twill (18mm heavyweight)',
      '14-pass traditional artisanal screen printing with water-soluble inks',
      'Artisanal hand-rolled and hand-sewn hem taking 45 minutes per piece',
      'Dimensions: 90cm x 90cm (35.4" x 35.4")',
      'Delivered in embossed round presentation box with ribbon'
    ],
    composition: '100% Grade 6A Silk Twill (Lyon, France)',
    care: ['Dry clean only', 'Do not bleach', 'Iron on silk setting with pressing cloth'],
    origin: 'Printed in Lyon, France',
    sustainability: {
      materials: 'GOTS certified mulberry silk printed with non-hazardous inks.',
      certifications: ['GOTS Certified', 'OEKO-TEX Class 1'],
      carbonOffset: '100% neutralized transport.',
      traceability: 'Silk harvest from certified French-managed organic sericulture.'
    },
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Ochre & Slate', hex: '#B8976C', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=85' },
      { name: 'Monochrome Noir', hex: '#16171B', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: '90 x 90 cm', stock: 15, sku: 'CLO-011-90' }
    ],
    fitNotes: 'Generous 90cm square suitable for neck drape, hair tie, or accessory wrapping.',
    modelSpecs: 'Hand-rolled edges by master hem-makers.',
    sku: 'CLT-ACC-SLK-011',
    completeTheLookIds: ['clo-001', 'clo-004', 'clo-009'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'clo-012',
    name: 'Men’s Hand-Welted Calfskin Chelsea Boots',
    slug: 'mens-hand-welted-calfskin-chelsea-boots',
    subtitle: 'Goodyear Welted French Box Calf | Beveled Waist Leather Sole',
    price: 430,
    compareAtPrice: 510,
    rating: 5.0,
    reviewsCount: 26,
    badge: 'NEW SEASON',
    category: 'men',
    subcategory: 'footwear',
    gender: 'men',
    description: 'Constructed on our proprietary chisel-toe last. Cut from whole-cut French box calf leather with a Goodyear-welted construction that can be resoled for decades of wear.',
    details: [
      'Full-grain French box calf from Tanneries du Puy',
      'Genuine Goodyear welt construction with hand-beveled fiddleback waist',
      'Hand-dyed oak-bark tanned leather sole (Baker of England)',
      'Heavy-duty Italian tonal elastic side gussets for effortless on-and-off',
      'Solid brass heel nails and internal cork footbed that molds to feet'
    ],
    composition: '100% Full-Grain French Box Calf, Oak-Bark Leather Sole',
    care: ['Condition with Saphir Medaille d’Or cream', 'Use cedar shoe trees after each wear', 'Resole at authorized atelier cobbler'],
    origin: 'Handcrafted in Northampton, England',
    sustainability: {
      materials: 'Tanneries du Puy certified hides tanned with vegetable tree bark extracts.',
      certifications: ['LWG Gold Certified', 'English Master Guild'],
      carbonOffset: '100% neutralized packaging.',
      traceability: 'Tannery serial #DP-817.'
    },
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    swatches: [
      { name: 'Deep Espresso', hex: '#2F231D', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=85' },
      { name: 'Polished Noir', hex: '#111215', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=85' }
    ],
    sizes: [
      { size: 'UK 7 / US 8', stock: 3, sku: 'CLO-012-07' },
      { size: 'UK 8 / US 9', stock: 6, sku: 'CLO-012-08' },
      { size: 'UK 9 / US 10', stock: 8, sku: 'CLO-012-09' },
      { size: 'UK 10 / US 11', stock: 5, sku: 'CLO-012-10' },
      { size: 'UK 11 / US 12', stock: 2, sku: 'CLO-012-11' }
    ],
    fitNotes: 'Traditional English dress last. Fits true to UK sizing. Order half size down from US sneaker size.',
    modelSpecs: 'Supplied with solid cedar shoe trees and dust bags.',
    sku: 'CLT-MEN-BOOT-012',
    completeTheLookIds: ['clo-004', 'clo-006', 'clo-008'],
    isFeatured: true
  }
];
