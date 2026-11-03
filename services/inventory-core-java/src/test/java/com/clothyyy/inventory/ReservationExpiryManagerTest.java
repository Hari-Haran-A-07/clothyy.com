package com.clothyyy.inventory;

import com.clothyyy.inventory.service.ReservationExpiryManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

public class ReservationExpiryManagerTest {

    private ReservationExpiryManager expiryManager;

    @BeforeEach
    void setUp() {
        expiryManager = new ReservationExpiryManager(300_000); // 5 minutes
    }

    @Test
    void testReservationIsNotExpiredImmediately() {
        String resId = "res_test_101";
        expiryManager.trackReservation(resId);

        assertFalse(expiryManager.isExpired(resId, Instant.now()));
        assertEquals(1, expiryManager.activeReservationCount());
    }

    @Test
    void testReservationExpiresAfterTtl() {
        String resId = "res_test_202";
        expiryManager.trackReservation(resId);

        Instant sixMinutesLater = Instant.now().plusSeconds(360);
        assertTrue(expiryManager.isExpired(resId, sixMinutesLater));
    }

    @Test
    void testReleaseReservationRemovesFromTracking() {
        String resId = "res_test_303";
        expiryManager.trackReservation(resId);
        assertTrue(expiryManager.releaseReservation(resId));
        assertEquals(0, expiryManager.activeReservationCount());
    }
}
