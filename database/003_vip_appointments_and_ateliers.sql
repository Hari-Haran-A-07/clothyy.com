-- Migration 003: VIP Salon Consultations and Bespoke Atelier Fittings
-- Supports exclusive private styling and private salon appointments

CREATE TABLE IF NOT EXISTS vip_salons (
    salon_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city VARCHAR(64) NOT NULL,
    address TEXT NOT NULL,
    capacity INT NOT NULL DEFAULT 4,
    has_champagne_bar BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS atelier_consultations (
    appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES vip_salons(salon_id) ON DELETE CASCADE,
    client_id VARCHAR(64) NOT NULL,
    master_tailor_id VARCHAR(64) NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'CONFIRMED',
    special_requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_appointment_time CHECK (scheduled_end > scheduled_start)
);

CREATE INDEX IF NOT EXISTS idx_atelier_consultations_client ON atelier_consultations(client_id);
CREATE INDEX IF NOT EXISTS idx_atelier_consultations_schedule ON atelier_consultations(salon_id, scheduled_start);
