/**
 * In-memory tag-invalidated response cache for BFF microservice responses.
 * Caches luxury product catalog queries, designer ateliers, and lookbook feeds.
 */
export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  tags: string[];
}

export class FieldResponseCache {
  private store: Map<string, CacheEntry<any>> = new Map();

  set<T>(key: string, value: T, ttlSeconds: number, tags: string[] = []): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(key, { value, expiresAt, tags });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  invalidateTag(tag: string): number {
    let purged = 0;
    for (const [key, entry] of this.store.entries()) {
      if (entry.tags.includes(tag)) {
        this.store.delete(key);
        purged++;
      }
    }
    return purged;
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }
}
