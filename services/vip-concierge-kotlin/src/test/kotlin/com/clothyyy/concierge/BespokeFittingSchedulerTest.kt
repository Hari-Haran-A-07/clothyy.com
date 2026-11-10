package com.clothyyy.concierge

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.Instant

class BespokeFittingSchedulerTest {

    private val scheduler = BespokeFittingScheduler(bufferMinutes = 15L)

    @Test
    fun `detects direct overlap for same tailor`() {
        val baseTime = Instant.parse("2026-11-15T10:00:00Z")
        val existing = listOf(
            BespokeFittingSlot("APT-1", "TAILOR-A", "CLIENT-1", baseTime, baseTime.plusSeconds(3600), 101)
        )

        val overlappingSlot = BespokeFittingSlot(
            "APT-2", "TAILOR-A", "CLIENT-2",
            baseTime.plusSeconds(1800), baseTime.plusSeconds(5400), 102
        )

        assertTrue(scheduler.hasConflict(existing, overlappingSlot))
    }

    @Test
    fun `detects buffer overlap between consecutive appointments`() {
        val baseTime = Instant.parse("2026-11-15T10:00:00Z")
        val existing = listOf(
            BespokeFittingSlot("APT-1", "TAILOR-A", "CLIENT-1", baseTime, baseTime.plusSeconds(3600), 101)
        )

        // Starts only 5 minutes after APT-1 finishes, less than 15-minute buffer
        val adjacentSlot = BespokeFittingSlot(
            "APT-3", "TAILOR-A", "CLIENT-3",
            baseTime.plusSeconds(3900), baseTime.plusSeconds(7500), 102
        )

        assertTrue(scheduler.hasConflict(existing, adjacentSlot))
    }

    @Test
    fun `allows non-overlapping appointments beyond buffer`() {
        val baseTime = Instant.parse("2026-11-15T10:00:00Z")
        val existing = listOf(
            BespokeFittingSlot("APT-1", "TAILOR-A", "CLIENT-1", baseTime, baseTime.plusSeconds(3600), 101)
        )

        // Starts 30 minutes after APT-1 finishes (exceeds 15 min buffer)
        val validSlot = BespokeFittingSlot(
            "APT-4", "TAILOR-A", "CLIENT-4",
            baseTime.plusSeconds(5400), baseTime.plusSeconds(9000), 101
        )

        assertFalse(scheduler.hasConflict(existing, validSlot))
    }
}
