package com.clothyyy.concierge

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*
import java.time.LocalDateTime

class AppointmentSchedulerTest {

    @Test
    fun testBookAppointmentSuccess() {
        val scheduler = AppointmentScheduler()
        val now = LocalDateTime.now()
        val appt = SalonAppointment(
            appointmentId = "apt-01",
            clientId = "cli-vip-42",
            stylistId = "sty-pierre",
            startTime = now,
            endTime = now.plusHours(1),
            salonLocation = "Paris Vendôme Salon"
        )

        val result = scheduler.bookAppointment(appt)
        assertTrue(result.isSuccess)
        assertEquals("Paris Vendôme Salon", result.getOrNull()?.salonLocation)
    }

    @Test
    fun testBookAppointmentCollisionFails() {
        val scheduler = AppointmentScheduler()
        val now = LocalDateTime.now()
        val appt1 = SalonAppointment("apt-01", "cli-1", "sty-coco", now, now.plusHours(2), "Milan Suite")
        val appt2 = SalonAppointment("apt-02", "cli-2", "sty-coco", now.plusHours(1), now.plusHours(3), "Milan Suite")

        scheduler.bookAppointment(appt1)
        val result = scheduler.bookAppointment(appt2)
        assertTrue(result.isFailure)
    }
}
