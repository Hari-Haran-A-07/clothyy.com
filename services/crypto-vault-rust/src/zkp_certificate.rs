use sha2::{Digest, Sha256};

/// Represents a cryptographic provenance certificate issued by an atelier
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GarmentProvenanceCertificate {
    pub certificate_id: String,
    pub atelier_did: String,
    pub garment_serial: String,
    pub material_hash: String,
    pub timestamp_epoch: u64,
}

impl GarmentProvenanceCertificate {
    pub fn new(
        certificate_id: impl Into<String>,
        atelier_did: impl Into<String>,
        garment_serial: impl Into<String>,
        material_hash: impl Into<String>,
        timestamp_epoch: u64,
    ) -> Self {
        Self {
            certificate_id: certificate_id.into(),
            atelier_did: atelier_did.into(),
            garment_serial: garment_serial.into(),
            material_hash: material_hash.into(),
            timestamp_epoch,
        }
    }

    /// Computes the commitment hash for Zero-Knowledge Proof evaluation
    pub fn compute_commitment(&self, secret_salt: &str) -> String {
        let mut hasher = Sha256::new();
        hasher.update(self.certificate_id.as_bytes());
        hasher.update(self.atelier_did.as_bytes());
        hasher.update(self.garment_serial.as_bytes());
        hasher.update(self.material_hash.as_bytes());
        hasher.update(secret_salt.as_bytes());
        hasher.update(self.timestamp_epoch.to_le_bytes());
        hex::encode(hasher.finalize())
    }

    /// Validates whether a provided zero-knowledge commitment proof matches the authentic record
    pub fn verify_zkp_commitment(&self, expected_commitment: &str, secret_salt: &str) -> bool {
        let computed = self.compute_commitment(secret_salt);
        computed.eq_ignore_ascii_case(expected_commitment)
    }
}
