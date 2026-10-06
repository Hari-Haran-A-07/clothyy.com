package main

import (
	"sync"
	"time"
)

// TokenBucket represents an enterprise rate limiter per IP/client
type TokenBucket struct {
	capacity     int
	tokens       float64
	refillRate   float64 // tokens per second
	lastRefilled time.Time
	mu           sync.Mutex
}

// RateLimiter manages client buckets for DDoS and bot protection on luxury high-demand drops
type RateLimiter struct {
	buckets map[string]*TokenBucket
	mu      sync.Mutex
}

// NewRateLimiter creates a thread-safe token bucket limiter
func NewRateLimiter() *RateLimiter {
	return &RateLimiter{
		buckets: make(map[string]*TokenBucket),
	}
}

// Allow checks if a request from a client key is permitted
func (rl *RateLimiter) Allow(clientIP string, capacity int, refillRate float64) bool {
	rl.mu.Lock()
	bucket, exists := rl.buckets[clientIP]
	if !exists {
		bucket = &TokenBucket{
			capacity:     capacity,
			tokens:       float64(capacity),
			refillRate:   refillRate,
			lastRefilled: time.Now(),
		}
		rl.buckets[clientIP] = bucket
	}
	rl.mu.Unlock()

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
