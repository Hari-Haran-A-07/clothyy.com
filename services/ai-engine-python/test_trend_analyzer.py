import unittest
from trend_analyzer import RunwayTrendAnalyzer


class TestRunwayTrendAnalyzer(unittest.TestCase):
    def setUp(self):
        self.analyzer = RunwayTrendAnalyzer()

    def test_compute_trend_score_bounds(self):
        score_max = self.analyzer.compute_trend_score(1.0, 1_000_000, 5000)
        self.assertAlmostEqual(score_max, 100.0, places=1)

        score_zero = self.analyzer.compute_trend_score(0.0, 0, 0)
        self.assertEqual(score_zero, 0.0)

    def test_forecast_seasonal_affinity_ranking(self):
        pieces = [
            {"sku": "COUT-01", "fabric_score": 0.9, "impressions": 800000, "mentions": 3000},
            {"sku": "COUT-02", "fabric_score": 0.3, "impressions": 20000, "mentions": 10},
        ]
        ranked = self.analyzer.forecast_seasonal_affinity("FW26", pieces)
        self.assertEqual(len(ranked), 2)
        self.assertEqual(ranked[0]["sku"], "COUT-01")
        self.assertEqual(ranked[0]["tier"], "Iconic")
        self.assertTrue(ranked[0]["trend_index"] > ranked[1]["trend_index"])


if __name__ == "__main__":
    unittest.main()
