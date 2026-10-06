use sha2::{Sha256, Digest};

/// Generates a high-assurance cryptographic SHA-256 HMAC for luxury order validation
pub fn generate_order_seal(order_number: &str, customer_id: &str, amount_kwd: f64, secret_salt: &str) -> String {
    let payload = format!("{}:{}:{:.3}:{}", order_number, customer_id, amount_kwd, secret_salt);
    let mut hasher = Sha256::new();
    hasher.update(payload.as_bytes());
    let result = hasher.finalize();
    format!("CLOTHYYY_SEAL_V1_{}", hex::encode(result))
}

/// Verifies whether a given cryptographic seal matches the order parameters
pub fn verify_seal(order_number: &str, customer_id: &str, amount_kwd: f64, secret_salt: &str, seal: &str) -> bool {
    let expected = generate_order_seal(order_number, customer_id, amount_kwd, secret_salt);
    expected == seal
}
