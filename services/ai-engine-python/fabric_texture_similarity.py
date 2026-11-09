"""
Visual Fabric Texture and Drape Similarity Embedding Calculator.
Uses multi-dimensional tactile and structural descriptors (GSM weight, weave density, sheen, drape coefficient)
to calculate cosine similarity across haute couture textiles.
"""
import math
from typing import Dict, List, Tuple


class FabricTextureSimilarityCalculator:
    """
    Computes tactile similarity between luxury garments for atelier client recommendations.
    Vector structure: [weight_gsm, thread_count, sheen_index, drape_coefficient, stiffness_rating]
    """

    def __init__(self):
        # Normalization ranges: [min, max]
        self.feature_bounds = [
            (50.0, 800.0),   # GSM weight (e.g., chiffon to heavy wool)
            (80.0, 1200.0),  # Thread count
            (0.0, 1.0),      # Sheen index (matte 0.0 to silk duchess 1.0)
            (0.1, 0.9),      # Drape coefficient
            (1.0, 10.0),     # Stiffness rating
        ]

    def normalize_vector(self, raw_features: List[float]) -> List[float]:
        norm = []
        for val, (low, high) in zip(raw_features, self.feature_bounds):
            clamped = max(low, min(high, val))
            norm.append((clamped - low) / (high - low))
        return norm

    def cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        if len(vec1) != len(vec2) or not vec1:
            return 0.0

        dot = sum(a * b for a, b in zip(vec1, vec2))
        norm_a = math.sqrt(sum(a * a for a in vec1))
        norm_b = math.sqrt(sum(b * b for b in vec2))

        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0

        return round(dot / (norm_a * norm_b), 4)

    def compare_fabrics(self, fabric_a: List[float], fabric_b: List[float]) -> float:
        norm_a = self.normalize_vector(fabric_a)
        norm_b = self.normalize_vector(fabric_b)
        return self.cosine_similarity(norm_a, norm_b)
