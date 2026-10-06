-- ============================================================================
-- CLOTHYYY.COM ENTERPRISE RELATIONAL DATABASE ENGINE (SQL)
-- Dialect: PostgreSQL 16 Enterprise / ANSI SQL compliant
-- Architecture: High-Scale Sharded & Partitioned E-Commerce Schema
-- Author: CLOTHYYY Global Infrastructure Engineering
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. CURRENCIES & EXCHANGE RATES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS currencies (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    symbol_native VARCHAR(10) NOT NULL,
    rate_to_kwd NUMERIC(14, 6) NOT NULL,
    decimal_digits INT DEFAULT 2,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO currencies (code, name, symbol, symbol_native, rate_to_kwd, decimal_digits) VALUES
('KWD', 'Kuwaiti Dinar', 'KD', 'د.ك', 1.000000, 3),
('USD', 'US Dollar', '$', '$', 3.260000, 2),
('EUR', 'Euro', '€', '€', 3.020000, 2),
('GBP', 'British Pound', '£', '£', 2.580000, 2),
('AED', 'UAE Dirham', 'AED', 'د.إ', 11.970000, 2),
('SAR', 'Saudi Riyal', 'SAR', 'ر.س', 12.230000, 2),
('QAR', 'Qatari Riyal', 'QAR', 'ر.ق', 11.870000, 2),
('JPY', 'Japanese Yen', '¥', '¥', 489.000000, 0)
ON CONFLICT (code) DO UPDATE SET rate_to_kwd = EXCLUDED.rate_to_kwd, updated_at = CURRENT_TIMESTAMP;

-- ----------------------------------------------------------------------------
-- 2. CUSTOMERS & VIP REPUTATION TIERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    preferred_currency VARCHAR(3) REFERENCES currencies(code) DEFAULT 'KWD',
    preferred_language VARCHAR(5) DEFAULT 'en',
    loyalty_tier VARCHAR(20) DEFAULT 'SILVER', -- SILVER, GOLD, PLATINUM, ROYAL_BLACK
    loyalty_points INT DEFAULT 0,
    is_vip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(loyalty_tier);

-- ----------------------------------------------------------------------------
-- 3. PRODUCTS & VARIANTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    name_ar VARCHAR(150) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    banner_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES product_categories(id),
    gender VARCHAR(20) NOT NULL, -- women, men, unisex, accessories
    base_price_kwd NUMERIC(12, 3) NOT NULL,
    compare_at_price_kwd NUMERIC(12, 3),
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT TRUE,
    material_composition TEXT,
    care_instructions TEXT,
    sustainability_rating NUMERIC(3, 1) DEFAULT 4.9,
    origin_country VARCHAR(50) DEFAULT 'Italy',
    model_3d_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    color_name VARCHAR(50) NOT NULL,
    color_hex VARCHAR(10) NOT NULL,
    size_code VARCHAR(10) NOT NULL, -- XS, S, M, L, XL, XXL, 38, 40, etc.
    barcode VARCHAR(64) UNIQUE,
    additional_price_kwd NUMERIC(10, 3) DEFAULT 0.000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. MULTI-HUB WAREHOUSE & INVENTORY MANAGEMENT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL, -- KWT-MAIN, DXB-LOGISTICS, PAR-ATELIER, TKY-GINZA
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    is_fulfillment_active BOOLEAN DEFAULT TRUE
);

INSERT INTO warehouses (code, name, country, city) VALUES
('KWT-MAIN', 'Kuwait Central Hub', 'Kuwait', 'Kuwait City'),
('DXB-HUB', 'Dubai Logistics Center', 'UAE', 'Dubai'),
('PAR-ATELIER', 'Paris Haute Couture Studio', 'France', 'Paris'),
('TKY-GINZA', 'Tokyo Flagship Stockroom', 'Japan', 'Tokyo')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    warehouse_id UUID REFERENCES warehouses(id),
    quantity_available INT NOT NULL DEFAULT 0,
    quantity_reserved INT NOT NULL DEFAULT 0,
    reorder_threshold INT DEFAULT 5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_variant_warehouse UNIQUE (variant_id, warehouse_id)
);

-- ----------------------------------------------------------------------------
-- 5. ORDERS & ATOMIC CHECKOUT TRANSACTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(32) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, CONFIRMED, PROCESSING, DISPATCHED, DELIVERED, CANCELLED
    currency VARCHAR(3) NOT NULL DEFAULT 'KWD',
    subtotal NUMERIC(12, 3) NOT NULL,
    tax_amount NUMERIC(12, 3) NOT NULL DEFAULT 0.000,
    shipping_fee NUMERIC(12, 3) NOT NULL DEFAULT 0.000,
    discount_amount NUMERIC(12, 3) NOT NULL DEFAULT 0.000,
    total_amount NUMERIC(12, 3) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- KNET, TABBY, APPLE_PAY, VISA_MASTERCARD
    payment_status VARCHAR(30) DEFAULT 'UNPAID', -- PAID, REFUNDED, PENDING
    shipping_address JSONB NOT NULL,
    cryptographic_token VARCHAR(256), -- Rust Ed25519 signature
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id),
    unit_price NUMERIC(12, 3) NOT NULL,
    quantity INT NOT NULL,
    total_price NUMERIC(12, 3) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 6. STORED PROCEDURES & ATOMIC INVENTORY DEDUCTION
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION reserve_inventory_for_order(
    p_variant_id UUID,
    p_warehouse_id UUID,
    p_qty INT
) RETURNS BOOLEAN AS $$
DECLARE
    v_available INT;
BEGIN
    SELECT quantity_available INTO v_available
    FROM inventories
    WHERE variant_id = p_variant_id AND warehouse_id = p_warehouse_id
    FOR UPDATE;

    IF v_available >= p_qty THEN
        UPDATE inventories
        SET quantity_available = quantity_available - p_qty,
            quantity_reserved = quantity_reserved + p_qty,
            updated_at = CURRENT_TIMESTAMP
        WHERE variant_id = p_variant_id AND warehouse_id = p_warehouse_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 7. MATERIALIZED VIEW: REAL-TIME EXECUTIVE REVENUE METRICS
-- ----------------------------------------------------------------------------
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_daily_executive_revenue AS
SELECT 
    DATE_TRUNC('day', created_at) AS sale_day,
    currency,
    COUNT(id) AS total_orders,
    SUM(total_amount) AS gross_revenue,
    AVG(total_amount) AS average_order_value,
    SUM(discount_amount) AS total_discounts_granted
FROM orders
WHERE payment_status = 'PAID'
GROUP BY DATE_TRUNC('day', created_at), currency
ORDER BY sale_day DESC;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_daily_revenue ON mv_daily_executive_revenue (sale_day, currency);
