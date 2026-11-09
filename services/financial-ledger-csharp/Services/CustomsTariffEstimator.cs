using System;
using System.Collections.Generic;

namespace FinancialLedger.Services
{
    public class TariffCalculationResult
    {
        public string CountryCode { get; set; } = string.Empty;
        public decimal BaseValue { get; set; }
        public decimal DutyRate { get; set; }
        public decimal DutyAmount { get; set; }
        public decimal LuxurySurcharge { get; set; }
        public decimal TotalCustomsCost { get; set; }
    }

    public class CustomsTariffEstimator
    {
        private readonly Dictionary<string, (decimal standardDutyRate, decimal luxuryThreshold, decimal luxurySurchargeRate)> _countryTariffRules =
            new(StringComparer.OrdinalIgnoreCase)
            {
                ["US"] = (0.075m, 1000m, 0.05m),
                ["GB"] = (0.120m, 800m, 0.06m),
                ["JP"] = (0.080m, 1200m, 0.04m),
                ["AE"] = (0.050m, 2000m, 0.02m),
                ["CH"] = (0.045m, 1500m, 0.03m),
                ["FR"] = (0.100m, 900m, 0.055m),
                ["IT"] = (0.100m, 900m, 0.055m)
            };

        public TariffCalculationResult EstimateDuty(string countryCode, decimal declaredValue)
        {
            if (declaredValue <= 0)
            {
                throw new ArgumentException("Declared value must be strictly positive.", nameof(declaredValue));
            }

            if (!_countryTariffRules.TryGetValue(countryCode, out var rule))
            {
                // Default harmonized standard duty
                rule = (0.090m, 1000m, 0.05m);
            }

            decimal dutyAmount = Math.Round(declaredValue * rule.standardDutyRate, 2);
            decimal luxurySurcharge = 0m;

            if (declaredValue > rule.luxuryThreshold)
            {
                decimal excess = declaredValue - rule.luxuryThreshold;
                luxurySurcharge = Math.Round(excess * rule.luxurySurchargeRate, 2);
            }

            return new TariffCalculationResult
            {
                CountryCode = countryCode.ToUpperInvariant(),
                BaseValue = declaredValue,
                DutyRate = rule.standardDutyRate,
                DutyAmount = dutyAmount,
                LuxurySurcharge = luxurySurcharge,
                TotalCustomsCost = dutyAmount + luxurySurcharge
            };
        }
    }
}
