package main

import (
	"testing"
	"time"
)

func TestSlidingWindowRateLimiter_AllowsWithinLimit(t *testing.T) {
	limiter := NewSlidingWindowRateLimiter(time.Minute, 3)
	now := time.Now()

	if !limiter.Allow("user-vip-1", now) {
		t.Fatalf("expected request 1 to be allowed")
	}
	if !limiter.Allow("user-vip-1", now.Add(time.Second*10)) {
		t.Fatalf("expected request 2 to be allowed")
	}
	if !limiter.Allow("user-vip-1", now.Add(time.Second*20)) {
		t.Fatalf("expected request 3 to be allowed")
	}
	// 4th request exceeds maxLimit of 3
	if limiter.Allow("user-vip-1", now.Add(time.Second*30)) {
		t.Fatalf("expected request 4 to be rejected")
	}
}

func TestSlidingWindowRateLimiter_RecoversAfterWindowExpiry(t *testing.T) {
	limiter := NewSlidingWindowRateLimiter(time.Second*10, 2)
	now := time.Now()

	limiter.Allow("client-app", now)
	limiter.Allow("client-app", now.Add(time.Second*1))

	// Blocked at 2 seconds
	if limiter.Allow("client-app", now.Add(time.Second*2)) {
		t.Fatalf("expected request to be rate limited")
	}

	// Allowed at 12 seconds because first request expired
	if !limiter.Allow("client-app", now.Add(time.Second*12)) {
		t.Fatalf("expected request after window slide to be allowed")
	}
}
