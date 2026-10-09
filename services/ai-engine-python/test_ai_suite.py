"""
PyTest Suite for CLOTHYYY Neural AI Stylist, Vision Search, and Dynamic Pricing
"""
import pytest
from stylist_ai import LuxuryStylistEngine
from vision_search import VisionSearchEngine
from dynamic_pricing import DynamicPricingEngine

def test_stylist_gala_curation():
    engine = LuxuryStylistEngine()
    result = engine.curate_look(
        occasion="Gala",
        climate="Temperate",
        base_color="Midnight Navy",
        budget_kwd=2500.0
    )
    assert result["occasion"] == "Gala"
    assert "Evening Gown" in result["hero_garment"]
    assert result["stylist_confidence_score"] > 0.95
    assert len(result["harmonious_palette"]) >= 3

def test_stylist_business_curation():
    engine = LuxuryStylistEngine()
    result = engine.curate_look(
        occasion="Business",
        climate="Air-Conditioned",
        base_color="Onyx Black",
        budget_kwd=1800.0
    )
    assert "Blazer" in result["hero_garment"]
    assert result["curated_silhouette"] != ""

def test_vision_cosine_similarity():
    engine = VisionSearchEngine()
    query_vector = [0.85, 0.40, 0.18, 0.90, 0.25] # Similar to Silk-Cashmere Overcoat
    matches = engine.search_by_image_features(query_vector, top_k=2)
    assert len(matches) == 2
    assert matches[0]["product_id"] == "c1"
    assert matches[0]["visual_match_confidence"] > 90.0

def test_dynamic_pricing_scarcity():
    engine = DynamicPricingEngine()
    # High demand low stock test
    res = engine.evaluate_valuation(
        base_price_kwd=1000.0,
        remaining_stock=2,
        global_views_24h=800,
        is_atelier_exclusive=True
    )
    assert res["scarcity_index"] > 1.10
    assert res["recommended_valuation_kwd"] > 1100.0
    assert res["artisan_premium_delta_kwd"] > 0.0
