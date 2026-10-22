/**
 * CLOTHYYY.COM — Formatters Unit Test Suite
 */

import { formatLuxuryPrice, formatAtelierSku, maskVipIdentifier } from './formatters';

describe('formatLuxuryPrice', () => {
  it('formats KWD prices with 3 decimal places by default', () => {
    const formatted = formatLuxuryPrice(1250.5, 'KWD');
    expect(formatted).toMatch(/1,250\.500|1250\.500/);
  });

  it('formats USD prices with 2 decimal places by default', () => {
    const formatted = formatLuxuryPrice(4500, 'USD');
    expect(formatted).toContain('4,500.00');
  });

  it('falls back safely on unknown currency code', () => {
    const formatted = formatLuxuryPrice(100, 'XYZ_INVALID');
    expect(formatted).toContain('XYZ_INVALID');
  });
});

describe('formatAtelierSku', () => {
  it('chunks raw sku strings into 4-character hyphenated segments', () => {
    expect(formatAtelierSku('CCSK20260042')).toBe('CCSK-2026-0042');
  });

  it('handles empty input gracefully', () => {
    expect(formatAtelierSku('')).toBe('');
  });
});

describe('maskVipIdentifier', () => {
  it('masks VIP client id correctly', () => {
    expect(maskVipIdentifier('ROYAL9988')).toBe('VIP-RO***88');
  });

  it('handles short id safely', () => {
    expect(maskVipIdentifier('AB')).toBe('VIP-****');
  });
});
