package main

import (
	"errors"
	"sync"
	"time"
)

// State represents the current status of the Circuit Breaker
type State int

const (
	StateClosed State = iota
	StateHalfOpen
	StateOpen
)

func (s State) String() string {
	switch s {
	case StateClosed:
		return "CLOSED"
	case StateHalfOpen:
		return "HALF_OPEN"
	case StateOpen:
		return "OPEN"
	default:
		return "UNKNOWN"
	}
}

var (
	ErrCircuitOpen = errors.New("circuit breaker is open: request denied")
)

// CircuitBreaker safeguards inter-service RPC calls from cascading failures
type CircuitBreaker struct {
	maxFailures  int
	resetTimeout time.Duration
	state        State
	failures     int
	lastFailure  time.Time
	mu           sync.RWMutex
}

// NewCircuitBreaker initializes a circuit breaker
func NewCircuitBreaker(maxFailures int, resetTimeout time.Duration) *CircuitBreaker {
	return &CircuitBreaker{
		maxFailures:  maxFailures,
		resetTimeout: resetTimeout,
		state:        StateClosed,
	}
}

// State returns the current circuit state
func (cb *CircuitBreaker) State() State {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	if cb.state == StateOpen && time.Since(cb.lastFailure) > cb.resetTimeout {
		cb.state = StateHalfOpen
	}
	return cb.state
}

// Execute wraps an external network operation with circuit breaker protection
func (cb *CircuitBreaker) Execute(operation func() error) error {
	cb.mu.Lock()
	if cb.state == StateOpen {
		if time.Since(cb.lastFailure) > cb.resetTimeout {
			cb.state = StateHalfOpen
		} else {
			cb.mu.Unlock()
			return ErrCircuitOpen
		}
	}
	cb.mu.Unlock()

	err := operation()

	cb.mu.Lock()
	defer cb.mu.Unlock()

	if err != nil {
		cb.failures++
		cb.lastFailure = time.Now()
		if cb.failures >= cb.maxFailures || cb.state == StateHalfOpen {
			cb.state = StateOpen
		}
		return err
	}

	// Success case
	if cb.state == StateHalfOpen || cb.failures > 0 {
		cb.state = StateClosed
		cb.failures = 0
	}
	return nil
}
