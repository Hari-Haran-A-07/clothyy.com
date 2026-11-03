package com.clothyyy.concierge

import java.time.LocalDateTime
import java.util.concurrent.ConcurrentHashMap

data class SalonAppointment(
    val appointmentId: String,
    val clientId: String,
    val stylistId: String,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime,
    val salonLocation: String,
    val notes: String = ""
)

class AppointmentScheduler {
    private val appointments = ConcurrentHashMap<String, SalonAppointment>()

    fun bookAppointment(appointment: SalonAppointment): Result<SalonAppointment> {
        val hasConflict = appointments.values.any { existing ->
            existing.stylistId == appointment.stylistId &&
            appointment.startTime < existing.endTime &&
            appointment.endTime > existing.startTime
        }

        return if (hasConflict) {
            Result.failure(IllegalStateException("Stylist is already booked for this atelier slot"))
        } else {
            appointments[appointment.appointmentId] = appointment
            Result.success(appointment)
        }
    }

    fun cancelAppointment(appointmentId: String): Boolean {
        return appointments.remove(appointmentId) != null
    }

    fun getStylistAppointments(stylistId: String): List<SalonAppointment> {
        return appointments.values.filter { it.stylistId == stylistId }.sortedBy { it.startTime }
    }
}
