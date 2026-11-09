package com.clothyyy.concierge

data class ClientStyleProfile(
    val clientId: String,
    val preferredSilhouettes: Set<String>,
    val preferredColors: Set<String>,
    val targetSeason: String,
    val formalWearRatio: Double
)

data class StylistSpecialization(
    val stylistId: String,
    val expertSilhouettes: Set<String>,
    val primaryColorPalette: Set<String>,
    val coutureSeasons: Set<String>
)

class WardrobeAffinityMatcher {

    fun calculateAffinityScore(profile: ClientStyleProfile, stylist: StylistSpecialization): Double {
        val silhouetteOverlap = profile.preferredSilhouettes.intersect(stylist.expertSilhouettes).size
        val colorOverlap = profile.preferredColors.intersect(stylist.primaryColorPalette).size

        val silhouetteWeight = 0.5
        val colorWeight = 0.3
        val seasonWeight = 0.2

        val silhouetteScore = if (profile.preferredSilhouettes.isNotEmpty()) {
            silhouetteOverlap.toDouble() / profile.preferredSilhouettes.size
        } else {
            0.5
        }

        val colorScore = if (profile.preferredColors.isNotEmpty()) {
            colorOverlap.toDouble() / profile.preferredColors.size
        } else {
            0.5
        }

        val seasonScore = if (stylist.coutureSeasons.contains(profile.targetSeason)) 1.0 else 0.0

        val totalScore = (silhouetteScore * silhouetteWeight) + (colorScore * colorWeight) + (seasonScore * seasonWeight)
        return Math.round(totalScore * 100.0) / 100.0
    }

    fun findTopStylist(profile: ClientStyleProfile, stylists: List<StylistSpecialization>): StylistSpecialization? {
        return stylists.maxByOrNull { calculateAffinityScore(profile, it) }
    }
}
