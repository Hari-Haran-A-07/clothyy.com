"""
Runway Trend Velocity and Seasonal Archive Popularity Analyzer
Extracts high-dimensional aesthetic signals to forecast haute couture demand.
"""
from typing import Dict, List, Any


class RunwayTrendAnalyzer:
    WEIGHT_FABRIC_RARITY = 0.35
    WEIGHT_RUNWAY_EXPOSURE = 0.40
    WEIGHT_CELEBRITY_AFFINITY = 0.25

    def __init__(self, baseline_velocity: float = 1.0):
        self.baseline_velocity = baseline_velocity

    def compute_trend_score(
        self,
        fabric_rarity_score: float,
        runway_impressions: int,
        celebrity_mentions: int
    ) -> float:
        """
        Calculates normalized trend score between 0.0 and 100.0.
        """
        norm_runway = min(1.0, runway_impressions / 1_000_000.0)
        norm_mentions = min(1.0, celebrity_mentions / 5_000.0)
        norm_rarity = max(0.0, min(1.0, fabric_rarity_score))

        raw_score = (
            (norm_rarity * self.WEIGHT_FABRIC_RARITY) +
            (norm_runway * self.WEIGHT_RUNWAY_EXPOSURE) +
            (norm_mentions * self.WEIGHT_CELEBRITY_AFFINITY)
        ) * 100.0

        return round(raw_score, 2)

    def forecast_seasonal_affinity(self, season: str, pieces: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Ranks pieces by forecasted trend affinity for target fashion season.
        """
        results = []
        for piece in pieces:
            score = self.compute_trend_score(
                fabric_rarity_score=piece.get("fabric_score", 0.5),
                runway_impressions=piece.get("impressions", 50000),
                celebrity_mentions=piece.get("mentions", 100)
            )
            results.append({
                "sku": piece.get("sku"),
                "season": season,
                "trend_index": score,
                "tier": "Iconic" if score > 75 else ("High Demand" if score > 50 else "Classic")
            })

        return sorted(results, key=lambda x: x["trend_index"], reverse=True)
