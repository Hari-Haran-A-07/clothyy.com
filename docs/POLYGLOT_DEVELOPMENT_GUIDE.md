# Polyglot Development Guide for Clothyyy Architecture

## Supported Microservice Runtimes

| Microservice | Language | Directory | Local Port |
| :--- | :--- | :--- | :--- |
| AI Engine | Python 3.11+ | `services/ai-engine-python` | 8001 |
| BFF Gateway | TypeScript | `services/bff-gateway-ts` | 8000 |
| Crypto Vault | Rust 1.75+ | `services/crypto-vault-rust` | 8085 |
| Financial Ledger | C# .NET 8.0 | `services/financial-ledger-csharp` | 5001 |
| Headless CMS | PHP 8.2 | `services/headless-cms-php` | 8080 |
| Inventory Core | Java 21 | `services/inventory-core-java` | 8081 |
| Loyalty Engine | Ruby 3.2 | `services/loyalty-engine-ruby` | 4567 |
| Rate Gateway | Go 1.22 | `services/rate-gateway-go` | 8082 |
| Realtime Stream | Node.js 20 | `services/realtime-stream-js` | 3001 |
| VIP Concierge | Kotlin 1.9 | `services/vip-concierge-kotlin` | 8083 |

## Local Bootstrapping
Run `docker-compose up -d` to launch the multi-service local testing environment.
