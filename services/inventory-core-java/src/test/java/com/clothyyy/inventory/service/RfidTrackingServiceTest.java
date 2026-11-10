package com.clothyyy.inventory.service;

import org.junit.jupiter.api.Test;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class RfidTrackingServiceTest {

    private final RfidTrackingService service = new RfidTrackingService();

    @Test
    void shouldReportDiscrepancyFreeWhenAllMatch() {
        Set<String> expected = Set.of("RFID-COUTURE-01", "RFID-COUTURE-02");
        Set<String> scanned = Set.of("RFID-COUTURE-01", "RFID-COUTURE-02");

        var result = service.reconcileScanBatch(expected, scanned);

        assertTrue(result.isDiscrepancyFree());
        assertEquals(2, result.matchedSerials().size());
        assertTrue(result.missingSerials().isEmpty());
        assertTrue(result.unexpectedSerials().isEmpty());
    }

    @Test
    void shouldIdentifyMissingAndUnexpectedItems() {
        Set<String> expected = Set.of("RFID-COUTURE-01", "RFID-COUTURE-02", "RFID-COUTURE-03");
        Set<String> scanned = Set.of("RFID-COUTURE-01", "RFID-COUTURE-99");

        var result = service.reconcileScanBatch(expected, scanned);

        assertFalse(result.isDiscrepancyFree());
        assertEquals(Set.of("RFID-COUTURE-01"), result.matchedSerials());
        assertEquals(Set.of("RFID-COUTURE-02", "RFID-COUTURE-03"), result.missingSerials());
        assertEquals(Set.of("RFID-COUTURE-99"), result.unexpectedSerials());
    }
}
