use crypto_vault::merkle_proof::{compute_merkle_root, verify_merkle_proof, MerkleNode};

#[test]
fn test_single_leaf_merkle_root() {
    let leaves = vec!["HAUTE_COUTURE_GARMENT_001".to_string()];
    let root = compute_merkle_root(&leaves);
    assert!(root.is_some());
    let expected_leaf = MerkleNode::from_leaf(leaves[0].as_bytes());
    assert_eq!(root.unwrap(), expected_leaf.hash);
}

#[test]
fn test_multi_leaf_merkle_root_deterministic() {
    let leaves = vec![
        "SERIAL_PARIS_001".to_string(),
        "SERIAL_MILAN_002".to_string(),
        "SERIAL_LONDON_003".to_string(),
        "SERIAL_KYOTO_004".to_string(),
    ];
    let root1 = compute_merkle_root(&leaves);
    let root2 = compute_merkle_root(&leaves);
    assert!(root1.is_some());
    assert_eq!(root1, root2);
}

#[test]
fn test_verify_merkle_proof_pair() {
    let leaf_a = "ATELIER_PIECE_A";
    let leaf_b = "ATELIER_PIECE_B";

    let node_a = MerkleNode::from_leaf(leaf_a.as_bytes());
    let node_b = MerkleNode::from_leaf(leaf_b.as_bytes());
    let root_node = MerkleNode::combine(&node_a, &node_b);

    let is_valid = verify_merkle_proof(leaf_a, &[node_b.hash.clone()], &root_node.hash);
    assert!(is_valid);

    let is_tampered = verify_merkle_proof("COUNTERFEIT_PIECE_X", &[node_b.hash], &root_node.hash);
    assert!(!is_tampered);
}
