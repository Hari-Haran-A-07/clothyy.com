package main

import (
	"sync"
	"testing"
)

func TestRateLimiterAllowance(t *testing.T) {
	rl := NewRateLimiter()
	ip := "192.168.1.100"

	// Should allow capacity bursts
	for i := 0; i < 10; i++ {
		if !rl.Allow(ip, 10, 1.0) {
			t.Fatalf("Request %d should be allowed within burst capacity", i)
		}
	}

	// 11th request should be throttled immediately
	if rl.Allow(ip, 10, 1.0) {
		t.Fatalf("Request beyond capacity should have been throttled")
	}
}

func TestConcurrentRateLimiting(t *testing.T) {
	rl := NewRateLimiter()
	ip := "10.0.0.1"

	var wg sync.WaitGroup
	var allowedCount int
	var mu sync.Mutex

	for i := 0; i < 50; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if rl.Allow(ip, 20, 5.0) {
				mu.Lock()
				allowedCount++
				mu.Unlock()
			}
		}()
	}

	wg.Wait()
	if allowedCount > 25 {
		t.Errorf("Allowed too many concurrent tokens: %d (max ~20)", allowedCount)
	}
}
