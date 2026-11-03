#[path = "../src/hmac_verifier.rs"]
mod hmac_verifier;

use hmac_verifier::{HmacVerifier, VerificationError};

#[test]
fn test_hmac_signature_generation_and_valid_verification() {
    let secret = b"super-secret-clothyyy-webhook-key";
    let verifier = HmacVerifier::new(secret, 300);
    let payload = b"{"order_id":"ord_9901","status":"paid"}";
    let timestamp = 1730000000;

    let signature = verifier.compute_signature(payload, timestamp).unwrap();
    assert!(!signature.is_empty());

    let is_valid = verifier.verify(payload, timestamp, timestamp + 10, &signature);
    assert_eq!(is_valid, Ok(true));
}

#[test]
fn test_hmac_tampered_payload_fails() {
    let secret = b"super-secret-clothyyy-webhook-key";
    let verifier = HmacVerifier::new(secret, 300);
    let payload = b"{"order_id":"ord_9901","status":"paid"}";
    let tampered_payload = b"{"order_id":"ord_9901","status":"refunded"}";
    let timestamp = 1730000000;

    let signature = verifier.compute_signature(payload, timestamp).unwrap();
    let result = verifier.verify(tampered_payload, timestamp, timestamp + 5, &signature);
    assert_eq!(result, Err(VerificationError::SignatureMismatch));
}

#[test]
fn test_hmac_expired_timestamp_fails() {
    let secret = b"super-secret-clothyyy-webhook-key";
    let verifier = HmacVerifier::new(secret, 60); // 60s max drift
    let payload = b"{"event":"inventory.restock"}";
    let timestamp = 1730000000;

    let signature = verifier.compute_signature(payload, timestamp).unwrap();
    let result = verifier.verify(payload, timestamp, timestamp + 120, &signature); // 120s later
    assert_eq!(result, Err(VerificationError::ExpiredTimestamp));
}
