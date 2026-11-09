import { describe, it, expect } from 'vitest';
import { calculateFabricLighting, LUXURY_FABRIC_PROFILES } from './useVirtualFabricLighting';

describe('calculateFabricLighting', () => {
  it('silk satin generates strong specular highlights at normal angle', () => {
    const result = calculateFabricLighting('silk_satin', 1.0, 0);

    expect(result.specularHighlight).toBeGreaterThan(0.7);
    expect(result.fresnelFactor).toBe(LUUXURY_FRESNEL_NORMAL('silk_satin'));
    expect(result.diffuseOutput).toBeGreaterThan(0.7);
  });

  it('cashmere exhibits high diffusion and low specular reflection', () => {
    const result = calculateFabricLighting('cashmere', 1.0, 0);

    expect(result.specularHighlight).toBeLessThan(0.2);
    expect(result.fresnelFactor).toBeLessThan(0.1);
  });

  it('grazing view angles elevate Fresnel edge reflectance', () => {
    const normalView = calculateFabricLighting('lambskin', 1.0, 0);
    const grazingView = calculateFabricLighting('lambskin', 1.0, 80);

    expect(grazingView.fresnelFactor).toBeGreaterThan(normalView.fresnelFactor);
  });
});

function LUUXURY_FRESNEL_NORMAL(fabric: keyof typeof LUXURY_FABRIC_PROFILES): number {
  return LUXURY_FABRIC_PROFILES[fabric].baseReflectance;
}
