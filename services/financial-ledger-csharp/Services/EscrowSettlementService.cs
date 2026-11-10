using System;

namespace FinancialLedger.Services
{
    public class EscrowSplitBreakdown
    {
        public decimal TotalGrossAmount { get; set; }
        public decimal AtelierPayout { get; set; }
        public decimal BoutiqueCommission { get; set; }
        public decimal PlatformFee { get; set; }
        public decimal InsuranceReserve { get; set; }
    }

    public class EscrowSettlementService
    {
        private const decimal AtelierRate = 0.70m;
        private const decimal BoutiqueRate = 0.18m;
        private const decimal PlatformRate = 0.10m;
        private const decimal InsuranceRate = 0.02m;

        public EscrowSplitBreakdown CalculateDisbursement(decimal grossWinningBid)
        {
            if (grossWinningBid <= 0)
            {
                throw new ArgumentException("Gross winning bid must be positive.", nameof(grossWinningBid));
            }

            decimal atelier = Math.Round(grossWinningBid * AtelierRate, 2);
            decimal boutique = Math.Round(grossWinningBid * BoutiqueRate, 2);
            decimal platform = Math.Round(grossWinningBid * PlatformRate, 2);
            decimal insurance = Math.Round(grossWinningBid * InsuranceRate, 2);

            // Reconcile minor roundoff drift against the platform fee
            decimal sum = atelier + boutique + platform + insurance;
            decimal diff = grossWinningBid - sum;
            platform += diff;

            return new EscrowSplitBreakdown
            {
                TotalGrossAmount = grossWinningBid,
                AtelierPayout = atelier,
                BoutiqueCommission = boutique,
                PlatformFee = platform,
                InsuranceReserve = insurance
            };
        }
    }
}
