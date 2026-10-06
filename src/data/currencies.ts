import { Currency } from '../types';

export const CURRENCIES: Record<string, Currency> = {
  KWD: {
    code: 'KWD',
    symbol: 'KD ',
    name: 'Kuwaiti Dinar',
    rateFromKWD: 1.0,
    decimalPlaces: 3,
    symbolPosition: 'before'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateFromKWD: 3.26, // 1 KWD ≈ 3.26 USD
    decimalPlaces: 2,
    symbolPosition: 'before'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateFromKWD: 3.02,
    decimalPlaces: 2,
    symbolPosition: 'after'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateFromKWD: 2.58,
    decimalPlaces: 2,
    symbolPosition: 'before'
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    rateFromKWD: 11.97,
    decimalPlaces: 2,
    symbolPosition: 'before'
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR ',
    name: 'Saudi Riyal',
    rateFromKWD: 12.23,
    decimalPlaces: 2,
    symbolPosition: 'before'
  },
  QAR: {
    code: 'QAR',
    symbol: 'QAR ',
    name: 'Qatari Riyal',
    rateFromKWD: 11.87,
    decimalPlaces: 2,
    symbolPosition: 'before'
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    rateFromKWD: 495.0,
    decimalPlaces: 0,
    symbolPosition: 'before'
  }
};

export function formatCurrency(amountInKWD: number, currencyCode: string = 'KWD'): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.KWD;
  const converted = amountInKWD * currency.rateFromKWD;
  
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(converted);

  if (currency.symbolPosition === 'after') {
    return `${formattedNumber} ${currency.symbol}`;
  }
  return `${currency.symbol}${formattedNumber}`;
}
