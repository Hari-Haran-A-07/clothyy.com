"""
CLOTHYYY.COM — Python FastAPI Microservice Entry Point
Author: CLOTHYYY AI & Machine Learning Engineering
Port: 8082
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from stylist_ai import LuxuryStylistEngine
from vision_search import VisionSearchEngine
from dynamic_pricing import DynamicPricingEngine

app = FastAPI(
    title="CLOTHYYY AI & Neural Intelligence API",
    description="Python microservice powering Haute Couture AI Stylist, Computer Vision Search, and Dynamic Valuation",
    version="3.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stylist = LuxuryStylistEngine()
vision = VisionSearchEngine()
pricing = DynamicPricingEngine()

class StylistRequest(BaseModel):
    occasion: str
    climate: Optional[str] = "Temperate / Air-Conditioned"
    base_color: Optional[str] = "Midnight Navy"
    budget_kwd: Optional[float] = 1250.000

class VisionSearchRequest(BaseModel):
    feature_vector: List[float]
    top_k: Optional[int] = 3

class PricingRequest(BaseModel):
    base_price_kwd: float
    remaining_stock: int
    global_views_24h: int
    is_atelier_exclusive: bool = False

@app.get("/health")
def health_check():
    return {
        "service": "CLOTHYYY AI Intelligence Service",
        "status": "HEALTHY_ONLINE",
        "language": "Python 3.12 (FastAPI)",
        "cuda_acceleration": "SIMULATED_TENSOR_RT",
        "timestamp": time.time()
    }

@app.post("/api/v1/stylist/curate")
def curate_outfit(req: StylistRequest):
    return stylist.curate_look(
        occasion=req.occasion,
        climate=req.climate or "Temperate",
        base_color=req.base_color or "Midnight Navy",
        budget_kwd=req.budget_kwd or 1000.0
    )

@app.post("/api/v1/vision/match")
def match_vision(req: VisionSearchRequest):
    if len(req.feature_vector) != 5:
        raise HTTPException(status_code=400, detail="Feature vector must have 5 dimensions")
    return vision.search_by_image_features(req.feature_vector, req.top_k or 3)

@app.post("/api/v1/pricing/evaluate")
def evaluate_pricing(req: PricingRequest):
    return pricing.evaluate_valuation(
        base_price_kwd=req.base_price_kwd,
        remaining_stock=req.remaining_stock,
        global_views_24h=req.global_views_24h,
        is_atelier_exclusive=req.is_atelier_exclusive
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8082)
