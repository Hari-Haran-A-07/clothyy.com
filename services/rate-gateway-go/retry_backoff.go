package main

import (
	"context"
	"math"
	"math/rand"
	"time"
)

// BackoffConfig defines exponential backoff with full jitter parameters
type BackoffConfig struct {
	BaseDelay  time.Duration
	MaxDelay   time.Duration
	MaxRetries int
}

// CalculateDelay computes full-jitter exponential backoff for attempt number
func CalculateDelay(attempt int, cfg BackoffConfig) time.Duration {
	if attempt <= 0 {
		return cfg.BaseDelay
	}

	multiplier := math.Pow(2, float64(attempt))
	delay := float64(cfg.BaseDelay) * multiplier

	if delay > float64(cfg.MaxDelay) {
		delay = float64(cfg.MaxDelay)
	}

	jittered := time.Duration(rand.Int63n(int64(delay)))
	if jittered < cfg.BaseDelay {
		return cfg.BaseDelay
	}
	return jittered
}

// ExecuteWithRetry runs an operation with exponential backoff and context timeout
func ExecuteWithRetry(ctx context.Context, cfg BackoffConfig, op func() error) error {
	var err error
	for attempt := 0; attempt <= cfg.MaxRetries; attempt++ {
		err = op()
		if err == nil {
			return nil
		}

		if attempt == cfg.MaxRetries {
			break
		}

		delay := CalculateDelay(attempt, cfg)
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(delay):
		}
	}
	return err
}
