use crypto_vault::zkp_certificate::GarmentProvenanceCertificate;

#[test]
fn test_zkp_commitment_generation_and_validation() {
    let cert = GarmentProvenanceCertificate::new(
        "CERT-2026-PARIS-0084",
        "did:atelier:chanel-cambon-31",
        "SN-HAUTE-99201",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        1794218400,
    );

    let secret_salt = "AtelierMasterSecretKeySalt_2026";
    let commitment = cert.compute_commitment(secret_salt);

    assert!(!commitment.is_empty());
    assert_eq!(commitment.len(), 64); // SHA-256 hex string

    // Should verify successfully with identical salt
    let is_valid = cert.verify_zkp_commitment(&commitment, secret_salt);
    assert!(is_valid);

    // Should fail verification with corrupted salt or tampered commitment
    let is_invalid_salt = cert.verify_zkp_commitment(&commitment, "WrongSecretSalt");
    assert!(!is_invalid_salt);

    let tampered_commitment = format!("{}ff", &commitment[..62]);
    let is_invalid_hash = cert.verify_zkp_commitment(&tampered_commitment, secret_salt);
    assert!(!is_invalid_hash);
}
