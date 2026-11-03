//! HMAC Verification Service for Secure Webhook Ingress
//! Validates incoming cryptographically signed payloads from payment and inventory partners.

use hmac::{Hmac, Mac};
use sha2::Sha256;
use hex;

type HmacSha256 = Hmac<Sha256>;

#[derive(Debug, PartialEq, Eq)]
pub enum VerificationError {
    InvalidKey,
    InvalidSignatureHex,
    SignatureMismatch,
    ExpiredTimestamp,
}

pub struct HmacVerifier {
    secret: Vec<u8>,
    max_drift_seconds: u64,
}

impl HmacVerifier {
    pub fn new(secret: &[u8], max_drift_seconds: u64) -> Self {
        Self {
            secret: secret.to_vec(),
            max_drift_seconds,
        }
    }

    pub fn compute_signature(&self, payload: &[u8], timestamp: u64) -> Result<String, VerificationError> {
        let mut mac = HmacSha256::new_from_slice(&self.secret)
            .map_err(|_| VerificationError::InvalidKey)?;
        
        let message = format!("{}:{}", timestamp, String::from_utf8_lossy(payload));
        mac.update(message.as_bytes());
        
        let result = mac.finalize();
        Ok(hex::encode(result.into_bytes()))
    }

    pub fn verify(&self, payload: &[u8], timestamp: u64, current_time: u64, signature_hex: &str) -> Result<bool, VerificationError> {
        if current_time > timestamp && (current_time - timestamp) > self.max_drift_seconds {
            return Err(VerificationError::ExpiredTimestamp);
        }

        let expected_signature = self.compute_signature(payload, timestamp)?;
        
        // Constant-time byte equality check
        if expected_signature.as_bytes() == signature_hex.as_bytes() {
            Ok(true)
        } else {
            Err(VerificationError::SignatureMismatch)
        }
    }
}
