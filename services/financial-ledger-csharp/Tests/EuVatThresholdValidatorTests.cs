using Clothyyy.FinancialLedger.Services;
using Xunit;

namespace Clothyyy.FinancialLedger.Tests
{
    public class EuVatThresholdValidatorTests
    {
        [Theory]
        [InlineData("FR", 0.20)]
        [InlineData("IT", 0.22)]
        [InlineData("DE", 0.19)]
        [InlineData("ES", 0.21)]
        public void GetStandardVatRate_ReturnsCorrectTaxRate(string countryCode, decimal expectedRate)
        {
            var validator = new EuVatThresholdValidator();
            var rate = validator.GetStandardVatRate(countryCode);
            Assert.Equal(expectedRate, rate);
        }

        [Fact]
        public void Switzerland_HighValue_IsDutyFreeEligible()
        {
            var validator = new EuVatThresholdValidator();
            var eligible = validator.IsDutyFreeEligible("CH", 15000.0m);
            Assert.True(eligible);
        }
    }
}
