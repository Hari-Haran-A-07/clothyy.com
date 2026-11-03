import { validateEngraving } from './bespokeEngraving';

describe('Bespoke Engraving Validator', () => {
  it('accepts valid monogram with gold foil', () => {
    const result = validateEngraving({
      text: 'H.A.',
      foilColor: 'Gold Leaf',
      font: 'Couture Serif',
      maxChars: 4,
    });

    expect(result.isValid).toBe(true);
    expect(result.sanitizedText).toBe('H.A.');
    expect(result.surchargeCents).toBe(5000);
  });

  it('rejects characters exceeding max length', () => {
    const result = validateEngraving({
      text: 'ALEXANDER',
      foilColor: 'Silver Platinum',
      font: 'Modernist Sans',
      maxChars: 4,
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('exceeds maximum limit');
  });

  it('rejects special emoji symbols', () => {
    const result = validateEngraving({
      text: 'LV✨',
      foilColor: 'Rose Gold',
      font: 'Bespoke Script',
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Only alphanumeric characters');
  });
});
