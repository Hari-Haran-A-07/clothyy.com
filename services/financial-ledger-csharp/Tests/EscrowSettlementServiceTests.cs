using System;
using Xunit;
using FinancialLedger.Services;

namespace FinancialLedger.Tests
{
    public class EscrowSettlementServiceTests
    {
        private readonly EscrowSettlementService _service = new();

        [Fact]
        public void CalculateDisbursement_DistributesExactTotal()
        {
            decimal bidAmount = 15000.00m;
            var result = _service.CalculateDisbursement(bidAmount);

            Assert.Equal(15000.00m, result.TotalGrossAmount);
            Assert.Equal(10500.00m, result.AtelierPayout);      // 70%
            Assert.Equal(2700.00m, result.BoutiqueCommission);  // 18%
            Assert.Equal(1500.00m, result.PlatformFee);         // 10%
            Assert.Equal(300.00m, result.InsuranceReserve);     // 2%

            decimal total = result.AtelierPayout + result.BoutiqueCommission + result.PlatformFee + result.InsuranceReserve;
            Assert.Equal(bidAmount, total);
        }

        [Fact]
        public void CalculateDisbursement_ThrowsOnZeroOrNegative()
        {
            Assert.Throws<ArgumentException>(() => _service.CalculateDisbursement(0m));
            Assert.Throws<ArgumentException>(() => _service.CalculateDisbursement(-500m));
        }
    }
}
