use clothyyy_crypto_vault::hasher::{generate_order_seal, verify_seal};
use clothyyy_crypto_vault::calculate_image_perceptual_hash;

#[test]
fn test_order_sealing_and_verification() {
    let order_num = "ORD-2026-9812";
    let customer_id = "CUST-VIP-7781";
    let amount_kwd = 1450.000;
    let secret_salt = "CLOTHYYY_TEST_SALT";

    let seal = generate_order_seal(order_num, customer_id, amount_kwd, secret_salt);
    assert!(seal.starts_with("CLOTHYYY_SEAL_V1_"));

    // Positive verification
    let is_valid = verify_seal(order_num, customer_id, amount_kwd, secret_salt, &seal);
    assert!(is_valid);

    // Tampered amount verification failure
    let is_tampered = verify_seal(order_num, customer_id, 1449.999, secret_salt, &seal);
    assert!(!is_tampered);
}

#[test]
fn test_image_perceptual_hashing() {
    let phash = calculate_image_perceptual_hash(1920, 1080, 1.78);
    assert!(phash.starts_with("PHASH_"));
}
