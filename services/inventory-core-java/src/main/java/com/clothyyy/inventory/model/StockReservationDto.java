package com.clothyyy.inventory.model;

import java.time.Instant;
import java.util.Map;

public record StockReservationDto(
    String sku,
    String size,
    int requestedQuantity,
    String preferredWarehouse,
    boolean isReserved,
    String reservationToken,
    Map<String, Integer> globalWarehouseAllocation,
    Instant timestamp
) {}
