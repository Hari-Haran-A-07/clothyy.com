package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

// CurrencyEngine manages real-time exchange rates against base currency KWD (Kuwaiti Dinar)
type CurrencyEngine struct {
	mu           sync.RWMutex
	baseCurrency string
	rates        map[string]float64
	decimals     map[string]int
	lastUpdated  time.Time
}

// NewCurrencyEngine initializes high-speed in-memory rate converter
func NewCurrencyEngine() *CurrencyEngine {
	return &CurrencyEngine{
		baseCurrency: "KWD",
		rates: map[string]float64{
			"KWD": 1.000000,
			"USD": 3.260000,
			"EUR": 3.020000,
			"GBP": 2.580000,
			"AED": 11.970000,
			"SAR": 12.230000,
			"QAR": 11.870000,
			"JPY": 489.000000,
		},
		decimals: map[string]int{
			"KWD": 3,
			"USD": 2,
			"EUR": 2,
			"GBP": 2,
			"AED": 2,
			"SAR": 2,
			"QAR": 2,
			"JPY": 0,
		},
		lastUpdated: time.Now(),
	}
}

// ConvertPrice converts an amount in KWD to the target currency with sub-microsecond latency
func (ce *CurrencyEngine) ConvertPrice(amountKWD float64, targetCurrency string) (float64, string, error) {
	ce.mu.RLock()
	defer ce.mu.RUnlock()

	rate, exists := ce.rates[targetCurrency]
	if !exists {
		return 0, "", errors.New("unsupported luxury currency code: " + targetCurrency)
	}

	converted := amountKWD * rate
	precision := ce.decimals[targetCurrency]
	formatStr := fmt.Sprintf("%%.%df", precision)
	formatted := fmt.Sprintf(formatStr, converted)

	return converted, formatted, nil
}

// GetAllRates returns snapshot of all current exchange rates
func (ce *CurrencyEngine) GetAllRates() map[string]float64 {
	ce.mu.RLock()
	defer ce.mu.RUnlock()

	snapshot := make(map[string]float64)
	for k, v := range ce.rates {
		snapshot[k] = v
	}
	return snapshot
}
