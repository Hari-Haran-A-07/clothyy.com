import { Lookbook } from '../types';

export const LOOKBOOKS: Lookbook[] = [
  {
    id: 'lookbook-aw26',
    title: "LOOK 01 — THE MONOLITH COAT & PALAZZO SILK",
    season: "Autumn / Winter 2026",
    photographer: "Sebastián De La Tour",
    location: "Palazzo Grassi, Venice",
    description: "A dialogue between brutalist monolithic tailoring and the liquid drape of 40mm silk crepe.",
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'hs-1',
        x: 48,
        y: 28,
        productId: 'clo-001',
        title: 'The Monolith Double-Faced Cashmere Overcoat',
        price: 680,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85'
      },
      {
        id: 'hs-2',
        x: 52,
        y: 65,
        productId: 'clo-005',
        title: 'Pleated Wide-Leg Palazzo Wool Trousers',
        price: 240,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=85'
      },
      {
        id: 'hs-3',
        x: 68,
        y: 50,
        productId: 'clo-009',
        title: 'The Arches Tuscan Calfskin Structured Tote',
        price: 490,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85'
      }
    ]
  },
  {
    id: 'lookbook-couture',
    title: "LOOK 02 — SCULPTURAL EVENING GAUGES",
    season: "Atelier Haute Couture",
    photographer: "Helena Lindqvist",
    location: "Villa Savoye, Poissy",
    description: "Fluid asymmetry rendered in pure mulberry silk, balanced with hand-cast brushed brass accessories.",
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'hs-4',
        x: 45,
        y: 35,
        productId: 'clo-002',
        title: 'Architectural Silk Crepe Asymmetric Gown',
        price: 520,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=85'
      },
      {
        id: 'hs-5',
        x: 48,
        y: 85,
        productId: 'clo-010',
        title: 'Sculptural Pointed Heel Leather Mules',
        price: 360,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=85'
      }
    ]
  },
  {
    id: 'lookbook-mens',
    title: "LOOK 03 — ARCHITECTURAL DOUBLE-BREASTED & SELVEDGE",
    season: "Men's Sartorial Line",
    photographer: "Marcus Vance",
    location: "Barbican Centre, London",
    description: "Classic Savile Row floating canvas tailoring paired with Japanese shuttle-loomed wool selvedge.",
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'hs-6',
        x: 50,
        y: 30,
        productId: 'clo-004',
        title: 'Men’s Atelier Double-Breasted Tailored Coat',
        price: 740,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85'
      },
      {
        id: 'hs-7',
        x: 50,
        y: 48,
        productId: 'clo-006',
        title: 'Heavyweight Cashmere Crewneck Sweater',
        price: 310,
        image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=85'
      },
      {
        id: 'hs-8',
        x: 50,
        y: 88,
        productId: 'clo-012',
        title: 'Men’s Hand-Welted Calfskin Chelsea Boots',
        price: 430,
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=85'
      }
    ]
  }
];
