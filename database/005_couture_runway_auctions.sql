-- Migration 005: Haute Couture Runway Live Auctions and Bidding Ledger
-- Tracks one-of-a-kind bespoke runway show lots, reserve prices, and high-frequency bids

CREATE TABLE IF NOT EXISTS runway_auction_rooms (
    room_id VARCHAR(64) PRIMARY KEY,
    garment_sku VARCHAR(64) NOT NULL,
    collection_name VARCHAR(128) NOT NULL,
    designer_name VARCHAR(128) NOT NULL,
    reserve_price_eur NUMERIC(12, 2) NOT NULL,
    current_high_bid_eur NUMERIC(12, 2) NOT NULL,
    winning_bidder_id VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING', -- PENDING, ACTIVE, EXTENDED, HAMMER_FELL, CANCELLED
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    anti_sniping_seconds INT DEFAULT 120,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS runway_bids_ledger (
    bid_id BIGSERIAL PRIMARY KEY,
    room_id VARCHAR(64) NOT NULL REFERENCES runway_auction_rooms(room_id) ON DELETE CASCADE,
    bidder_id VARCHAR(64) NOT NULL,
    bid_amount_eur NUMERIC(12, 2) NOT NULL,
    client_ip_hash VARCHAR(64),
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auction_bids_room ON runway_bids_ledger(room_id, bid_amount_eur DESC);
CREATE INDEX IF NOT EXISTS idx_auction_bids_bidder ON runway_bids_ledger(bidder_id);
