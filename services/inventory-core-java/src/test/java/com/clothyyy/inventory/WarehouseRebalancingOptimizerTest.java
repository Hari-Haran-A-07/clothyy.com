package com.clothyyy.inventory;

import com.clothyyy.inventory.service.WarehouseRebalancingOptimizer;
import com.clothyyy.inventory.service.WarehouseRebalancingOptimizer.StockPosition;
import com.clothyyy.inventory.service.WarehouseRebalancingOptimizer.TransferRecommendation;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WarehouseRebalancingOptimizerTest {

    private final WarehouseRebalancingOptimizer optimizer = new WarehouseRebalancingOptimizer();

    @Test
    void testRebalancePlanResolvesDeficitsFromSurplusHubs() {
        // Paris has surplus 30 (50 current - 20 target)
        // Tokyo has deficit 20 (10 current - 30 target)
        // Milan has deficit 10 (5 current - 15 target)
        List<StockPosition> positions = List.of(
            new StockPosition("WH-PARIS-01", 50, 20),
            new StockPosition("WH-TOKYO-01", 10, 30),
            new StockPosition("WH-MILAN-01", 5, 15)
        );

        List<TransferRecommendation> plan = optimizer.computeRebalancePlan(positions);

        assertEquals(2, plan.size());
        assertEquals("WH-PARIS-01", plan.get(0).sourceWarehouse());
        assertEquals("WH-TOKYO-01", plan.get(0).destinationWarehouse());
        assertEquals(20, plan.get(0).transferUnits());

        assertEquals("WH-PARIS-01", plan.get(1).sourceWarehouse());
        assertEquals("WH-MILAN-01", plan.get(1).destinationWarehouse());
        assertEquals(10, plan.get(1).transferUnits());
    }

    @Test
    void testRebalancePlanReturnsEmptyWhenAllHubsBalanced() {
        List<StockPosition> positions = List.of(
            new StockPosition("WH-PARIS-01", 20, 20),
            new StockPosition("WH-LONDON-01", 15, 15)
        );

        List<TransferRecommendation> plan = optimizer.computeRebalancePlan(positions);
        assertTrue(plan.isEmpty());
    }
}
