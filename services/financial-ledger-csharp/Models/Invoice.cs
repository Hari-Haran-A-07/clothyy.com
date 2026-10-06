namespace Clothyyy.FinancialLedger.Models
{
    public class InvoiceRequest
    {
        public string OrderNumber { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string DestinationCountry { get; set; } = "Kuwait";
        public decimal SubtotalKWD { get; set; }
        public string Currency { get; set; } = "KWD";
    }

    public class InvoiceResponse
    {
        public string InvoiceId { get; set; } = string.Empty;
        public string OrderNumber { get; set; } = string.Empty;
        public decimal SubtotalKWD { get; set; }
        public decimal TaxRatePercent { get; set; }
        public decimal TaxAmountKWD { get; set; }
        public decimal TotalAmountKWD { get; set; }
        public string TaxAuthority { get; set; } = string.Empty;
        public string FinancialLedgerEntryId { get; set; } = string.Empty;
        public DateTime GeneratedAtUtc { get; set; }
    }
}
