package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

type ConversionRequest struct {
	AmountKWD float64 `json:"amount_kwd"`
	Currency  string  `json:"currency"`
}

type ConversionResponse struct {
	BaseAmountKWD   float64 `json:"base_amount_kwd"`
	TargetCurrency  string  `json:"target_currency"`
	ConvertedAmount float64 `json:"converted_amount"`
	FormattedPrice  string  `json:"formatted_price"`
	ExchangeRate    float64 `json:"exchange_rate"`
	LatencyMicros   int64   `json:"latency_microseconds"`
	Timestamp       string  `json:"timestamp"`
}

type HealthResponse struct {
	Service   string `json:"service"`
	Status    string `json:"status"`
	Language  string `json:"language"`
	Version   string `json:"version"`
	Timestamp string `json:"timestamp"`
}

func main() {
	currencyEngine := NewCurrencyEngine()
	rateLimiter := NewRateLimiter()

	mux := http.NewServeMux()

	// Health endpoint
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(HealthResponse{
			Service:   "CLOTHYYY Rate & Gateway Engine",
			Status:    "HEALTHY_ONLINE",
			Language:  "Go 1.22",
			Version:   "v3.1.0-enterprise",
			Timestamp: time.Now().UTC().Format(time.RFC3339),
		})
	})

	// Real-time conversion endpoint
	mux.HandleFunc("/api/v1/convert", func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		clientIP := r.RemoteAddr
		if !rateLimiter.Allow(clientIP, 100, 20.0) {
			http.Error(w, `{"error":"Rate limit exceeded. Try again in seconds."}`, http.StatusTooManyRequests)
			return
		}

		targetCurr := r.URL.Query().Get("currency")
		if targetCurr == "" {
			targetCurr = "USD"
		}
		rawAmount := r.URL.Query().Get("amount_kwd")
		amountKWD, err := strconv.ParseFloat(rawAmount, 64)
		if err != nil || amountKWD <= 0 {
			amountKWD = 100.0 // Default demo amount
		}

		converted, formatted, err := currencyEngine.ConvertPrice(amountKWD, targetCurr)
		if err != nil {
			http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusBadRequest)
			return
		}

		rates := currencyEngine.GetAllRates()
		rate := rates[targetCurr]

		elapsed := time.Since(start).Microseconds()

		resp := ConversionResponse{
			BaseAmountKWD:   amountKWD,
			TargetCurrency:  targetCurr,
			ConvertedAmount: converted,
			FormattedPrice:  formatted,
			ExchangeRate:    rate,
			LatencyMicros:   elapsed,
			Timestamp:       time.Now().UTC().Format(time.RFC3339),
		}

		json.NewEncoder(w).Encode(resp)
	})

	// Rates snapshot endpoint
	mux.HandleFunc("/api/v1/rates", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"base":      "KWD",
			"rates":     currencyEngine.GetAllRates(),
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
	})

	port := ":8081"
	log.Printf("[CLOTHYYY Go Gateway] Starting high-speed server on port %s...\n", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
