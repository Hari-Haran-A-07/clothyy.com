package com.clothyyy.concierge

import com.clothyyy.concierge.models.VipConsultationRequest
import com.clothyyy.concierge.models.VipConsultationResponse
import java.time.Instant
import java.util.UUID

class VipClientService {
    fun schedulePrivateSalon(req: VipConsultationRequest): VipConsultationResponse {
        val masterTailors = mapOf(
            "Kuwait City" to "Maison Clothyyy Chief Couturier (Al Hamra Flagship)",
            "Dubai" to "Haute Horlogerie & Bespoke Master (DIFC Salon)",
            "Paris" to "Directrice de Création (Rue du Faubourg Saint-Honoré)",
            "Tokyo" to "Artisanal Kimono-Silk Specialist (Ginza Tower)"
        )

        val tailor = masterTailors[req.requestedAtelierCity] ?: "CLOTHYYY Global Head of Bespoke"
        val appointmentId = "VIP-SALON-${UUID.randomUUID().toString().take(8).uppercase()}"

        return VipConsultationResponse(
            appointmentId = appointmentId,
            status = "CONFIRMED_RESERVED",
            allocatedMasterTailor = tailor,
            salonLocation = "CLOTHYYY Private VIP Penthouse Suite - ${req.requestedAtelierCity}",
            privateLoungeAccess = true,
            champagneService = if (req.requestedAtelierCity in listOf("Kuwait City", "Dubai")) "Non-Alcoholic Sparkling Gold Date Infusion" else "Vintage Dom Pérignon Blanc",
            confirmationToken = "KT-SIGN-${UUID.randomUUID().toString().take(12)}",
            scheduledUtc = req.preferredDate.ifEmpty { Instant.now().toString() }
        )
    }
}
