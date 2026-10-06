import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    title: "The Architecture of Silence: Deconstructing the Double-Faced Coat",
    subtitle: "Inside our Florence Atelier where two layers of pure cashmere are split and hand-sewn invisibly.",
    slug: 'architecture-of-silence-deconstructing-the-coat',
    category: 'Craftsmanship',
    readTime: '6 min read',
    publishedAt: 'October 2026',
    author: {
      name: 'Matteo Bellini',
      role: 'Master Tailor & Head of Atelier',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'True double-faced luxury requires no internal synthetic canvases or glue. Every hem is carefully divided by hand to a depth of precisely six millimeters, folded inward, and fastened with single-thread blind stitches.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85'
    ],
    content: [
      'When we conceived the Autumn/Winter collection for CLOTHYYY, our guiding principle was the removal of all superfluous ornament. In an era saturated with visual noise, true luxury is felt in weightlessness, silence, and sculptural balance.',
      'Double-faced cashmere represents the pinnacle of European tailoring. Unlike conventional outerwear that relies on fused interfacings, double-faced cloth consists of two distinct fabric faces woven together on specialized dual-beam looms. When tailoring begins, our artisans manually slice the joining yarns to open the edge, turn both sides inward, and stitch them closed with invisible needlework that takes up to 18 hours per garment.',
      'The result is a coat that is completely unlined, reversible in beauty, and as soft against the skin inside as it is outside. It flows naturally with the body’s kinetic movement rather than restricting it.'
    ],
    tags: ['Cashmere', 'Florence Atelier', 'Craftsmanship', 'Minimalism', 'Tailoring']
  },
  {
    id: 'art-02',
    title: "The Japanese Selvedge Loom: Preserving 1950s Shuttle Mechanics",
    subtitle: "Why low-tension Toyoda looms in Okayama create texture and drape that modern machines cannot replicate.",
    slug: 'japanese-selvedge-loom-shuttle-mechanics',
    category: 'Atelier',
    readTime: '8 min read',
    publishedAt: 'September 2026',
    author: {
      name: 'Kenji Takahashi',
      role: 'Textile Archivist & Weaving Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'Modern industrial projectile looms weave fabric at blinding speeds, stripping the fiber of its natural breathability. In Okayama, vintage wooden shuttle looms operate at a rhythmic whisper.',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85'
    ],
    content: [
      'There is a tactile language in cloth that can only be created by human-paced mechanics. In the hills surrounding Kojima, the rhythm of vintage 1950s Toyoda G3 shuttle looms has remained uninterrupted for seven decades.',
      'Unlike high-speed air-jet machines that tension yarns to their breaking point, shuttle looms feed the weft yarn back and forth across a wooden shuttle with natural slack. This allows the worsted wool and long-staple organic cotton fibers to retain their microscopic air pockets.',
      'When worn, CLOTHYYY selvedge trousers adapt to the wearer’s natural body heat, molding to their shape while maintaining a crisp architectural crease line.'
    ],
    tags: ['Japan', 'Selvedge', 'Textiles', 'Sustainability', 'Trousers']
  },
  {
    id: 'art-03',
    title: "The Art of the Evening Drape: Bias Cutting 40mm Mulberry Silk",
    subtitle: "Mastering the mathematics of diagonal grain elasticity invented by Madeleine Vionnet.",
    slug: 'art-of-evening-drape-bias-cutting-silk',
    category: 'Style Guide',
    readTime: '5 min read',
    publishedAt: 'August 2026',
    author: {
      name: 'Claire Dupont',
      role: 'Couture Pattern Drafter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'Cutting fabric at a 45-degree angle transforms static woven silk into a dynamic, liquid second skin that cascades naturally around the feminine form without requiring constricting corsetry.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'
    ],
    content: [
      'Fabric woven on a loom has two primary grainlines: warp and weft. When cut on the straight grain, silk behaves with crisp structural planes. But when tilted exactly 45 degrees, the weave gains natural physical elasticity.',
      'For the CLOTHYYY Asymmetric Gown, our Lyon atelier uses 40mm heavy silk crepe de chine. Each garment piece is suspended on mannequin forms for 48 hours before hem-rolling to allow the bias stretch to stabilize completely.',
      'This painstaking process ensures the hem will hang true forever, moving like water when the wearer walks into the evening gala.'
    ],
    tags: ['Silk', 'Couture', 'Eveningwear', 'Design History', 'Lyon']
  }
];
