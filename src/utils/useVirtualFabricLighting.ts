/**
 * Virtual Runway 3D Fabric Sheen and Dynamic Lighting Calculator
 * Computes specular highlights, roughness, and Fresnel reflections for high-end textiles.
 */

export interface FabricMaterialProfile {
  specularExponent: number; // 1 to 128
  baseReflectance: number;  // 0.0 to 1.0 (F0)
  roughness: number;        // 0.0 (mirror) to 1.0 (matte wool)
}

export const LUXURY_FABRIC_PROFILES: Record<string, FabricMaterialProfile> = {
  silk_satin: { specularExponent: 90, baseReflectance: 0.25, roughness: 0.15 },
  cashmere: { specularExponent: 12, baseReflectance: 0.04, roughness: 0.85 },
  organza: { specularExponent: 60, baseReflectance: 0.18, roughness: 0.30 },
  lambskin: { specularExponent: 45, baseReflectance: 0.10, roughness: 0.40 },
};

export function calculateFabricLighting(
  fabricType: keyof typeof LUXURY_FABRIC_PROFILES,
  lightIntensity: number,
  viewAngleDegrees: number
): { specularHighlight: number; fresnelFactor: number; diffuseOutput: number } {
  const profile = LUXURY_FABRIC_PROFILES[fabricType] || LUXURY_FABRIC_PROFILES.silk_satin;

  const radians = (viewAngleDegrees * Math.PI) / 180;
  const cosTheta = Math.max(0, Math.cos(radians));

  // Schlick's approximation for Fresnel reflectance
  const fresnelFactor =
    profile.baseReflectance +
    (1 - profile.baseReflectance) * Math.pow(1 - cosTheta, 5);

  const specularHighlight =
    Math.pow(cosTheta, profile.specularExponent / 10) *
    (1 - profile.roughness) *
    lightIntensity;

  const diffuseOutput = cosTheta * (1 - profile.baseReflectance) * lightIntensity;

  return {
    specularHighlight: Number(specularHighlight.toFixed(4)),
    fresnelFactor: Number(fresnelFactor.toFixed(4)),
    diffuseOutput: Number(diffuseOutput.toFixed(4)),
  };
}
