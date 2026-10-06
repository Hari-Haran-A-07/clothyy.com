package com.clothyyy.inventory.service;

import com.clothyyy.inventory.model.StockReservationDto;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InventoryService {

    // Multi-hub stock cache (Sku -> (Warehouse -> Quantity))
    private final Map<String, Map<String, Integer>> stockGrid = new ConcurrentHashMap<>();

    public InventoryService() {
        // Initialize sample high-fashion allocations
        initStock("c1", Map.of("KWT-MAIN", 12, "DXB-HUB", 8, "PAR-ATELIER", 5, "TKY-GINZA", 3));
        initStock("c2", Map.of("KWT-MAIN", 18, "DXB-HUB", 14, "PAR-ATELIER", 9, "TKY-GINZA", 6));
        initStock("c3", Map.of("KWT-MAIN", 9, "DXB-HUB", 7, "PAR-ATELIER", 4, "TKY-GINZA", 2));
    }

    private void initStock(String sku, Map<String, Integer> hubs) {
        stockGrid.put(sku, new HashMap<>(hubs));
    }

    public StockReservationDto reserveStock(String sku, String size, int qty, String preferredWarehouse) {
        Map<String, Integer> hubs = stockGrid.computeIfAbsent(sku, k -> new HashMap<>(Map.of("KWT-MAIN", 10, "DXB-HUB", 5)));

        String hub = hubs.containsKey(preferredWarehouse) ? preferredWarehouse : "KWT-MAIN";
        int current = hubs.getOrDefault(hub, 0);

        boolean success = current >= qty;
        if (success) {
            hubs.put(hub, current - qty);
        }

        return new StockReservationDto(
            sku,
            size,
            qty,
            hub,
            success,
            success ? "RES-JAVA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase() : "STOCK_UNAVAILABLE",
            new HashMap<>(hubs),
            Instant.now()
        );
    }

    public Map<String, Map<String, Integer>> getGlobalStockSnapshot() {
        return new HashMap<>(stockGrid);
    }
}
