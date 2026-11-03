/**
 * International Luxury Apparel Sizing Engine
 * Maps couture sizing across French (FR), Italian (IT), UK, US, and Japanese (JP) standards.
 */

export type SizeStandard = 'FR' | 'IT' | 'UK' | 'US' | 'JP';

export const COUTURE_SIZE_CHART: Record<string, Record<SizeStandard, string>> = {
  XS: { FR: '34', IT: '38', UK: '6', US: '2', JP: '5' },
  S:  { FR: '36', IT: '40', UK: '8', US: '4', JP: '7' },
  M:  { FR: '38', IT: '42', UK: '10', US: '6', JP: '9' },
  L:  { FR: '40', IT: '44', UK: '12', US: '8', JP: '11' },
  XL: { FR: '42', IT: '46', UK: '14', US: '10', JP: '13' },
};

export function convertSize(
  inputSize: string,
  fromStandard: SizeStandard,
  toStandard: SizeStandard
): string | null {
  for (const [, mappings] of Object.entries(COUTURE_SIZE_CHART)) {
    if (mappings[fromStandard] === inputSize) {
      return mappings[toStandard];
    }
  }
  return null;
}

export function getFitRecommendation(bustCm: number, waistCm: number): string {
  if (bustCm <= 82 && waistCm <= 63) return 'FR 34 (XS)';
  if (bustCm <= 86 && waistCm <= 67) return 'FR 36 (S)';
  if (bustCm <= 90 && waistCm <= 71) return 'FR 38 (M)';
  if (bustCm <= 94 && waistCm <= 75) return 'FR 40 (L)';
  return 'Bespoke Atelier Tailoring Recommended';
}
