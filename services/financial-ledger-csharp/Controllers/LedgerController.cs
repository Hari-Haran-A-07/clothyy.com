using Clothyyy.FinancialLedger.Models;
using Clothyyy.FinancialLedger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Clothyyy.FinancialLedger.Controllers
{
    [ApiController]
    [Route("api/v1/ledger")]
    public class LedgerController : ControllerBase
    {
        private readonly ITaxCalculatorService _taxService;

        public LedgerController(ITaxCalculatorService taxService)
        {
            _taxService = taxService;
        }

        [HttpGet("health")]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                service = "CLOTHYYY Financial Ledger & GCC Invoicing Core",
                status = "HEALTHY_ONLINE",
                language = "C# / .NET 9.0 Web API",
                compliance = "ZATCA / FTA / KNET / IFRS-15 Compliant",
                timestamp = DateTime.UtcNow
            });
        }

        [HttpPost("invoice")]
        public IActionResult GenerateInvoice([FromBody] InvoiceRequest request)
        {
            if (request.SubtotalKWD <= 0)
            {
                return BadRequest(new { error = "Subtotal must be greater than zero." });
            }

            var invoice = _taxService.CalculateAndJournal(request);
            return Ok(invoice);
        }
    }
}
