#!/usr/bin/env bash
# ==============================================================================
# CLOTHYYY.COM — Polyglot Services Smoke Test Script
# ==============================================================================
set -euo pipefail

HOST="${1:-localhost}"
echo "=========================================================="
echo "Running CLOTHYYY.COM Polyglot Cluster Smoke Tests against: ${HOST}"
echo "=========================================================="

endpoints=(
  "http://${HOST}:8080/health:TypeScript BFF Gateway"
  "http://${HOST}:8081/health:Go Currency Engine"
  "http://${HOST}:8082/health:Python AI Stylist"
  "http://${HOST}:8083/health:Rust Crypto Vault"
  "http://${HOST}:8084/health:C# Financial Ledger"
  "http://${HOST}:8085/health:Java Stock Core"
  "http://${HOST}:8086/health:Kotlin VIP Concierge"
  "http://${HOST}:8087/health:PHP Headless CMS"
  "http://${HOST}:8088/health:Ruby Loyalty Engine"
  "http://${HOST}:8089/health:JavaScript Telemetry"
)

failed=0

for entry in "${endpoints[@]}"; do
  url="${entry%%:*}"
  name="${entry##*:}"

  status_code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "${url}" || echo "000")

  if [[ "${status_code}" -ge 200 && "${status_code}" -lt 300 ]]; then
    printf "  [SUCCESS] %-32s -> %s (HTTP %s)\n" "${name}" "${url}" "${status_code}"
  else
    printf "  [FAILURE] %-32s -> %s (HTTP %s)\n" "${name}" "${url}" "${status_code}"
    failed=$((failed + 1))
  fi
done

echo "=========================================================="
if [[ "${failed}" -eq 0 ]]; then
  echo "All microservices responded successfully."
  exit 0
else
  echo "${failed} service(s) failed or timed out."
  exit 1
fi
