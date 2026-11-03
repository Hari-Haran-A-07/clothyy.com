package main

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestCalculateDelayBounds(t *testing.T) {
	cfg := BackoffConfig{
		BaseDelay:  10 * time.Millisecond,
		MaxDelay:   200 * time.Millisecond,
		MaxRetries: 3,
	}

	for attempt := 0; attempt < 5; attempt++ {
		delay := CalculateDelay(attempt, cfg)
		if delay < cfg.BaseDelay {
			t.Errorf("delay %v should not be less than base delay %v", delay, cfg.BaseDelay)
		}
		if delay > cfg.MaxDelay {
			t.Errorf("delay %v should not exceed max delay %v", delay, cfg.MaxDelay)
		}
	}
}

func TestExecuteWithRetrySuccess(t *testing.T) {
	cfg := BackoffConfig{
		BaseDelay:  2 * time.Millisecond,
		MaxDelay:   10 * time.Millisecond,
		MaxRetries: 3,
	}

	calls := 0
	err := ExecuteWithRetry(context.Background(), cfg, func() error {
		calls++
		if calls < 2 {
			return errors.New("transient network hiccup")
		}
		return nil
	})

	if err != nil {
		t.Fatalf("expected retry to succeed, got %v", err)
	}
	if calls != 2 {
		t.Fatalf("expected 2 calls, got %d", calls)
	}
}
