package main

import (
	"testing"
)

func TestCurrencyConversion(t *testing.T) {
	ce := NewCurrencyEngine()

	tests := []struct {
		amountKWD      float64
		targetCurrency string
		expectedMin    float64
		expectedMax    float64
	}{
		{100.0, "USD", 320.0, 330.0},
		{100.0, "EUR", 300.0, 310.0},
		{100.0, "GBP", 250.0, 265.0},
		{100.0, "AED", 1190.0, 1205.0},
		{100.0, "SAR", 1220.0, 1230.0},
		{100.0, "JPY", 48800.0, 49000.0},
		{100.0, "KWD", 99.9, 100.1},
	}

	for _, tc := range tests {
		converted, formatted, err := ce.ConvertPrice(tc.amountKWD, tc.targetCurrency)
		if err != nil {
			t.Fatalf("Unexpected error for %s: %v", tc.targetCurrency, err)
		}
		if converted < tc.expectedMin || converted > tc.expectedMax {
			t.Errorf("Conversion for %s out of expected bounds: got %f", tc.targetCurrency, converted)
		}
		if formatted == "" {
			t.Errorf("Expected non-empty formatted price string for %s", tc.targetCurrency)
		}
	}
}

func TestUnsupportedCurrency(t *testing.T) {
	ce := NewCurrencyEngine()
	_, _, err := ce.ConvertPrice(100.0, "XYZ_UNKNOWN")
	if err == nil {
		t.Errorf("Expected error for unsupported currency, got nil")
	}
}
