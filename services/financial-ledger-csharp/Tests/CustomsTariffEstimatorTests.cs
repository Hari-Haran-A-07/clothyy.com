using System;
using FinancialLedger.Services;
using Xunit;

namespace FinancialLedger.Tests
{
    public class CustomsTariffEstimatorTests
    {
        private readonly CustomsTariffEstimator _estimator = new();

        [Fact]
        public void EstimateDuty_UnderLuxuryThreshold_CalculatesStandardDutyOnly()
        {
            var result = _estimator.EstimateDuty("US", 500m);

            Assert.Equal("US", result.CountryCode);
            Assert.Equal(500m, result.BaseValue);
            Assert.Equal(0.075m, result.DutyRate);
            Assert.Equal(37.50m, result.DutyAmount);
            Assert.Equal(0m, result.LuxurySurcharge);
            Assert.Equal(37.50m, result.TotalCustomsCost);
        }

        [Fact]
        public void EstimateDuty_AboveLuxuryThreshold_AppliesLuxurySurcharge()
        {
            // US threshold: 1000, surcharge: 5% on excess
            var result = _estimator.EstimateDuty("US", 2000m);

            Assert.Equal(150.00m, result.DutyAmount); // 2000 * 0.075
            Assert.Equal(50.00m, result.LuxurySurcharge); // (2000 - 1000) * 0.05
            Assert.Equal(200.00m, result.TotalCustomsCost);
        }

        [Fact]
        public void EstimateDuty_ZeroOrNegativeValue_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => _estimator.EstimateDuty("GB", 0m));
            Assert.Throws<ArgumentException>(() => _estimator.EstimateDuty("FR", -100m));
        }
    }
}
