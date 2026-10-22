package main

import (
	"errors"
	"testing"
	"time"
)

func TestCircuitBreaker_StateTransitions(t *testing.T) {
	cb := NewCircuitBreaker(2, 50*time.Millisecond)

	// Initially closed
	if cb.State() != StateClosed {
		t.Fatalf("expected state CLOSED, got %s", cb.State())
	}

	errDummy := errors.New("upstream service timeout")

	// First failure - remains closed
	_ = cb.Execute(func() error {
		return errDummy
	})
	if cb.State() != StateClosed {
		t.Fatalf("expected state CLOSED after 1 failure, got %s", cb.State())
	}

	// Second failure - trips to open
	_ = cb.Execute(func() error {
		return errDummy
	})
	if cb.State() != StateOpen {
		t.Fatalf("expected state OPEN after reaching max failures, got %s", cb.State())
	}

	// Execution blocked while open
	err := cb.Execute(func() error {
		return nil
	})
	if !errors.Is(err, ErrCircuitOpen) {
		t.Fatalf("expected ErrCircuitOpen, got %v", err)
	}

	// Wait for reset timeout to transition to half-open
	time.Sleep(60 * time.Millisecond)

	// Operation succeeds in half-open -> closes breaker
	err = cb.Execute(func() error {
		return nil
	})
	if err != nil {
		t.Fatalf("expected nil error on recovery, got %v", err)
	}

	if cb.State() != StateClosed {
		t.Fatalf("expected state CLOSED after successful probe, got %s", cb.State())
	}
}
