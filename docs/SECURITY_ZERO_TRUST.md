# Zero-Trust Microservice Perimeter and PCI-DSS Security Architecture

## Microservice Identity & Mutual TLS (mTLS)
- All inter-service communications enforce mTLS via SPIFFE/SPIRE workload identities.
- Ephemeral x509 certificates are automatically rotated every 12 hours.

## Secret Management
- Secrets and cryptographic keys are provisioned through HashiCorp Vault.
- Environment variables must never store raw private keys or production database credentials.

## Webhook Ingress
- External partner webhooks must include an HMAC-SHA256 signature header (`X-Clothyyy-Signature-256`).
- Max allowable clock skew is bounded to 300 seconds.
