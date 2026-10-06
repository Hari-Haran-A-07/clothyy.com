package com.clothyyy.inventory.controller;

import com.clothyyy.inventory.model.StockReservationDto;
import com.clothyyy.inventory.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
            "service", "CLOTHYYY Global Inventory & Warehousing Core",
            "status", "HEALTHY_ONLINE",
            "language", "Java 21 (Spring Boot 3.2.3)",
            "virtual_threads", "ENABLED_PROJECT_LOOM",
            "timestamp", Instant.now().toString()
        ));
    }

    @PostMapping("/reserve")
    public ResponseEntity<StockReservationDto> reserve(@RequestBody Map<String, Object> req) {
        String sku = (String) req.getOrDefault("sku", "c1");
        String size = (String) req.getOrDefault("size", "M");
        int qty = Integer.parseInt(req.getOrDefault("quantity", "1").toString());
        String warehouse = (String) req.getOrDefault("warehouse", "KWT-MAIN");

        StockReservationDto result = inventoryService.reserveStock(sku, size, qty, warehouse);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/snapshot")
    public ResponseEntity<?> snapshot() {
        return ResponseEntity.ok(Map.of(
            "warehouses", Map.of(
                "KWT-MAIN", "Kuwait Central Hub",
                "DXB-HUB", "Dubai Logistics Center",
                "PAR-ATELIER", "Paris Haute Couture Studio",
                "TKY-GINZA", "Tokyo Flagship Stockroom"
            ),
            "stock_grid", inventoryService.getGlobalStockSnapshot(),
            "timestamp", Instant.now().toString()
        ));
    }
}
