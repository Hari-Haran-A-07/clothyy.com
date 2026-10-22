#!/usr/bin/env python3
"""
CLOTHYYY.COM — Polyglot Microservices Fleet Health Check Utility
Scans and reports online/offline status, HTTP response status codes,
and latency across all 10 specialized microservices.
"""

import sys
import time
import urllib.request
import urllib.error
import json

SERVICES = [
    {"name": "BFF API Gateway (TypeScript)", "port": 8080, "health_path": "/health"},
    {"name": "Currency Rate Gateway (Go)", "port": 8081, "health_path": "/health"},
    {"name": "AI Stylist Engine (Python)", "port": 8082, "health_path": "/health"},
    {"name": "Cryptographic Vault (Rust)", "port": 8083, "health_path": "/health"},
    {"name": "Financial Ledger (C# .NET)", "port": 8084, "health_path": "/health"},
    {"name": "Inventory Core (Java)", "port": 8085, "health_path": "/health"},
    {"name": "VIP Concierge (Kotlin)", "port": 8086, "health_path": "/health"},
    {"name": "Headless CMS (PHP)", "port": 8087, "health_path": "/health"},
    {"name": "Loyalty Engine (Ruby)", "port": 8088, "health_path": "/health"},
    {"name": "Real-time Telemetry (JavaScript)", "port": 8089, "health_path": "/health"},
]

def check_service(host: str, svc: dict, timeout: float = 2.0) -> dict:
    url = f"http://{host}:{svc['port']}{svc['health_path']}"
    start = time.perf_counter()
    status = "DOWN"
    code = 0
    duration_ms = 0.0

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Clothyy-HealthChecker/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            code = response.status
            duration_ms = (time.perf_counter() - start) * 1000.0
            if 200 <= code < 300:
                status = "UP"
    except (urllib.error.URLError, TimeoutError, ConnectionRefusedError, OSError) as e:
        duration_ms = (time.perf_counter() - start) * 1000.0

    return {
        "name": svc["name"],
        "port": svc["port"],
        "url": url,
        "status": status,
        "status_code": code,
        "latency_ms": round(duration_ms, 2)
    }

def main():
    host = sys.argv[1] if len(sys.argv) > 1 else "localhost"
    print(f"\n=======================================================")
    print(f" CLOTHYYY.COM — Cluster Health Monitor (Target: {host})")
    print(f"=======================================================")

    results = []
    for svc in SERVICES:
        res = check_service(host, svc)
        results.append(res)
        indicator = "🟢 [UP]" if res["status"] == "UP" else "🔴 [DOWN]"
        code_str = f"HTTP {res['status_code']}" if res["status_code"] else "UNREACHABLE"
        print(f" {indicator} {res['name']:<32} Port: {res['port']:<5} {code_str:<14} ({res['latency_ms']} ms)")

    print("=======================================================\n")

if __name__ == "__main__":
    main()
