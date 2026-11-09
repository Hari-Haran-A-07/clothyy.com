package com.clothyyy.concierge

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class WardrobeAffinityMatcherTest {

    private val matcher = WardrobeAffinityMatcher()

    @Test
    fun testCalculateAffinityScoreHighMatch() {
        val client = ClientStyleProfile(
            clientId = "cli-vip-007",
            preferredSilhouettes = setOf("A-Line", "Tailored Tuxedo", "Bias-Cut Gown"),
            preferredColors = setOf("Noir", "Emerald", "Gold"),
            targetSeason = "Fall/Winter 2026",
            formalWearRatio = 0.8
        )

        val topStylist = StylistSpecialization(
            stylistId = "sty-antoine",
            expertSilhouettes = setOf("Tailored Tuxedo", "Bias-Cut Gown", "Capelet"),
            primaryColorPalette = setOf("Noir", "Gold", "Ivory"),
            coutureSeasons = setOf("Fall/Winter 2026", "Spring/Summer 2027")
        )

        val score = matcher.calculateAffinityScore(client, topStylist)
        assertTrue(score >= 0.70, "Expected affinity score >= 0.70, got $score")
    }

    @Test
    fun testFindTopStylistReturnsBestMatch() {
        val client = ClientStyleProfile(
            clientId = "cli-vip-008",
            preferredSilhouettes = setOf("Minimalist Slip"),
            preferredColors = setOf("Monochrome"),
            targetSeason = "Resort 2027",
            formalWearRatio = 0.2
        )

        val stylistA = StylistSpecialization(
            stylistId = "sty-baroque",
            expertSilhouettes = setOf("Ballgown", "Corset"),
            primaryColorPalette = setOf("Ruby", "Purple"),
            coutureSeasons = setOf("Fall/Winter 2026")
        )

        val stylistB = StylistSpecialization(
            stylistId = "sty-minimalist",
            expertSilhouettes = setOf("Minimalist Slip", "Relaxed Suiting"),
            primaryColorPalette = setOf("Monochrome", "Ecru"),
            coutureSeasons = setOf("Resort 2027")
        )

        val chosen = matcher.findTopStylist(client, listOf(stylistA, stylistB))
        assertNotNull(chosen)
        assertEquals("sty-minimalist", chosen?.stylistId)
    }
}
