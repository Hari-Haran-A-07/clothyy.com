# Polyglot Event Bus Topology and Messaging Architecture

This document outlines the asynchronous messaging patterns and Apache Kafka topic routing connecting the 10 microservices of the `Clothyyy` luxury platform.

## Event Streams & Topics

| Topic | Producer Service | Consumers | Partition Key | Retention |
| :--- | :--- | :--- | :--- | :--- |
| `couture.orders.created` | BFF Gateway (TS) | Inventory (Java), Ledger (C#) | `order_id` | 7 Days |
| `couture.inventory.reserved` | Inventory Core (Java) | Rate Gateway (Go), Realtime (JS) | `sku` | 3 Days |
| `couture.vault.signed` | Crypto Vault (Rust) | Ledger (C#), Concierge (Kotlin) | `tx_hash` | 30 Days |
| `couture.vip.consultation` | VIP Concierge (Kotlin) | CMS (PHP), Realtime (JS) | `client_id` | 14 Days |
| `couture.ai.trend-forecast` | AI Engine (Python) | BFF Gateway (TS), CMS (PHP) | `category` | 14 Days |

## Guarantees & Dead Letter Queue (DLQ)
- Delivery semantic: At-least-once with idempotent consumer deduplication.
- Failed messages are retried with exponential backoff up to 5 times.
- Poison-pill payloads are diverted to `couture.dlq.<service-name>` for human audit.
