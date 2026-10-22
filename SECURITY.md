# Security Policy - CLOTHYYY.COM

The CLOTHYYY.COM platform processes luxury digital transactions, high-value haute couture reservations, and private client identities across a polyglot microservice infrastructure. Security and confidential computing are fundamental priorities.

---

## Supported Versions

| Service / Layer | Version | Supported |
| :--- | :--- | :--- |
| TypeScript BFF Gateway (`services/bff-gateway-ts`) | v2.x | :white_check_mark: |
| Crypto Vault (`services/crypto-vault-rust`) | v1.x | :white_check_mark: |
| AI Stylist Engine (`services/ai-engine-python`) | v1.x | :white_check_mark: |
| Currency Rate Gateway (`services/rate-gateway-go`) | v1.x | :white_check_mark: |
| Financial Ledger (`services/financial-ledger-csharp`)| v1.x | :white_check_mark: |
| React Client (`src/`) | v1.x | :white_check_mark: |

---

## Polyglot Security Architecture Principles

1. **Zero-Trust Network Perimeter**:
   - Internal inter-service communication requires mutual TLS (mTLS) or signed JWT authorization tokens.
   - All external endpoints must route through the TypeScript BFF API Gateway.
2. **Cryptographic Assurance**:
   - Authenticity seals are computed via constant-time Rust primitives (`crypto-vault-rust`) to eliminate side-channel vulnerabilities.
3. **Statutory Tax & Financial Audits**:
   - C# financial ledger strictly maintains double-entry immutability and enforces cryptographic integrity on ZATCA invoices.
4. **Content Security Policy (CSP)**:
   - Strict HTTP response headers (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`) enforced at the BFF layer.

---

## Reporting a Vulnerability

If you discover a security vulnerability within CLOTHYYY.COM:

1. **Do not disclose publicly** via GitHub Issues or public pull requests.
2. Send an encrypted email with reproducible steps to `security@clothyy.com`.
3. Include the following details:
   - Affected service / endpoint / microservice container.
   - Proof of Concept (PoC) or reproducible curl command.
   - Assessment of potential impact (CVSS v3 score estimation).

Our dedicated security response team will acknowledge receipt within 24 hours and provide coordinated disclosure updates.
