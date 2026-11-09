import unittest
from atelier_narrative_generator import AtelierNarrativeGenerator


class TestAtelierNarrativeGenerator(unittest.TestCase):
    def setUp(self):
        self.generator = AtelierNarrativeGenerator()

    def test_generate_editorial_narrative_paris(self):
        result = self.generator.generate_editorial_narrative(
            piece_name="The Midnight Velvet Cape",
            atelier_city="Paris",
            silhouette="Sculpted Capelet",
            key_materials=["Lyon silk velvet", "24-karat gold wire embroidery"],
            hours_to_craft=140,
            limited_edition_count=5
        )

        self.assertEqual(result["piece_name"], "The Midnight Velvet Cape")
        self.assertIn("Rue Cambon atelier", result["editorial_narrative"])
        self.assertIn("140 hours", result["editorial_narrative"])
        self.assertIn("exclusive archive edition of only 5", result["editorial_narrative"])
        self.assertEqual(result["provenance_badge"], "Archive Edition 1 of 5")
        self.assertEqual(result["artisan_hours"], 140)

    def test_generate_editorial_narrative_custom_city(self):
        result = self.generator.generate_editorial_narrative(
            piece_name="The Florence Wool Coat",
            atelier_city="Florence",
            silhouette="Overcoat",
            key_materials=["Double-faced cashmere"],
            hours_to_craft=85,
            limited_edition_count=12
        )

        self.assertIn("Florence atelier", result["editorial_narrative"])
        self.assertEqual(result["artisan_hours"], 85)


if __name__ == "__main__":
    unittest.main()
