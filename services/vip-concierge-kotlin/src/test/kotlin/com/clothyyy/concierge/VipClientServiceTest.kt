package com.clothyyy.concierge

import com.clothyyy.concierge.models.VipConsultationRequest
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class VipClientServiceTest {

    private val service = VipClientService()

    @Test
    fun `should allocate Kuwait Flagship master tailor and non-alcoholic gold beverage`() {
        val req = VipConsultationRequest(
            clientName = "Her Royal Highness",
            clientEmail = "vip@palace.kw",
            requestedAtelierCity = "Kuwait City",
            preferredDate = "2026-11-01T18:00:00Z",
            bespokeRequirements = "Custom Silk Velvet Kaftan with Real Gold Filament",
            estimatedBudgetKwd = 15000.0
        )

        val res = service.schedulePrivateSalon(req)

        assertEquals("CONFIRMED_RESERVED", res.status)
        assertTrue(res.allocatedMasterTailor.contains("Al Hamra Flagship"))
        assertTrue(res.champagneService.contains("Gold Date Infusion"))
        assertTrue(res.privateLoungeAccess)
    }

    @Test
    fun `should allocate Paris Directrice de Creation for Paris Atelier salon`() {
        val req = VipConsultationRequest(
            clientName = "Madame Laurent",
            clientEmail = "laurent@paris.fr",
            requestedAtelierCity = "Paris",
            preferredDate = "2026-10-25T14:00:00Z",
            bespokeRequirements = "Double-Faced Cashmere Opera Cape",
            estimatedBudgetKwd = 8500.0
        )

        val res = service.schedulePrivateSalon(req)

        assertTrue(res.allocatedMasterTailor.contains("Rue du Faubourg Saint-Honoré"))
        assertTrue(res.champagneService.contains("Dom Pérignon"))
    }
}
