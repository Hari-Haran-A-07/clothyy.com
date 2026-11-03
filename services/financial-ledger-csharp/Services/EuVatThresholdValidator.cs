using System;
using System.Collections.Generic;

namespace Clothyyy.FinancialLedger.Services
{
    public interface IEuVatThresholdValidator
    {
        decimal GetStandardVatRate(string countryIsoCode);
        bool IsDutyFreeEligible(string destinationCountryIso, decimal orderAmountUsd);
    }

    public class EuVatThresholdValidator : IEuVatThresholdValidator
    {
        private static readonly Dictionary<string, decimal> StandardVatRates = new(StringComparer.OrdinalIgnoreCase)
        {
            { "FR", 0.20m }, // France
            { "IT", 0.22m }, // Italy
            { "DE", 0.19m }, // Germany
            { "ES", 0.21m }, // Spain
            { "NL", 0.21m }, // Netherlands
            { "BE", 0.21m }, // Belgium
            { "CH", 0.081m } // Switzerland (special non-EU treaty rate)
        };

        private const decimal DutyFreeExportThresholdUsd = 10000.0m;

        public decimal GetStandardVatRate(string countryIsoCode)
        {
            if (StandardVatRates.TryGetValue(countryIsoCode, out var rate))
            {
                return rate;
            }
            return 0.20m;
        }

        public bool IsDutyFreeEligible(string destinationCountryIso, decimal orderAmountUsd)
        {
            return orderAmountUsd >= DutyFreeExportThresholdUsd &&
                   destinationCountryIso.Equals("CH", StringComparison.OrdinalIgnoreCase);
        }
    }
}
