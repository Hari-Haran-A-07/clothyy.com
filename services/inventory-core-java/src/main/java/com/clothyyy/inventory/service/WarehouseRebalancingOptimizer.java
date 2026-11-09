package com.clothyyy.inventory.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Optimizes transfer routes between regional luxury fulfillment hubs
 * (e.g., Paris Atelier, Milan Boutique, New York Hub, Tokyo Flagship).
 */
public class WarehouseRebalancingOptimizer {

    public record StockPosition(String warehouseId, int currentStock, int targetBuffer) {
        public int getDeficit() {
            return Math.max(0, targetBuffer - currentStock);
        }

        public int getSurplus() {
            return Math.max(0, currentStock - targetBuffer);
        }
    }

    public record TransferRecommendation(String sourceWarehouse, String destinationWarehouse, int transferUnits) {}

    public List<TransferRecommendation> computeRebalancePlan(List<StockPosition> positions) {
        List<TransferRecommendation> recommendations = new ArrayList<>();
        List<StockPosition> donors = new ArrayList<>();
        List<StockPosition> recipients = new ArrayList<>();

        for (StockPosition pos : positions) {
            if (pos.getSurplus() > 0) {
                donors.add(pos);
            } else if (pos.getDeficit() > 0) {
                recipients.add(pos);
            }
        }

        int donorIdx = 0;
        int recipientIdx = 0;

        int currentDonorSurplus = donors.isEmpty() ? 0 : donors.get(0).getSurplus();
        int currentRecipientDeficit = recipients.isEmpty() ? 0 : recipients.get(0).getDeficit();

        while (donorIdx < donors.size() && recipientIdx < recipients.size()) {
            int transferAmount = Math.min(currentDonorSurplus, currentRecipientDeficit);
            if (transferAmount > 0) {
                recommendations.add(new TransferRecommendation(
                    donors.get(donorIdx).warehouseId(),
                    recipients.get(recipientIdx).warehouseId(),
                    transferAmount
                ));
            }

            currentDonorSurplus -= transferAmount;
            currentRecipientDeficit -= transferAmount;

            if (currentDonorSurplus == 0) {
                donorIdx++;
                if (donorIdx < donors.size()) {
                    currentDonorSurplus = donors.get(donorIdx).getSurplus();
                }
            }

            if (currentRecipientDeficit == 0) {
                recipientIdx++;
                if (recipientIdx < recipients.size()) {
                    currentRecipientDeficit = recipients.get(recipientIdx).getDeficit();
                }
            }
        }

        return recommendations;
    }
}
