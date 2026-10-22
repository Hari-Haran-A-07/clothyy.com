/**
 * CLOTHYYY.COM — Luxury Currency & SKU Formatting Utilities
 */

export interface CurrencyFormatOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Format currency amounts with proper ISO symbol and localized separators.
 */
export function formatLuxuryPrice(
  amount: number,
  currencyCode: string = 'KWD',
  options: CurrencyFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = currencyCode === 'KWD' ? 3 : 2,
    maximumFractionDigits = currencyCode === 'KWD' ? 3 : 2
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(minimumFractionDigits)}`;
  }
}

/**
 * Formats a luxury atelier serial code / SKU with standardized grouping.
 * Example: 'CC-SILK-2026-0042'
 */
export function formatAtelierSku(rawSku: string): string {
  if (!rawSku) return '';
  const cleaned = rawSku.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return cleaned.replace(/(.{4})/g, '$1-').replace(/-$/, '');
}

/**
 * Mask VIP client identification for privacy-compliant displays.
 */
export function maskVipIdentifier(id: string): string {
  if (!id || id.length <= 4) return 'VIP-****';
  return `VIP-${id.slice(0, 2)}***${id.slice(-2)}`;
}
