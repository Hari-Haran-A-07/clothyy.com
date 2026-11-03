import { convertSize, getFitRecommendation } from './sizingEngine';

describe('Luxury Sizing Engine', () => {
  it('converts French size 36 to Italian and US standards', () => {
    expect(convertSize('36', 'FR', 'IT')).toBe('40');
    expect(convertSize('36', 'FR', 'US')).toBe('4');
    expect(convertSize('36', 'FR', 'UK')).toBe('8');
  });

  it('returns null for unknown size input', () => {
    expect(convertSize('99', 'FR', 'US')).toBeNull();
  });

  it('recommends correct atelier size by measurements', () => {
    expect(getFitRecommendation(80, 60)).toBe('FR 34 (XS)');
    expect(getFitRecommendation(85, 65)).toBe('FR 36 (S)');
    expect(getFitRecommendation(105, 85)).toBe('Bespoke Atelier Tailoring Recommended');
  });
});
