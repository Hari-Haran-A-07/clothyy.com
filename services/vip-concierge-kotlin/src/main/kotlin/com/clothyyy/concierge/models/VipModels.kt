package com.clothyyy.concierge.models

data class VipConsultationRequest(
    val clientName: String,
    val clientEmail: String,
    val requestedAtelierCity: String, // Kuwait City, Dubai, Paris, Tokyo
    val preferredDate: String,
    val bespokeRequirements: String,
    val estimatedBudgetKwd: Double
)

data class VipConsultationResponse(
    val appointmentId: String,
    val status: String,
    val allocatedMasterTailor: String,
    val salonLocation: String,
    val privateLoungeAccess: Boolean,
    val champagneService: String,
    val confirmationToken: String,
    val scheduledUtc: String
)
