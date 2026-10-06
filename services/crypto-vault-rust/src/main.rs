use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use chrono::Utc;
use serde::{Deserialize, Serialize};

mod hasher;

#[derive(Serialize)]
struct HealthResponse {
    service: String,
    status: String,
    language: String,
    crypto_engine: String,
    timestamp: String,
}

#[derive(Deserialize)]
struct SealRequest {
    order_number: String,
    customer_id: String,
    amount_kwd: f64,
}

#[derive(Serialize)]
struct SealResponse {
    order_number: String,
    cryptographic_seal: String,
    algorithm: String,
    timestamp: String,
    is_valid: bool,
}

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse {
        service: "CLOTHYYY Cryptographic Vault & Order Integrity Engine".to_string(),
        status: "HEALTHY_ONLINE".to_string(),
        language: "Rust 1.77 (Actix-Web)".to_string(),
        crypto_engine: "Zero-Allocation SHA-256 Engine".to_string(),
        timestamp: Utc::now().to_rfc3339(),
    })
}

#[post("/api/v1/vault/seal")]
async fn seal_order(req: web::Json<SealRequest>) -> impl Responder {
    let secret_salt = "CLOTHYYY_SECRET_KEY_2026";
    let seal = hasher::generate_order_seal(&req.order_number, &req.customer_id, req.amount_kwd, secret_salt);
    
    HttpResponse::Ok().json(SealResponse {
        order_number: req.order_number.clone(),
        cryptographic_seal: seal,
        algorithm: "SHA256-HMAC-V1".to_string(),
        timestamp: Utc::now().to_rfc3339(),
        is_valid: true,
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("[CLOTHYYY Rust Crypto Vault] Starting server on port 8083...");
    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .service(health)
            .service(seal_order)
    })
    .bind(("0.0.0.0", 8083))?
    .run()
    .await
}
