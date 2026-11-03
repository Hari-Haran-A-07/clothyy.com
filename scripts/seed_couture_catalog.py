#!/usr/bin/env python3
"""
Seed Couture Catalog Script
Populates mock haute couture inventory into local dev database.
"""
import json
import uuid

DEMO_PRODUCTS = [
    {
        "sku": "COUT-SILK-001",
        "name": "Midnight Silk Evening Gown",
        "category": "Haute Couture",
        "price_cents": 1250000,
        "currency": "USD",
        "stock_quantity": 3,
        "origin": "Paris Atelier"
    },
    {
        "sku": "COUT-CASH-002",
        "name": "Bespoke Double-Faced Cashmere Overcoat",
        "category": "Tailoring",
        "price_cents": 890000,
        "currency": "USD",
        "stock_quantity": 5,
        "origin": "Milan Atelier"
    },
    {
        "sku": "COUT-LEAT-003",
        "name": "Hand-Stitched Heritage Leather Weekender",
        "category": "Leather Goods",
        "price_cents": 480000,
        "currency": "USD",
        "stock_quantity": 8,
        "origin": "Florence Atelier"
    }
]

def main():
    print("Generating demo haute couture seed dataset...")
    catalog = {
        "catalog_version": "2026.4",
        "generated_batch_id": str(uuid.uuid4()),
        "items": DEMO_PRODUCTS
    }
    with open("database/couture_seed.json", "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2)
    print(f"Successfully generated database/couture_seed.json with {len(DEMO_PRODUCTS)} luxury items.")

if __name__ == "__main__":
    main()
