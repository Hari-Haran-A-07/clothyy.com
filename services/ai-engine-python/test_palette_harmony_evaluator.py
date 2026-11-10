import unittest
from palette_harmony_evaluator import PaletteHarmonyEvaluator, hex_to_rgb


class TestPaletteHarmonyEvaluator(unittest.TestCase):
    def setUp(self):
        self.evaluator = PaletteHarmonyEvaluator()

    def test_hex_to_rgb_conversion(self):
        self.assertEqual(hex_to_rgb("#FFFFFF"), (255, 255, 255))
        self.assertEqual(hex_to_rgb("#000000"), (0, 0, 0))
        self.assertEqual(hex_to_rgb("FF0000"), (255, 0, 0))

    def test_contrast_evaluation_high_contrast(self):
        # Pure White and Pure Black
        result = self.evaluator.evaluate_garment_contrast("#FFFFFF", "#000000")
        self.assertEqual(result["harmony_style"], "High-Contrast Statement")
        self.assertGreater(result["contrast_ratio"], 0.9)

    def test_contrast_evaluation_subtle_analog(self):
        # Slightly different deep charcoal tones
        result = self.evaluator.evaluate_garment_contrast("#111111", "#1A1A1A")
        self.assertEqual(result["harmony_style"], "Tonal Monochromatic")
        self.assertLess(result["contrast_ratio"], 0.1)

    def test_seasonal_fit_score(self):
        # Deep burgundy should fit Autumn/Winter well
        score_aw = self.evaluator.evaluate_season_fit("#800000", "AUTUMN_WINTER")
        self.assertGreaterEqual(score_aw, 0.95)


if __name__ == "__main__":
    unittest.main()
