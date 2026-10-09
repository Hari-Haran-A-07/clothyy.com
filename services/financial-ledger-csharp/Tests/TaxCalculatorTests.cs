using Clothyyy.FinancialLedger.Models;
using Clothyyy.FinancialLedger.Services;
using Xunit;

namespace Clothyyy.FinancialLedger.Tests
{
    public class TaxCalculatorTests
    {
        private readonly ITaxCalculatorService _taxService;

        public TaxCalculatorTests()
        {
            _taxService = new TaxCalculatorService();
        }

        [Fact]
        public void CalculateAndJournal_KuwaitDestination_ReturnsZeroTax()
        {
            var req = new InvoiceRequest
            {
                OrderNumber = "ORD-KWT-001",
                CustomerEmail = "vip@clothyyy.com",
                DestinationCountry = "Kuwait",
                SubtotalKWD = 1000.00m
            };

            var res = _taxService.CalculateAndJournal(req);

            Assert.Equal(0.00m, res.TaxRatePercent);
            Assert.Equal(0.00m, res.TaxAmountKWD);
            Assert.Equal(1000.00m, res.TotalAmountKWD);
            Assert.Contains("Zero-Rated", res.TaxAuthority);
        }

        [Fact]
        public void CalculateAndJournal_SaudiDestination_AppliesZATCA15Percent()
        {
            var req = new InvoiceRequest
            {
                OrderNumber = "ORD-KSA-002",
                CustomerEmail = "client@riyadh.sa",
                DestinationCountry = "Saudi Arabia",
                SubtotalKWD = 1000.00m
            };

            var res = _taxService.CalculateAndJournal(req);

            Assert.Equal(15.00m, res.TaxRatePercent);
            Assert.Equal(150.00m, res.TaxAmountKWD);
            Assert.Equal(1150.00m, res.TotalAmountKWD);
            Assert.Contains("ZATCA", res.TaxAuthority);
        }
    }
}
