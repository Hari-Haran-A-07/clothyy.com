-- Migration 004: Immutable Cryptographic Audit Log Ledger
-- Provides tamper-evident audit trail for financial transactions and vault operations

CREATE TABLE IF NOT EXISTS crypto_audit_trail (
    entry_id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(128) NOT NULL,
    action VARCHAR(32) NOT NULL,
    actor_id VARCHAR(64) NOT NULL,
    previous_entry_hash VARCHAR(64) NOT NULL,
    payload_hash VARCHAR(64) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_trail_entity ON crypto_audit_trail(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_trail_recorded ON crypto_audit_trail(recorded_at);
