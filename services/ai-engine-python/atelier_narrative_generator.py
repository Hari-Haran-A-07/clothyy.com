"""
Dynamic Atelier Garment Editorial Storytelling and Narrative Generator.
Composes bespoke luxury editorial descriptions and provenance narratives for haute couture pieces.
"""
from typing import Dict, List, Any


class AtelierNarrativeGenerator:
    ATELIER_HERITAGE_OPENERS = {
        "Paris": "Handcrafted in our historic Rue Cambon atelier,",
        "Milan": "Tailored in the quiet mastery of our Milanese workshop,",
        "London": "Sculpted with Savile Row heritage and precision,",
        "Kyoto": "Loomed by master weavers blending traditional Nishijin silk techniques,"
    }

    def generate_editorial_narrative(
        self,
        piece_name: str,
        atelier_city: str,
        silhouette: str,
        key_materials: List[str],
        hours_to_craft: int,
        limited_edition_count: int
    ) -> Dict[str, Any]:
        opener = self.ATELIER_HERITAGE_OPENERS.get(
            atelier_city,
            f"Crafted with timeless devotion in our {atelier_city} atelier,"
        )
        materials_str = ", ".join(key_materials[:-1]) + f", and {key_materials[-1]}" if len(key_materials) > 1 else key_materials[0]

        short_summary = f"{piece_name} in {silhouette.lower()}, embodying {hours_to_craft} hours of dedicated artisan craftsmanship."
        full_story = (
            f"{opener} the {piece_name} is rendered in {materials_str}. "
            f"Taking {hours_to_craft} hours of meticulous hand-stitching and bespoke draping, "
            f"this piece is restricted to an exclusive archive edition of only {limited_edition_count} worldwide."
        )

        return {
            "piece_name": piece_name,
            "short_summary": short_summary,
            "editorial_narrative": full_story,
            "provenance_badge": f"Archive Edition 1 of {limited_edition_count}",
            "artisan_hours": hours_to_craft
        }
