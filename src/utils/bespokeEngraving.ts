/**
 * Bespoke Monogramming and Luxury Foil Engraving Rules
 */

export interface EngravingConfig {
  text: string;
  foilColor: 'Gold Leaf' | 'Silver Platinum' | 'Rose Gold' | 'Blind Deboss';
  font: 'Couture Serif' | 'Modernist Sans' | 'Bespoke Script';
  maxChars?: number;
}

export interface EngravingValidationResult {
  isValid: boolean;
  sanitizedText: string;
  surchargeCents: number;
  errorMessage?: string;
}

const ALLOWED_CHARS_REGEX = /^[A-Z0-9\.\s\-]+$/;

export function validateEngraving(config: EngravingConfig): EngravingValidationResult {
  const max = config.maxChars || 4;
  const trimmed = config.text.trim().toUpperCase();

  if (!trimmed) {
    return {
      isValid: false,
      sanitizedText: '',
      surchargeCents: 0,
      errorMessage: 'Engraving text cannot be empty',
    };
  }

  if (trimmed.length > max) {
    return {
      isValid: false,
      sanitizedText: trimmed,
      surchargeCents: 0,
      errorMessage: `Engraving exceeds maximum limit of ${max} characters`,
    };
  }

  if (!ALLOWED_CHARS_REGEX.test(trimmed)) {
    return {
      isValid: false,
      sanitizedText: trimmed,
      surchargeCents: 0,
      errorMessage: 'Only alphanumeric characters, dots, and hyphens are permitted',
    };
  }

  const surcharge = config.foilColor === 'Blind Deboss' ? 3500 : 5000;

  return {
    isValid: true,
    sanitizedText: trimmed,
    surchargeCents: surcharge,
  };
}
