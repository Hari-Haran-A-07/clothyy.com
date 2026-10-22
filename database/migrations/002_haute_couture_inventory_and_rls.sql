-- ============================================================================
-- Migration: 002_haute_couture_inventory_and_rls.sql
-- Atomic Inventory Holds, Row Level Security (RLS) & Sweep Indexes
-- ============================================================================

-- 1. High-Concurrency Temporary Inventory Hold Table (supports Project Loom Java Core)
CREATE TABLE IF NOT EXISTS inventory_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(64) NOT NULL,
    session_id VARCHAR(128) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    status VARCHAR(24) NOT NULL DEFAULT 'HELD', -- 'HELD', 'CONFIRMED', 'EXPIRED', 'RELEASED'
    reserved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    version INT NOT NULL DEFAULT 1
);

-- Fast Index for cleanup sweep worker
CREATE INDEX IF NOT EXISTS idx_inventory_reservations_status_expires 
ON inventory_reservations (status, expires_at)
WHERE status = 'HELD';

-- Fast Index for SKU concurrent hold aggregation
CREATE INDEX IF NOT EXISTS idx_inventory_reservations_sku_active
ON inventory_reservations (sku)
WHERE status = 'HELD';

-- 2. Row Level Security (RLS) on VIP Private Salon Records
ALTER TABLE IF EXISTS vip_clients ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'vip_clients' AND policyname = 'vip_clients_isolation_policy'
    ) THEN
        CREATE POLICY vip_clients_isolation_policy ON vip_clients
            FOR ALL
            TO CURRENT_USER
            USING (tenant_id = current_setting('app.current_tenant', true));
    END IF;
END $$;

-- 3. Procedure for atomic inventory release
CREATE OR REPLACE FUNCTION release_expired_reservations()
RETURNS INT AS $$
DECLARE
    released_count INT;
BEGIN
    UPDATE inventory_reservations
    SET status = 'EXPIRED'
    WHERE status = 'HELD' AND expires_at < CURRENT_TIMESTAMP;

    GET DIAGNOSTICS released_count = ROW_COUNT;
    RETURN released_count;
END;
$$ LANGUAGE plpgsql;
