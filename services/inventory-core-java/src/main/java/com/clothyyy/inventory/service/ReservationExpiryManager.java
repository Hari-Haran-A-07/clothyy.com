package com.clothyyy.inventory.service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Manages inventory reservations and handles TTL timeouts
 * to release reserved stock back into general atelier availability.
 */
public class ReservationExpiryManager {

    private final long defaultTtlMillis;
    private final Map<String, Instant> reservationTimestamps = new ConcurrentHashMap<>();

    public ReservationExpiryManager(long defaultTtlMillis) {
        this.defaultTtlMillis = defaultTtlMillis;
    }

    public void trackReservation(String reservationId) {
        reservationTimestamps.put(reservationId, Instant.now().plusMillis(defaultTtlMillis));
    }

    public boolean isExpired(String reservationId, Instant referenceTime) {
        Instant expiry = reservationTimestamps.get(reservationId);
        if (expiry == null) {
            return true;
        }
        return referenceTime.isAfter(expiry);
    }

    public boolean releaseReservation(String reservationId) {
        return reservationTimestamps.remove(reservationId) != null;
    }

    public int activeReservationCount() {
        return reservationTimestamps.size();
    }
}
