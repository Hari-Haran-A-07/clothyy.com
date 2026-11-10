-- Migration 006: Haute Couture Garment RFID Tags and Live Auction Escrow Ledgers
-- Enables physical garment verification, anti-counterfeiting RFID binds, and escrow disbursement records

CREATE TABLE IF NOT EXISTS garment_rfid_tags (
    rfid_tag_id VARCHAR(64) PRIMARY KEY,
    garment_id VARCHAR(64) NOT NULL,
    atelier_id VARCHAR(64) NOT NULL,
    epc_hex VARCHAR(96) NOT NULL UNIQUE,
    tamper_evident_seal BOOLEAN NOT NULL DEFAULT true,
    last_scanned_at TIMESTAMPTZ,
    last_boutique_hub VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_garment_rfid_garment_id ON garment_rfid_tags(garment_id);
CREATE INDEX IF NOT EXISTS idx_garment_rfid_atelier ON garment_rfid_tags(atelier_id);

CREATE TABLE IF NOT EXISTS auction_escrow_ledgers (
    escrow_id VARCHAR(64) PRIMARY KEY,
    auction_id VARCHAR(64) NOT NULL,
    winning_bidder_id VARCHAR(64) NOT NULL,
    gross_amount NUMERIC(12, 2) NOT NULL,
    atelier_payout NUMERIC(12, 2) NOT NULL,
    boutique_commission NUMERIC(12, 2) NOT NULL,
    platform_fee NUMERIC(12, 2) NOT NULL,
    insurance_reserve NUMERIC(12, 2) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'HELD_IN_ESCROW',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    disbursed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_auction_escrow_auction_id ON auction_escrow_ledgers(auction_id);
CREATE INDEX IF NOT EXISTS idx_auction_escrow_status ON auction_escrow_ledgers(status);
