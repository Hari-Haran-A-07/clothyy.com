package com.clothyyy.concierge

import java.time.Instant

data class BespokeFittingSlot(
    val appointmentId: String,
    val tailorId: String,
    val vipClientId: String,
    val startTime: Instant,
    val endTime: Instant,
    val salonSuiteNumber: Int
)

class BespokeFittingScheduler(
    private val bufferMinutes: Long = 15L
) {
    fun hasConflict(existingAppointments: List<BespokeFittingSlot>, newSlot: BespokeFittingSlot): Boolean {
        val bufferMillis = bufferMinutes * 60 * 1000

        for (existing in existingAppointments) {
            val sameTailor = existing.tailorId == newSlot.tailorId
            val sameSuite = existing.salonSuiteNumber == newSlot.salonSuiteNumber

            if (sameTailor || sameSuite) {
                val existingStartWithBuffer = existing.startTime.toEpochMilli() - bufferMillis
                val existingEndWithBuffer = existing.endTime.toEpochMilli() + bufferMillis

                val newStart = newSlot.startTime.toEpochMilli()
                val newEnd = newSlot.endTime.toEpochMilli()

                if (newStart < existingEndWithBuffer && newEnd > existingStartWithBuffer) {
                    return true
                }
            }
        }
        return false
    }

    fun findAvailableSuites(
        allSuites: List<Int>,
        existingAppointments: List<BespokeFittingSlot>,
        startTime: Instant,
        endTime: Instant
    ): List<Int> {
        val busySuites = existingAppointments.filter { slot ->
            startTime.toEpochMilli() < slot.endTime.toEpochMilli() &&
            endTime.toEpochMilli() > slot.startTime.toEpochMilli()
        }.map { it.salonSuiteNumber }.toSet()

        return allSuites.filter { !busySuites.contains(it) }
    }
}
