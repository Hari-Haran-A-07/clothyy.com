package main

import (
	"testing"
)

func TestMultiTenantRateLimiterAllowVIP(t *testing.T) {
	limiter := NewMultiTenantRateLimiter()

	tenantID := "boutique-paris-vendome"

	// Initial quota for boutique is 300
	for i := 0; i < 10; i++ {
		if !limiter.AllowTenant(tenantID, TierBoutique) {
			t.Fatalf("expected request %d to be allowed for boutique tier", i)
		}
	}
}

func TestMultiTenantRateLimiterExhaustion(t *testing.T) {
	limiter := NewMultiTenantRateLimiter()
	tenantID := "unauthorized-scraper-bot"

	// Exhaust public quota quickly (capacity = 60)
	allowedCount := 0
	for i := 0; i < 70; i++ {
		if limiter.AllowTenant(tenantID, TierPublic) {
			allowedCount++
		}
	}

	if allowedCount > 60 {
		t.Fatalf("expected at most 60 tokens for public tier, got %d", allowedCount)
	}
}
