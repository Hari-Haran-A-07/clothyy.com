package main

import (
	"sync"
	"time"
)

// SlidingWindowRateLimiter tracks microsecond timestamps per client to enforce smooth request rates
type SlidingWindowRateLimiter struct {
	mu           sync.Mutex
	windowSize   time.Duration
	maxLimit     int
	requestLogs  map[string][]time.Time
}

func NewSlidingWindowRateLimiter(windowSize time.Duration, maxLimit int) *SlidingWindowRateLimiter {
	return &SlidingWindowRateLimiter{
		windowSize:  windowSize,
		maxLimit:    maxLimit,
		requestLogs: make(map[string][]time.Time),
	}
}

func (s *SlidingWindowRateLimiter) Allow(clientID string, now time.Time) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	cutoff := now.Add(-s.windowSize)
	timestamps := s.requestLogs[clientID]

	// Purge timestamps older than cutoff
	validIndex := 0
	for i, t := range timestamps {
		if t.After(cutoff) {
			validIndex = i
			break
		}
		if i == len(timestamps)-1 {
			validIndex = len(timestamps)
		}
	}

	trimmed := timestamps[validIndex:]

	if len(trimmed) < s.maxLimit {
		s.requestLogs[clientID] = append(trimmed, now)
		return true
	}

	s.requestLogs[clientID] = trimmed
	return false
}

func (s *SlidingWindowRateLimiter) ActiveRequestCount(clientID string) int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return len(s.requestLogs[clientID])
}
