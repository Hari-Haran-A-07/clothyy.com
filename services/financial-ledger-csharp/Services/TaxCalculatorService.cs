using Clothyyy.FinancialLedger.Models;

namespace Clothyyy.FinancialLedger.Services
{
    public interface ITaxCalculatorService
    {
        InvoiceResponse CalculateAndJournal(InvoiceRequest request);
    }

    public class TaxCalculatorService : ITaxCalculatorService
    {
        public InvoiceResponse CalculateAndJournal(InvoiceRequest request)
        {
            decimal taxRate = 0.00m;
            string taxAuthority = "Kuwait General Administration of Customs (0% VAT - Luxury Zero-Rated)";

            switch (request.DestinationCountry.Trim().ToLower())
            {
                case "saudi arabia":
                case "ksa":
                    taxRate = 15.00m;
                    taxAuthority = "Zakat, Tax and Customs Authority (ZATCA) - 15% Standard VAT";
                    break;
                case "uae":
                case "united arab emirates":
                    taxRate = 5.00m;
                    taxAuthority = "Federal Tax Authority (FTA) - 5% Standard VAT";
                    break;
                case "qatar":
                    taxRate = 0.00m;
                    taxAuthority = "General Tax Authority (GTA) - 0% VAT";
                    break;
                case "united kingdom":
                case "uk":
                    taxRate = 20.00m;
                    taxAuthority = "HMRC UK Global VAT - 20%";
                    break;
                case "france":
                case "european union":
                    taxRate = 20.00m;
                    taxAuthority = "EU Haute Couture Import Harmonized VAT - 20%";
                    break;
                default:
                    taxRate = 0.00m;
                    taxAuthority = "State of Kuwait MoF - Zero-Rated Luxury Trade";
                    break;
            }

            decimal taxAmount = Math.Round(request.SubtotalKWD * (taxRate / 100.00m), 3);
            decimal totalAmount = request.SubtotalKWD + taxAmount;

            return new InvoiceResponse
            {
                InvoiceId = $"INV-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}",
                OrderNumber = request.OrderNumber,
                SubtotalKWD = request.SubtotalKWD,
                TaxRatePercent = taxRate,
                TaxAmountKWD = taxAmount,
                TotalAmountKWD = totalAmount,
                TaxAuthority = taxAuthority,
                FinancialLedgerEntryId = $"LEDGER_ENTRY_{Guid.NewGuid():N}",
                GeneratedAtUtc = DateTime.UtcNow
            };
        }
    }
}
