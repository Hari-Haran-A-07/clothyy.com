package main

import (
	"sync"
	"time"
)

// TenantTier represents the QoS quota tier for boutiques, VIP concierge, and public clients
type TenantTier string

const (
	TierPublic    TenantTier = "PUBLIC"
	TierBoutique  TenantTier = "BOUTIQUE"
	TierVIPMaster TenantTier = "VIP_MASTER"
)

type TenantQuota struct {
	Capacity   int
	RefillRate float64
}

var DefaultQuotas = map[TenantTier]TenantQuota{
	TierPublic:    {Capacity: 60, RefillRate: 1.0},
	TierBoutique:  {Capacity: 300, RefillRate: 10.0},
	TierVIPMaster: {Capacity: 1200, RefillRate: 50.0},
}

// MultiTenantRateLimiter isolates rate tokens per tenant and tier
type MultiTenantRateLimiter struct {
	mu      sync.RWMutex
	buckets map[string]*TokenBucket
}

func NewMultiTenantRateLimiter() *MultiTenantRateLimiter {
	return &MultiTenantRateLimiter{
		buckets: make(map[string]*TokenBucket),
	}
}

func (m *MultiTenantRateLimiter) AllowTenant(tenantID string, tier TenantTier) bool {
	quota, ok := DefaultQuotas[tier]
	if !ok {
		quota = DefaultQuotas[TierPublic]
	}

	m.mu.Lock()
	bucket, exists := m.buckets[tenantID]
	if !exists {
		bucket = &TokenBucket{
			capacity:     quota.Capacity,
			tokens:       float64(quota.Capacity),
			refillRate:   quota.RefillRate,
			lastRefilled: time.Now(),
		}
		m.buckets[tenantID] = bucket
	}
	m.mu.Unlock()

	bucket.mu.Lock()
	defer bucket.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(bucket.lastRefilled).Seconds()
	bucket.tokens += elapsed * bucket.refillRate
	if bucket.tokens > float64(bucket.capacity) {
		bucket.tokens = float64(bucket.capacity)
	}
	bucket.lastRefilled = now

	if bucket.tokens >= 1.0 {
		bucket.tokens -= 1.0
		return true
	}

	return false
}
