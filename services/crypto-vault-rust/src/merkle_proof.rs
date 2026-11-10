use sha2::{Digest, Sha256};

/// Represents a node in the garment provenance Merkle tree
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MerkleNode {
    pub hash: String,
}

impl MerkleNode {
    pub fn from_leaf(data: &[u8]) -> Self {
        let mut hasher = Sha256::new();
        hasher.update(b"LEAF:");
        hasher.update(data);
        Self {
            hash: hex::encode(hasher.finalize()),
        }
    }

    pub fn combine(left: &MerkleNode, right: &MerkleNode) -> Self {
        let mut hasher = Sha256::new();
        hasher.update(b"NODE:");
        if left.hash <= right.hash {
            hasher.update(left.hash.as_bytes());
            hasher.update(right.hash.as_bytes());
        } else {
            hasher.update(right.hash.as_bytes());
            hasher.update(left.hash.as_bytes());
        }
        Self {
            hash: hex::encode(hasher.finalize()),
        }
    }
}

/// Computes the Merkle Root for a collection of couture garment serial hashes
pub fn compute_merkle_root(leaves: &[String]) -> Option<String> {
    if leaves.is_empty() {
        return None;
    }

    let mut current_layer: Vec<MerkleNode> = leaves
        .iter()
        .map(|leaf| MerkleNode::from_leaf(leaf.as_bytes()))
        .collect();

    while current_layer.len() > 1 {
        let mut next_layer = Vec::new();
        let mut i = 0;
        while i < current_layer.len() {
            if i + 1 < current_layer.len() {
                next_layer.push(MerkleNode::combine(&current_layer[i], &current_layer[i + 1]));
                i += 2;
            } else {
                next_layer.push(current_layer[i].clone());
                i += 1;
            }
        }
        current_layer = next_layer;
    }

    Some(current_layer[0].hash.clone())
}

/// Verifies whether a leaf hash belongs to the root given sibling proof hashes
pub fn verify_merkle_proof(leaf: &str, proof: &[String], expected_root: &str) -> bool {
    let mut current = MerkleNode::from_leaf(leaf.as_bytes());

    for sibling_hash in proof {
        let sibling = MerkleNode {
            hash: sibling_hash.clone(),
        };
        current = MerkleNode::combine(&current, &sibling);
    }

    current.hash == expected_root
}
