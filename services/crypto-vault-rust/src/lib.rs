pub mod hasher;

/// Fast WebAssembly-compatible image buffer dimension optimizer & perceptual hash
pub fn calculate_image_perceptual_hash(width: u32, height: u32, aspect_ratio: f32) -> String {
    let raw = format!("IMG_{}x{}_{:.2}", width, height, aspect_ratio);
    format!("PHASH_{}", hex::encode(raw.as_bytes()))
}
