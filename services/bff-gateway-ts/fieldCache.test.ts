import { describe, it, expect, beforeEach } from 'vitest';
import { FieldResponseCache } from './fieldCache';

describe('FieldResponseCache', () => {
  let cache: FieldResponseCache;

  beforeEach(() => {
    cache = new FieldResponseCache();
  });

  it('stores and retrieves cached data before TTL expires', () => {
    const payload = { designer: 'Madame Grès', piecesCount: 4 };
    cache.set('atelier:gres', payload, 60, ['atelier', 'couture']);

    const cached = cache.get<{ designer: string; piecesCount: number }>('atelier:gres');
    expect(cached).toEqual(payload);
  });

  it('purges items matching an invalidated tag', () => {
    cache.set('lookbook:fw26', { title: 'Winter' }, 60, ['lookbook', 'fw26']);
    cache.set('lookbook:ss27', { title: 'Spring' }, 60, ['lookbook', 'ss27']);
    cache.set('product:coat', { sku: 'C-01' }, 60, ['product']);

    const purged = cache.invalidateTag('lookbook');
    expect(purged).toBe(2);

    expect(cache.get('lookbook:fw26')).toBeNull();
    expect(cache.get('lookbook:ss27')).toBeNull();
    expect(cache.get('product:coat')).not.toBeNull();
  });
});
