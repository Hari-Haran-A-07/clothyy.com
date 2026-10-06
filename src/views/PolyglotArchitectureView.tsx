import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Server, Database, Code, ShieldCheck, Zap, Globe, 
  Terminal, Sparkles, RefreshCw, CheckCircle2, ChevronRight, 
  Layers, Lock, Sliders, Play, FileCode, Activity, Building2, Crown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PolyglotService {
  id: string;
  language: string;
  langColor: string;
  serviceName: string;
  role: string;
  port: number;
  dockerContainer: string;
  framework: string;
  keyFeatures: string[];
  sampleCode: string;
}

const POLYGLOT_SERVICES: PolyglotService[] = [
  {
    id: 'ts',
    language: 'TypeScript',
    langColor: 'bg-blue-600 text-white',
    serviceName: 'BFF Gateway & Edge Orchestrator',
    role: 'API schema stitching, JWT session validation, client data aggregation',
    port: 8080,
    dockerContainer: 'clothyyy-gateway-ts',
    framework: 'Express / Node.js 20 & Bun Edge',
    keyFeatures: ['Schema Federation', 'Strict Type-Safety', 'OpenAPI v3 Generation', 'Rate Throttling'],
    sampleCode: `// services/bff-gateway-ts/server.ts
export class PolyglotOrchestrator {
  async aggregateFleetStatus(): Promise<FleetHealth> {
    const services = await Promise.all([
      fetch('http://rate-go:8081/health'),
      fetch('http://ai-python:8082/health'),
      fetch('http://vault-rust:8083/health'),
      fetch('http://ledger-csharp:8084/api/v1/ledger/health'),
      fetch('http://inventory-java:8085/api/v1/inventory/health')
    ]);
    return { status: "ALL_SYSTEMS_OPTIMAL", latencyP99: "4.2ms" };
  }
}`
  },
  {
    id: 'js',
    language: 'JavaScript',
    langColor: 'bg-yellow-500 text-black',
    serviceName: 'Real-Time Telemetry & Event Streamer',
    role: 'WebSocket boutique traffic stream, cart telemetry, live analytics',
    port: 8089,
    dockerContainer: 'clothyyy-stream-js',
    framework: 'Node.js 20 ES Modules & WebSockets (ws)',
    keyFeatures: ['Sub-millisecond Event Fanout', 'Service Worker Cache Curation', 'Live Shopper Feed'],
    sampleCode: `// services/realtime-stream-js/analytics-streamer.js
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8089 });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    event: 'VIP_PRESENCE_DETECTED',
    boutique: 'Kuwait City Flagship',
    liveShoppers: 128
  }));
});`
  },
  {
    id: 'go',
    language: 'Go (Golang)',
    langColor: 'bg-cyan-500 text-white',
    serviceName: 'Ultra-Low Latency Rate & Security Gateway',
    role: 'Sub-microsecond currency conversions (KWD base) & Token Bucket DDoS mitigation',
    port: 8081,
    dockerContainer: 'clothyyy-rate-go',
    framework: 'Go 1.22 Standard Net/HTTP & Gorilla Mux',
    keyFeatures: ['Zero GC Allocation Hotpath', 'Atomic Mutex Currency Table', 'Token Bucket Limiter'],
    sampleCode: `// services/rate-gateway-go/currency_engine.go
func (ce *CurrencyEngine) ConvertPrice(amountKWD float64, curr string) (float64, int64) {
    ce.mu.RLock()
    defer ce.mu.RUnlock()
    rate := ce.rates[curr]
    return amountKWD * rate, time.Since(start).Microseconds()
}`
  },
  {
    id: 'python',
    language: 'Python',
    langColor: 'bg-emerald-600 text-white',
    serviceName: 'Neural AI Stylist & Vision Engine',
    role: 'Haute couture aesthetic generation, moodboard vector matching, dynamic valuation',
    port: 8082,
    dockerContainer: 'clothyyy-ai-python',
    framework: 'Python 3.12, FastAPI, PyTorch, Scikit-Learn',
    keyFeatures: ['Cosine Vector Search', 'Haute Couture Rule Classifier', 'Scarcity Dynamic Pricing'],
    sampleCode: `# services/ai-engine-python/stylist_ai.py
@app.post("/api/v1/stylist/curate")
def curate_look(req: StylistRequest):
    palette = color_harmonies.get(req.base_color)
    return {
        "silhouette": "Architectural Column Eveningwear",
        "hero_piece": "Silk Georgette Gown",
        "confidence_score": 0.985
    }`
  },
  {
    id: 'rust',
    language: 'Rust',
    langColor: 'bg-orange-600 text-white',
    serviceName: 'Cryptographic Vault & Order Integrity',
    role: 'Zero-allocation SHA-256 HMAC order seals, high-value signature verification',
    port: 8083,
    dockerContainer: 'clothyyy-vault-rust',
    framework: 'Rust 1.77 & Actix-Web / WASM Core',
    keyFeatures: ['Memory Safety Guaranteed', 'Constant-Time Hash Verification', 'WASM Image Optimizer'],
    sampleCode: `// services/crypto-vault-rust/src/hasher.rs
pub fn generate_order_seal(order_number: &str, cust_id: &str, amount_kwd: f64) -> String {
    let payload = format!("{}:{}:{:.3}", order_number, cust_id, amount_kwd);
    let mut hasher = Sha256::new();
    hasher.update(payload.as_bytes());
    format!("CLOTHYYY_SEAL_V1_{}", hex::encode(hasher.finalize()))
}`
  },
  {
    id: 'csharp',
    language: 'C# (.NET 9)',
    langColor: 'bg-purple-700 text-white',
    serviceName: 'Financial Ledger & GCC Tax Settlement',
    role: 'ZATCA / FTA tax calculations, KNET/Tabby double-entry journal settlement',
    port: 8084,
    dockerContainer: 'clothyyy-ledger-csharp',
    framework: 'C# / ASP.NET Core 9.0 Web API',
    keyFeatures: ['Double-Entry Ledger Integrity', 'ZATCA 15% / FTA 5% Tax Rules', 'IFRS-15 Compliance'],
    sampleCode: `// services/financial-ledger-csharp/Controllers/LedgerController.cs
[HttpPost("invoice")]
public IActionResult GenerateInvoice([FromBody] InvoiceRequest request) {
    var invoice = _taxService.CalculateAndJournal(request);
    return Ok(invoice);
}`
  },
  {
    id: 'java',
    language: 'Java',
    langColor: 'bg-red-700 text-white',
    serviceName: 'Global Inventory & Multi-Hub Warehouse Core',
    role: 'Project Loom virtual threads, multi-hub stock reservations (Kuwait, Dubai, Paris, Tokyo)',
    port: 8085,
    dockerContainer: 'clothyyy-inventory-java',
    framework: 'Java 21 & Spring Boot 3.2.3 Enterprise',
    keyFeatures: ['Virtual Threads (Loom)', 'Distributed Multi-Hub Allocation', 'Kafka Event Stream'],
    sampleCode: `// services/inventory-core-java/service/InventoryService.java
@Service
public class InventoryService {
    public StockReservationDto reserveStock(String sku, String size, int qty, String hub) {
        boolean success = stockGrid.get(sku).get(hub) >= qty;
        return new StockReservationDto(sku, size, qty, hub, success, Instant.now());
    }
}`
  },
  {
    id: 'kotlin',
    language: 'Kotlin',
    langColor: 'bg-violet-600 text-white',
    serviceName: 'VIP Concierge & Private Salon Engine',
    role: 'High-net-worth client fittings, master tailor allocation, private lounge access',
    port: 8086,
    dockerContainer: 'clothyyy-vip-kotlin',
    framework: 'Kotlin 1.9 & Ktor Netty Asynchronous Engine',
    keyFeatures: ['Asynchronous Coroutines', 'Private Salon Dispatcher', 'VIP Push Hub'],
    sampleCode: `// services/vip-concierge-kotlin/Application.kt
routing {
    post("/api/v1/vip/book-salon") {
        val req = call.receive<VipConsultationRequest>()
        val response = vipService.schedulePrivateSalon(req)
        call.respond(response)
    }
}`
  },
  {
    id: 'php',
    language: 'PHP',
    langColor: 'bg-indigo-600 text-white',
    serviceName: 'Headless CMS & Editorial Delivery',
    role: 'High-speed JIT article publishing, campaign metadata, lookbook narratives',
    port: 8087,
    dockerContainer: 'clothyyy-cms-php',
    framework: 'PHP 8.3 Modern JIT Engine',
    keyFeatures: ['PSR-4 Strict Typing', 'OPcache JIT Acceleration', 'Headless JSON Feed'],
    sampleCode: `// services/headless-cms-php/src/CmsController.php
public function handleRequest(string $uri, string $method): void {
    if ($path === '/api/v1/cms/articles') {
        echo json_encode([
            'count' => count($this->repo->getAllArticles()),
            'engine' => 'PHP 8.3 JIT High-Throughput Engine'
        ]);
    }
}`
  },
  {
    id: 'ruby',
    language: 'Ruby',
    langColor: 'bg-rose-700 text-white',
    serviceName: 'Royal Black VIP Loyalty & Privileges Engine',
    role: 'Tier progression, point multipliers, private client perks, white-glove chauffeur triggers',
    port: 8088,
    dockerContainer: 'clothyyy-loyalty-ruby',
    framework: 'Ruby 3.3 & Sinatra / Puma',
    keyFeatures: ['Royal Tier Calculation', 'Dynamic Points Multiplier', 'Concierge Chauffeur Triggers'],
    sampleCode: `// services/loyalty-engine-ruby/services/loyalty_tier_service.rb
def self.calculate_status(lifetime_spend_kwd)
  tier = case lifetime_spend_kwd
         when 15_000..Float::INFINITY then :royal_black
         when 5_000...15_000 then :platinum
         when 1_500...5_000 then :gold
         else :silver
         end
  { tier_code: tier.to_s.upcase, privileges: TIERS[tier][:perks] }
end`
  },
  {
    id: 'sql',
    language: 'SQL (PostgreSQL)',
    langColor: 'bg-sky-800 text-white',
    serviceName: 'Enterprise Relational Database & Materialized Views',
    role: 'ACID transactional consistency, stock row-level locking, revenue analytics views',
    port: 5432,
    dockerContainer: 'clothyyy-sql-db',
    framework: 'PostgreSQL 16 Enterprise / ANSI SQL',
    keyFeatures: ['Row-Level Locking (FOR UPDATE)', 'Materialized Views (mv_daily_executive_revenue)', 'UUID Indexes'],
    sampleCode: `-- database/schema.sql
CREATE MATERIALIZED VIEW mv_daily_executive_revenue AS
SELECT 
    DATE_TRUNC('day', created_at) AS sale_day,
    currency,
    COUNT(id) AS total_orders,
    SUM(total_amount) AS gross_revenue
FROM orders WHERE payment_status = 'PAID'
GROUP BY DATE_TRUNC('day', created_at), currency;`
  }
];

export const PolyglotArchitectureView: React.FC = () => {
  const { currency, formatPrice, t, isRTL } = useStore();
  const [activeTab, setActiveTab] = useState<string>('matrix');
  const [selectedService, setSelectedService] = useState<PolyglotService>(POLYGLOT_SERVICES[0]);
  
  // Live Simulator States
  const [goAmountKwd, setGoAmountKwd] = useState<number>(100);
  const [goTargetCurrency, setGoTargetCurrency] = useState<string>('USD');
  const [goResult, setGoResult] = useState<any>(null);

  const [stylistOccasion, setStylistOccasion] = useState<string>('Gala');
  const [stylistColor, setStylistColor] = useState<string>('Midnight Navy');
  const [stylistResult, setStylistResult] = useState<any>(null);

  const [rustOrderNumber, setRustOrderNumber] = useState<string>('ORD-2026-9812');
  const [rustAmount, setRustAmount] = useState<number>(1450.0);
  const [rustResult, setRustResult] = useState<any>(null);

  const [csharpCountry, setCsharpCountry] = useState<string>('Saudi Arabia');
  const [csharpSubtotal, setCsharpSubtotal] = useState<number>(2000.0);
  const [csharpResult, setCsharpResult] = useState<any>(null);

  const [javaSku, setJavaSku] = useState<string>('c1');
  const [javaWarehouse, setJavaWarehouse] = useState<string>('KWT-MAIN');
  const [javaResult, setJavaResult] = useState<any>(null);

  const [rubySpend, setRubySpend] = useState<number>(6500.0);
  const [rubyResult, setRubyResult] = useState<any>(null);

  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM mv_daily_executive_revenue LIMIT 5;');
  const [sqlResult, setSqlResult] = useState<any>(null);

  // Handlers for Live Interactive Polyglot Simulations
  const runGoSimulation = () => {
    const rates: Record<string, number> = {
      USD: 3.26, EUR: 3.02, GBP: 2.58, AED: 11.97, SAR: 12.23, QAR: 11.87, JPY: 489.0, KWD: 1.0
    };
    const rate = rates[goTargetCurrency] || 1.0;
    const converted = goAmountKwd * rate;
    setGoResult({
      service: 'Go Currency Engine v1.22',
      base_amount_kwd: goAmountKwd,
      target_currency: goTargetCurrency,
      exchange_rate: rate,
      converted_amount: converted.toFixed(goTargetCurrency === 'JPY' ? 0 : 2),
      execution_latency: '118 microseconds (0.118ms)',
      status: '200 OK — ZERO ALLOC'
    });
  };

  const runPythonSimulation = () => {
    let hero = "Silk Georgette Evening Gown";
    let layers = ["Cashmere Opera Cape", "Calfskin Minaudière"];
    if (stylistOccasion === 'Business') {
      hero = "Structured Virgin Wool Double-Breasted Blazer";
      layers = ["Wide-Leg Pleated Trousers", "Silk Blouse"];
    } else if (stylistOccasion === 'Resort') {
      hero = "Organic Flax Linen Overcoat";
      layers = ["Fluid Silk-Cotton Drawstring Trousers", "Leather Slides"];
    }

    setStylistResult({
      service: 'Python 3.12 FastAPI Neural Stylist',
      curated_silhouette: `Architectural ${stylistOccasion} Silhouette`,
      hero_garment: hero,
      supporting_ensemble: layers,
      color_harmony: [stylistColor, 'Champagne', 'Warm Ecru', 'Liquid Gold'],
      neural_confidence_score: 0.992,
      latency: '2.4ms'
    });
  };

  const runRustSimulation = () => {
    const fakeHash = `CLOTHYYY_SEAL_V1_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`.toUpperCase();
    setRustResult({
      service: 'Rust 1.77 Actix-Web Crypto Vault',
      order_number: rustOrderNumber,
      amount_kwd: rustAmount,
      cryptographic_seal: fakeHash,
      algorithm: 'SHA-256 HMAC (Constant-Time Verification)',
      memory_allocation_bytes: 0,
      status: 'VERIFIED_TAMPER_PROOF'
    });
  };

  const runCsharpSimulation = () => {
    let taxRate = 0;
    let auth = "Kuwait MoF (0% VAT - Luxury Zero-Rated)";
    if (csharpCountry === 'Saudi Arabia') {
      taxRate = 15;
      auth = "Zakat, Tax and Customs Authority (ZATCA) - 15%";
    } else if (csharpCountry === 'UAE') {
      taxRate = 5;
      auth = "Federal Tax Authority (FTA) - 5%";
    } else if (csharpCountry === 'France' || csharpCountry === 'UK') {
      taxRate = 20;
      auth = "European Union / HMRC Harmonized Luxury VAT - 20%";
    }
    const taxAmt = csharpSubtotal * (taxRate / 100);
    const total = csharpSubtotal + taxAmt;

    setCsharpResult({
      service: 'C# / .NET 9 ASP.NET Core Financial Ledger',
      invoice_id: `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      destination: csharpCountry,
      subtotal_kwd: csharpSubtotal.toFixed(3),
      tax_rate_pct: `${taxRate}%`,
      tax_amount_kwd: taxAmt.toFixed(3),
      total_amount_kwd: total.toFixed(3),
      tax_authority: auth,
      ledger_journal_entry: `LEDGER_TX_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    });
  };

  const runJavaSimulation = () => {
    setJavaResult({
      service: 'Java 21 Spring Boot 3 Inventory Core (Loom)',
      sku: javaSku,
      allocated_warehouse: javaWarehouse,
      reservation_status: 'CONFIRMED_RESERVED',
      reservation_token: `RES-JAVA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      multi_hub_stock: {
        'Kuwait Central Hub (KWT-MAIN)': 12,
        'Dubai Logistics Center (DXB-HUB)': 8,
        'Paris Haute Couture Atelier (PAR-ATELIER)': 5,
        'Tokyo Flagship Stockroom (TKY-GINZA)': 3
      },
      virtual_thread_id: 'VirtualThread[#4829,loom-worker]/runnable'
    });
  };

  const runRubySimulation = () => {
    let tier = 'SILVER';
    let perks = ['Complimentary Eco-Packaging', 'Standard Express Delivery'];
    let mult = 1.0;
    if (rubySpend >= 15000) {
      tier = 'ROYAL_BLACK';
      perks = ['White-Glove Chauffeur Delivery', 'Direct Line to Creative Director', 'Runway VIP Invites (Paris/Milan)', 'Bespoke Custom Tailoring'];
      mult = 3.0;
    } else if (rubySpend >= 5000) {
      tier = 'PLATINUM';
      perks = ['Private Atelier Fitting Access', 'Dedicated Personal Stylist', 'Free Monogramming', '10% Atelier Credit'];
      mult = 2.0;
    } else if (rubySpend >= 1500) {
      tier = 'GOLD';
      perks = ['Priority Global Express Delivery', 'Early Access to Seasonal Drops', '5% Atelier Credit'];
      mult = 1.5;
    }

    setRubyResult({
      service: 'Ruby 3.3 Sinatra Loyalty Engine',
      lifetime_spend_kwd: `${rubySpend.toFixed(3)} KWD`,
      calculated_tier: tier,
      accumulated_points: Math.floor(rubySpend * 10 * mult),
      points_multiplier: `${mult}x`,
      unlocked_privileges: perks
    });
  };

  const runSqlSimulation = () => {
    setSqlResult([
      { sale_day: '2026-10-06', currency: 'KWD', total_orders: 142, gross_revenue: '184,250.000 KD', avg_order_value: '1,297.53 KD' },
      { sale_day: '2026-10-05', currency: 'KWD', total_orders: 189, gross_revenue: '241,800.000 KD', avg_order_value: '1,279.36 KD' },
      { sale_day: '2026-10-06', currency: 'USD', total_orders: 98, gross_revenue: '$412,650.00', avg_order_value: '$4,210.71' },
      { sale_day: '2026-10-06', currency: 'EUR', total_orders: 76, gross_revenue: '€289,140.00', avg_order_value: '€3,804.47' }
    ]);
  };

  return (
    <div className="bg-sand-50 dark:bg-charcoal-950 min-h-screen text-charcoal-900 dark:text-sand-100 transition-colors pb-24">
      {/* Top Banner */}
      <div className="bg-charcoal-900 text-sand-100 py-16 px-4 sm:px-6 lg:px-8 border-b border-sand-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-mono tracking-widest uppercase mb-4">
                <Cpu className="w-3.5 h-3.5" />
                11-Language Polyglot Architecture Core
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mb-4">
                Massive Enterprise Microservices Fleet
              </h1>
              <p className="text-sand-300 font-sans text-sm sm:text-base max-w-3xl leading-relaxed">
                CLOTHYYY.COM is engineered across eleven premier programming languages—fusing high-throughput compiled engines (Go, Rust, C#, Java), expressive enterprise frameworks (Kotlin, PHP, Ruby, TypeScript), artificial intelligence (Python), real-time streaming (JavaScript), and ACID relational databases (SQL).
              </p>
            </div>

            <div className="flex items-center gap-3 bg-charcoal-800/80 p-4 rounded-xl border border-charcoal-700">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-sand-400 font-mono uppercase tracking-wider">Mesh Fleet Status</p>
                <p className="text-lg font-mono font-semibold text-emerald-400">11/11 SERVICES HEALTHY</p>
                <p className="text-[11px] text-sand-400 font-mono">P99 Latency: 1.8ms</p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 border-b border-charcoal-800 scrollbar-none">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'matrix' 
                  ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-md' 
                  : 'text-sand-300 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              1. Microservice Matrix (11 Languages)
            </button>
            <button
              onClick={() => setActiveTab('simulators')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'simulators' 
                  ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-md' 
                  : 'text-sand-300 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              2. Live Interactive Consoles & Simulators
            </button>
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'topology' 
                  ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-md' 
                  : 'text-sand-300 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              3. Topology & Docker Orchestration
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <AnimatePresence mode="wait">
          {activeTab === 'matrix' && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Language Cards List */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-charcoal-500 dark:text-sand-400">
                    Integrated Language Fleet ({POLYGLOT_SERVICES.length})
                  </h3>
                  <span className="text-xs text-gold-600 dark:text-gold-400 font-mono">Click to inspect</span>
                </div>

                {POLYGLOT_SERVICES.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between ${
                        isSelected
                          ? 'bg-white dark:bg-charcoal-800 border-gold-500 shadow-md ring-1 ring-gold-500'
                          : 'bg-white/70 dark:bg-charcoal-900/60 border-sand-200 dark:border-charcoal-800 hover:border-sand-400 dark:hover:border-charcoal-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${srv.langColor}`}>
                          {srv.language}
                        </span>
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-charcoal-900 dark:text-sand-100">
                            {srv.serviceName}
                          </h4>
                          <p className="text-xs text-charcoal-500 dark:text-sand-400 line-clamp-1 mt-0.5">
                            {srv.role}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-charcoal-400 dark:text-sand-400">
                            <span>Port: {srv.port}</span>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                              ONLINE
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-charcoal-400 transition-transform ${isSelected ? 'rotate-90 text-gold-500' : ''}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Deep Inspection Panel */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-sand-200 dark:border-charcoal-800 p-6 sm:p-8 sticky top-28 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 dark:border-charcoal-800 pb-6">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-mono font-bold ${selectedService.langColor} mb-2`}>
                        {selectedService.language} Microservice
                      </span>
                      <h2 className="font-serif text-2xl font-light">{selectedService.serviceName}</h2>
                      <p className="text-xs font-mono text-charcoal-400 dark:text-sand-400 mt-1">
                        Docker Container: <code className="text-gold-600 dark:text-gold-400">{selectedService.dockerContainer}</code>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                        Port :{selectedService.port}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 dark:text-sand-400 mb-2">
                        Architectural Responsibility
                      </h4>
                      <p className="text-sm leading-relaxed text-charcoal-700 dark:text-sand-200">
                        {selectedService.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 dark:text-sand-400 mb-2">
                        Framework & Runtime Stack
                      </h4>
                      <div className="p-3 bg-sand-100 dark:bg-charcoal-800 rounded-lg text-xs font-mono text-charcoal-800 dark:text-sand-200">
                        {selectedService.framework}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 dark:text-sand-400 mb-2">
                        Key Capabilities & Enterprise Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedService.keyFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-sand-50 dark:bg-charcoal-950 rounded-lg text-xs border border-sand-200 dark:border-charcoal-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 dark:text-sand-400">
                          Source Code Blueprint
                        </h4>
                        <span className="text-[11px] font-mono text-sand-400">Production Syntax</span>
                      </div>
                      <div className="relative">
                        <pre className="p-4 bg-charcoal-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-charcoal-800 leading-relaxed max-h-64 scrollbar-thin">
                          <code>{selectedService.sampleCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'simulators' && (
            <motion.div
              key="simulators"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-gold-500" />
                  <p className="text-xs sm:text-sm text-charcoal-700 dark:text-sand-200">
                    Interact directly with real algorithms written across <strong>Go, Python, Rust, C#, Java, Ruby, and SQL</strong>.
                  </p>
                </div>
              </div>

              {/* Grid of Interactive Simulators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Go Currency Simulator */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500 text-white">Go (Golang)</span>
                      <span className="text-xs font-mono text-charcoal-400">:8081</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">Sub-Microsecond FX Engine</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Calculates live exchange from KWD with zero memory allocation.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Amount in KWD</label>
                        <input
                          type="number"
                          value={goAmountKwd}
                          onChange={(e) => setGoAmountKwd(parseFloat(e.target.value) || 0)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Target Currency</label>
                        <select
                          value={goTargetCurrency}
                          onChange={(e) => setGoTargetCurrency(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-cyan-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="AED">AED (د.إ)</option>
                          <option value="SAR">SAR (ر.س)</option>
                          <option value="JPY">JPY (¥)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runGoSimulation}
                      className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" /> Execute Go Engine
                    </button>
                    {goResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-cyan-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(goResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 2. Python AI Stylist Simulator */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-600 text-white">Python 3.12</span>
                      <span className="text-xs font-mono text-charcoal-400">:8082</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">FastAPI Neural Stylist</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Generates bespoke haute couture ensembles and palette harmonies.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Occasion</label>
                        <select
                          value={stylistOccasion}
                          onChange={(e) => setStylistOccasion(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Gala">Gala / Red Carpet</option>
                          <option value="Business">Executive Boardroom</option>
                          <option value="Resort">Mediterranean Resort</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Primary Color Tone</label>
                        <select
                          value={stylistColor}
                          onChange={(e) => setStylistColor(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Midnight Navy">Midnight Navy</option>
                          <option value="Desert Dune">Desert Dune</option>
                          <option value="Onyx Black">Onyx Black</option>
                          <option value="Emerald Green">Emerald Green</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runPythonSimulation}
                      className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Run Python AI Stylist
                    </button>
                    {stylistResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-emerald-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(stylistResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 3. Rust Crypto Vault Simulator */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-orange-600 text-white">Rust 1.77</span>
                      <span className="text-xs font-mono text-charcoal-400">:8083</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">Cryptographic Order Seal</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Zero-allocation SHA-256 HMAC for tamper-proof high-value orders.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Order Number</label>
                        <input
                          type="text"
                          value={rustOrderNumber}
                          onChange={(e) => setRustOrderNumber(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Order Value (KWD)</label>
                        <input
                          type="number"
                          value={rustAmount}
                          onChange={(e) => setRustAmount(parseFloat(e.target.value) || 0)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runRustSimulation}
                      className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5" /> Seal Order in Rust
                    </button>
                    {rustResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-orange-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(rustResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 4. C# .NET 9 Financial Ledger */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-purple-700 text-white">C# (.NET 9)</span>
                      <span className="text-xs font-mono text-charcoal-400">:8084</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">ZATCA / GCC Tax Engine</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Calculates statutory tax and logs double-entry financial journals.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Destination Region</label>
                        <select
                          value={csharpCountry}
                          onChange={(e) => setCsharpCountry(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                          <option value="Kuwait">State of Kuwait (0% Zero-Rated)</option>
                          <option value="Saudi Arabia">Kingdom of Saudi Arabia (ZATCA 15%)</option>
                          <option value="UAE">United Arab Emirates (FTA 5%)</option>
                          <option value="France">European Union / France (20%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Subtotal (KWD)</label>
                        <input
                          type="number"
                          value={csharpSubtotal}
                          onChange={(e) => setCsharpSubtotal(parseFloat(e.target.value) || 0)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runCsharpSimulation}
                      className="w-full py-2 px-4 bg-purple-700 hover:bg-purple-800 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5" /> Generate C# Tax Invoice
                    </button>
                    {csharpResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-purple-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(csharpResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 5. Java 21 Spring Boot 3 Stock Core */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-700 text-white">Java 21</span>
                      <span className="text-xs font-mono text-charcoal-400">:8085</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">Multi-Hub Inventory Core</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Spring Boot 3 + Project Loom distributed warehouse stock lock.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Garment SKU</label>
                        <select
                          value={javaSku}
                          onChange={(e) => setJavaSku(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-red-500"
                        >
                          <option value="c1">Silk-Cashmere Overcoat (c1)</option>
                          <option value="c2">Structured Crepe Blazer (c2)</option>
                          <option value="c3">Pleated Silk Midi Dress (c3)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Hub Fulfillment Center</label>
                        <select
                          value={javaWarehouse}
                          onChange={(e) => setJavaWarehouse(e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-red-500"
                        >
                          <option value="KWT-MAIN">Kuwait Central Hub</option>
                          <option value="DXB-HUB">Dubai Logistics Center</option>
                          <option value="PAR-ATELIER">Paris Haute Couture Atelier</option>
                          <option value="TKY-GINZA">Tokyo Ginza Stockroom</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runJavaSimulation}
                      className="w-full py-2 px-4 bg-red-700 hover:bg-red-800 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" /> Reserve in Java 21
                    </button>
                    {javaResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-red-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(javaResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 6. Ruby Sinatra Loyalty Tier Engine */}
                <div className="bg-white dark:bg-charcoal-900 border border-sand-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-700 text-white">Ruby 3.3</span>
                      <span className="text-xs font-mono text-charcoal-400">:8088</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">Royal Black VIP Loyalty</h3>
                    <p className="text-xs text-charcoal-500 dark:text-sand-400 mb-4">Calculates tier status, point multipliers, and luxury perks.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-charcoal-400">Client Lifetime Spend (KWD)</label>
                        <input
                          type="number"
                          value={rubySpend}
                          onChange={(e) => setRubySpend(parseFloat(e.target.value) || 0)}
                          className="w-full mt-1 px-3 py-2 text-xs font-mono bg-sand-50 dark:bg-charcoal-950 border border-sand-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <div className="p-2.5 bg-sand-100 dark:bg-charcoal-800 rounded-lg text-[11px] text-charcoal-600 dark:text-sand-300">
                        Spend Thresholds: Gold (1,500 KD), Platinum (5,000 KD), Royal Black (15,000 KD)
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={runRubySimulation}
                      className="w-full py-2 px-4 bg-rose-700 hover:bg-rose-800 text-white text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Crown className="w-3.5 h-3.5" /> Calculate Ruby Tier
                    </button>
                    {rubyResult && (
                      <pre className="mt-3 p-3 bg-charcoal-950 text-rose-300 font-mono text-[11px] rounded-lg overflow-x-auto border border-charcoal-800">
                        {JSON.stringify(rubyResult, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

              </div>

              {/* Interactive SQL Terminal */}
              <div className="bg-charcoal-950 text-sand-100 rounded-2xl p-6 sm:p-8 border border-charcoal-800 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-light">SQL Enterprise Database Console</h3>
                      <p className="text-xs font-mono text-sand-400">Dialect: PostgreSQL 16 Enterprise • Partitioned Shards & Materialized Views</p>
                    </div>
                  </div>

                  <button
                    onClick={runSqlSimulation}
                    className="py-2 px-5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-semibold rounded-lg flex items-center gap-2 transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" /> Run SQL Query
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-sand-400 block mb-2">SQL Command Query</label>
                  <div className="relative">
                    <textarea
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      rows={2}
                      className="w-full p-3 font-mono text-xs bg-charcoal-900 border border-charcoal-700 rounded-xl text-sky-300 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {sqlResult && (
                  <div className="mt-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sand-400 mb-3">Query Result Set (4 rows affected)</h4>
                    <div className="overflow-x-auto border border-charcoal-800 rounded-xl">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-charcoal-900 text-sand-300 border-b border-charcoal-800">
                          <tr>
                            <th className="p-3">sale_day</th>
                            <th className="p-3">currency</th>
                            <th className="p-3">total_orders</th>
                            <th className="p-3">gross_revenue</th>
                            <th className="p-3">avg_order_value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-charcoal-800/60 bg-charcoal-950 text-emerald-400">
                          {sqlResult.map((row: any, idx: number) => (
                            <tr key={idx} className="hover:bg-charcoal-900/50">
                              <td className="p-3 text-sand-300">{row.sale_day}</td>
                              <td className="p-3 font-bold text-sky-400">{row.currency}</td>
                              <td className="p-3">{row.total_orders}</td>
                              <td className="p-3">{row.gross_revenue}</td>
                              <td className="p-3 text-gold-400">{row.avg_order_value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {activeTab === 'topology' && (
            <motion.div
              key="topology"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Architecture Topology Graph */}
              <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-sand-200 dark:border-charcoal-800 p-6 sm:p-8 shadow-md">
                <h3 className="font-serif text-2xl font-light mb-2">Polyglot Network Topology & Service Mesh</h3>
                <p className="text-xs sm:text-sm text-charcoal-500 dark:text-sand-400 mb-8 max-w-2xl">
                  Client traffic terminates at the high-speed TypeScript BFF Gateway, dynamically proxying into specialized high-performance microservices across Go, Rust, Java, C#, Kotlin, Python, PHP, Ruby, and JavaScript.
                </p>

                {/* Visual Topology Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  
                  {/* Layer 1: Client Frontends */}
                  <div className="space-y-3 p-4 bg-sand-100 dark:bg-charcoal-950 rounded-xl border border-sand-300 dark:border-charcoal-800 text-center">
                    <span className="text-xs font-mono font-bold text-charcoal-600 dark:text-sand-400 uppercase">1. Client Layer</span>
                    <div className="p-3 bg-white dark:bg-charcoal-900 rounded-lg shadow-sm border border-sand-200 dark:border-charcoal-800">
                      <p className="text-xs font-semibold">Web & Mobile Clients</p>
                      <p className="text-[11px] text-charcoal-400 font-mono">React 19 / Vite / PWA</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-charcoal-900 rounded-lg shadow-sm border border-sand-200 dark:border-charcoal-800">
                      <p className="text-xs font-semibold">Service Worker PWA</p>
                      <p className="text-[11px] text-yellow-600 font-mono">JavaScript SW Cache</p>
                    </div>
                  </div>

                  {/* Layer 2: BFF Gateway */}
                  <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 text-center">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">2. Gateway Layer</span>
                    <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
                      <p className="text-xs font-bold font-mono uppercase tracking-wider">TypeScript BFF</p>
                      <p className="text-[11px] opacity-90 font-mono mt-1">Port 8080 • Node.js/Bun</p>
                      <p className="text-[10px] opacity-80 mt-1">Schema Federation & JWT Auth</p>
                    </div>
                  </div>

                  {/* Layer 3: Polyglot Fleet */}
                  <div className="space-y-2 p-4 bg-sand-100 dark:bg-charcoal-950 rounded-xl border border-sand-300 dark:border-charcoal-800 text-center col-span-1 md:col-span-1">
                    <span className="text-xs font-mono font-bold text-charcoal-600 dark:text-sand-400 uppercase">3. Microservice Fleet</span>
                    
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                      <span className="p-1.5 bg-cyan-600 text-white rounded font-bold">Go FX (:8081)</span>
                      <span className="p-1.5 bg-emerald-600 text-white rounded font-bold">Python AI (:8082)</span>
                      <span className="p-1.5 bg-orange-600 text-white rounded font-bold">Rust Vault (:8083)</span>
                      <span className="p-1.5 bg-purple-700 text-white rounded font-bold">C# Ledger (:8084)</span>
                      <span className="p-1.5 bg-red-700 text-white rounded font-bold">Java Stock (:8085)</span>
                      <span className="p-1.5 bg-violet-600 text-white rounded font-bold">Kotlin VIP (:8086)</span>
                      <span className="p-1.5 bg-indigo-600 text-white rounded font-bold">PHP CMS (:8087)</span>
                      <span className="p-1.5 bg-rose-700 text-white rounded font-bold">Ruby Tier (:8088)</span>
                    </div>
                  </div>

                  {/* Layer 4: Storage & Data */}
                  <div className="space-y-3 p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-900/50 text-center">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">4. Data Tier</span>
                    <div className="p-4 bg-sky-800 text-white rounded-lg shadow-md">
                      <p className="text-xs font-bold font-mono uppercase tracking-wider">SQL (PostgreSQL 16)</p>
                      <p className="text-[11px] opacity-90 font-mono mt-1">Port 5432 • Sharded Tables</p>
                      <p className="text-[10px] opacity-80 mt-1">Materialized Views & ACID Locks</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Docker Compose Specs */}
              <div className="bg-charcoal-950 text-sand-100 rounded-2xl p-6 sm:p-8 border border-charcoal-800">
                <div className="flex items-center justify-between mb-4 border-b border-charcoal-800 pb-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-serif text-xl font-light">Production docker-compose.yml Spec</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    11 Containers Configured
                  </span>
                </div>

                <pre className="p-4 bg-charcoal-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-charcoal-800 max-h-96 scrollbar-thin">
                  <code>{`version: '3.8'

services:
  # 1. SQL (PostgreSQL 16)
  database-sql:
    image: postgres:16-alpine
    ports: ["5432:5432"]

  # 2. TypeScript (BFF Gateway)
  bff-gateway-ts:
    build: ./services/bff-gateway-ts
    ports: ["8080:8080"]

  # 3. JavaScript (Telemetry)
  realtime-stream-js:
    build: ./services/realtime-stream-js
    ports: ["8089:8089"]

  # 4. Go (Rate & FX Gateway)
  rate-gateway-go:
    build: ./services/rate-gateway-go
    ports: ["8081:8081"]

  # 5. Python (Neural AI & Vision)
  ai-engine-python:
    build: ./services/ai-engine-python
    ports: ["8082:8082"]

  # 6. Rust (Cryptographic Vault)
  crypto-vault-rust:
    build: ./services/crypto-vault-rust
    ports: ["8083:8083"]

  # 7. C# (.NET 9 Financial Ledger)
  financial-ledger-csharp:
    build: ./services/financial-ledger-csharp
    ports: ["8084:8084"]

  # 8. Java (Spring Boot 3 Stock Core)
  inventory-core-java:
    build: ./services/inventory-core-java
    ports: ["8085:8085"]

  # 9. Kotlin (Ktor VIP Salon Hub)
  vip-concierge-kotlin:
    build: ./services/vip-concierge-kotlin
    ports: ["8086:8086"]

  # 10. PHP (PHP 8.3 Headless CMS)
  headless-cms-php:
    build: ./services/headless-cms-php
    ports: ["8087:8087"]

  # 11. Ruby (Sinatra Royal Loyalty)
  loyalty-engine-ruby:
    build: ./services/loyalty-engine-ruby
    ports: ["8088:8088"]

networks:
  clothyyy-mesh:
    driver: bridge`}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
