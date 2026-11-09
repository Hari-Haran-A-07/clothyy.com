import unittest
from fabric_texture_similarity import FabricTextureSimilarityCalculator


class TestFabricTextureSimilarityCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = FabricTextureSimilarityCalculator()

    def test_identical_fabrics_have_perfect_similarity(self):
        # Heavy silk satin
        silk_satin = [280.0, 600.0, 0.85, 0.45, 3.0]
        score = self.calc.compare_fabrics(silk_satin, silk_satin)
        self.assertAlmostEqual(score, 1.0, places=2)

    def test_contrasting_fabrics_have_distinct_embeddings(self):
        # Heavy tweed coat vs lightweight silk chiffon
        tweed = [650.0, 180.0, 0.05, 0.85, 8.5]
        chiffon = [60.0, 450.0, 0.30, 0.15, 1.2]

        score = self.calc.compare_fabrics(tweed, chiffon)
        self.assertTrue(0.0 <= score < 0.80)

    def test_normalization_bounds_handling(self):
        extreme_outlier = [1200.0, 3000.0, 2.0, 1.5, 20.0]
        norm = self.calc.normalize_vector(extreme_outlier)
        for val in norm:
            self.assertEqual(val, 1.0)


if __name__ == "__main__":
    unittest.main()
