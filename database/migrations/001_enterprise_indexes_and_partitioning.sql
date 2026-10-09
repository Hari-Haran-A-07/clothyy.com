-- ============================================================================
-- Migration: 001_enterprise_indexes_and_partitioning.sql
-- High-Performance Indices, Range Partitioning & Audit Triggers
-- ============================================================================

-- 1. High-Performance Compound Index for Product Search & Category Filtering
CREATE INDEX IF NOT EXISTS idx_products_category_gender_price 
ON products (category_id, gender, base_price_kwd)
WHERE is_featured = TRUE;

-- 2. Trigram Index for Fast Fuzzy Product Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_products_name_en_trgm 
ON products USING gin (name_en gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_products_name_ar_trgm 
ON products USING gin (name_ar gin_trgm_ops);

-- 3. High-Velocity Order Ledger Audit Log Table
CREATE TABLE IF NOT EXISTS order_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    previous_status VARCHAR(30),
    new_status VARCHAR(30),
    changed_by VARCHAR(100) DEFAULT 'SYSTEM_POLYGLOT_GATEWAY',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_audit_order_id ON order_audit_logs (order_id, created_at DESC);

-- 4. Automatic Trigger to Log Order Status Transitions
CREATE OR REPLACE FUNCTION log_order_status_transition()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO order_audit_logs (order_id, action, previous_status, new_status, metadata)
        VALUES (NEW.id, 'STATUS_CHANGE', OLD.status, NEW.status, jsonb_build_object('total', NEW.total_amount, 'currency', NEW.currency));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_order_status_audit ON orders;
CREATE TRIGGER trg_order_status_audit
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION log_order_status_transition();
