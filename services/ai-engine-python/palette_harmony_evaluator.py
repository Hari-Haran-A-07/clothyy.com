"""
Haute Couture Seasonal Color Palette Harmony Evaluator.
Computes color harmony index, complementary pairing strength, and seasonal affinity for luxury runway looks.
"""
import math
from typing import Tuple, Dict, Any


def hex_to_rgb(hex_code: str) -> Tuple[int, int, int]:
    hex_code = hex_code.lstrip("#")
    if len(hex_code) == 3:
        hex_code = "".join([c * 2 for c in hex_code])
    return (int(hex_code[0:2], 16), int(hex_code[2:4], 16), int(hex_code[4:6], 16))


class PaletteHarmonyEvaluator:
    SEASONAL_ANCHORS = {
        "SPRING_SUMMER": [(255, 240, 245), (173, 216, 230), (255, 228, 196), (220, 20, 60)],
        "AUTUMN_WINTER": [(47, 79, 79), (139, 69, 19), (24, 24, 24), (128, 0, 0)]
    }

    def compute_euclidean_distance(self, c1: Tuple[int, int, int], c2: Tuple[int, int, int]) -> float:
        return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

    def evaluate_garment_contrast(self, primary_hex: str, accent_hex: str) -> Dict[str, Any]:
        c1 = hex_to_rgb(primary_hex)
        c2 = hex_to_rgb(accent_hex)
        dist = self.compute_euclidean_distance(c1, c2)
        # Max distance in RGB space is sqrt(255^2 * 3) ~= 441.67
        normalized_contrast = round(dist / 441.67, 3)

        is_high_contrast = normalized_contrast > 0.55
        is_subtle_analog = normalized_contrast < 0.25

        return {
            "primary": primary_hex,
            "accent": accent_hex,
            "contrast_ratio": normalized_contrast,
            "harmony_style": "High-Contrast Statement" if is_high_contrast else ("Tonal Monochromatic" if is_subtle_analog else "Balanced Nuance")
        }

    def evaluate_season_fit(self, garment_hex: str, season: str) -> float:
        color = hex_to_rgb(garment_hex)
        anchors = self.SEASONAL_ANCHORS.get(season, self.SEASONAL_ANCHORS["SPRING_SUMMER"])
        min_dist = min(self.compute_euclidean_distance(color, anchor) for anchor in anchors)
        fit_score = max(0.0, 1.0 - (min_dist / 441.67))
        return round(fit_score, 2)
