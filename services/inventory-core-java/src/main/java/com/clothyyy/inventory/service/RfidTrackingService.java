package com.clothyyy.inventory.service;

import java.util.*;

/**
 * Reconciles real-time RFID scanner gate events with boutique inventory registry.
 */
public class RfidTrackingService {

    public record RfidReconciliationResult(
        int totalExpected,
        int totalScanned,
        Set<String> matchedSerials,
        Set<String> missingSerials,
        Set<String> unexpectedSerials
    ) {
        public boolean isDiscrepancyFree() {
            return missingSerials.isEmpty() && unexpectedSerials.isEmpty();
        }
    }

    public RfidReconciliationResult reconcileScanBatch(Set<String> expectedInBoutique, Set<String> actualScanned) {
        Set<String> matched = new HashSet<>(expectedInBoutique);
        matched.retainAll(actualScanned);

        Set<String> missing = new HashSet<>(expectedInBoutique);
        missing.removeAll(actualScanned);

        Set<String> unexpected = new HashSet<>(actualScanned);
        unexpected.removeAll(expectedInBoutique);

        return new RfidReconciliationResult(
            expectedInBoutique.size(),
            actualScanned.size(),
            Collections.unmodifiableSet(matched),
            Collections.unmodifiableSet(missing),
            Collections.unmodifiableSet(unexpected)
        );
    }
}
