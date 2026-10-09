package com.clothyyy.inventory;

import com.clothyyy.inventory.model.StockReservationDto;
import com.clothyyy.inventory.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

class InventoryServiceTest {

    private InventoryService inventoryService;

    @BeforeEach
    void setUp() {
        inventoryService = new InventoryService();
    }

    @Test
    @DisplayName("Should successfully reserve stock when units are available in Kuwait Hub")
    void testStockReservationSuccess() {
        StockReservationDto result = inventoryService.reserveStock("c1", "M", 2, "KWT-MAIN");
        assertTrue(result.isReserved());
        assertNotNull(result.reservationToken());
        assertTrue(result.reservationToken().startsWith("RES-JAVA-"));
    }

    @Test
    @DisplayName("Concurrent stock reservations should remain thread-safe without overselling")
    void testConcurrentReservations() throws InterruptedException {
        int threads = 15;
        ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
        CountDownLatch latch = new CountDownLatch(threads);
        AtomicInteger successCount = new AtomicInteger(0);

        for (int i = 0; i < threads; i++) {
            executor.submit(() -> {
                try {
                    StockReservationDto res = inventoryService.reserveStock("c1", "L", 1, "KWT-MAIN");
                    if (res.isReserved()) {
                        successCount.incrementAndGet();
                    }
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        // Initial inventory was 12; should never exceed 12 successful reservations
        assertTrue(successCount.get() <= 12, "Overselling detected! Successful: " + successCount.get());
    }
}
