"""
CLOTHYYY.COM — Python Computer Vision & Visual Embedding Search
Extracts visual feature vectors and matches runway mood boards to catalog items.
"""
import math
from typing import List, Dict, Any

class VisionSearchEngine:
    def __init__(self):
        # High-dimensional mock feature vectors for catalog items
        self.catalog_index = [
            {
                "id": "c1",
                "name": "Silk-Cashmere Overcoat",
                "vector": [0.88, 0.42, 0.15, 0.93, 0.21],
                "color_family": "Midnight Navy",
                "category": "Outerwear"
            },
            {
                "id": "c2",
                "name": "Structured Crepe Blazer",
                "vector": [0.35, 0.89, 0.65, 0.20, 0.77],
                "color_family": "Desert Dune",
                "category": "Tailoring"
            },
            {
                "id": "c3",
                "name": "Pleated Silk Midi Dress",
                "vector": [0.92, 0.12, 0.85, 0.45, 0.60],
                "color_family": "Emerald Green",
                "category": "Dresses"
            },
            {
                "id": "c4",
                "name": "Minimalist Calfskin Tote",
                "vector": [0.22, 0.31, 0.10, 0.95, 0.88],
                "color_family": "Onyx Black",
                "category": "Bags"
            }
        ]

    def cosine_similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot_product / (norm_a * norm_b)

    def search_by_image_features(self, query_features: List[float], top_k: int = 3) -> List[Dict[str, Any]]:
        results = []
        for item in self.catalog_index:
            score = self.cosine_similarity(query_features, item["vector"])
            results.append({
                "product_id": item["id"],
                "name": item["name"],
                "category": item["category"],
                "color_family": item["color_family"],
                "visual_match_confidence": round(score * 100, 2)
            })
        
        results.sort(key=lambda x: x["visual_match_confidence"], reverse=True)
        return results[:top_k]
