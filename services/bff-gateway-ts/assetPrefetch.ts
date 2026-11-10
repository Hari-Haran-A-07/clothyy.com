/**
 * Builds HTTP Link headers for prefetching luxury lookbook imagery,
 * 3D glTF runway models, and ultra-high-definition textile video snippets.
 */
export interface AssetResource {
  uri: string;
  asType: 'image' | 'video' | 'fetch' | 'model';
  mediaType?: string;
  importance?: 'high' | 'low' | 'auto';
}

export class AssetPrefetchBuilder {
  private resources: AssetResource[] = [];

  addResource(resource: AssetResource): this {
    this.resources.push(resource);
    return this;
  }

  buildLinkHeader(isHighBandwidth: boolean = true): string {
    const activeResources = isHighBandwidth
      ? this.resources
      : this.resources.filter((r) => r.asType !== 'video');

    return activeResources
      .map((r) => {
        let directive = `<${r.uri}>; rel=preload; as=${r.asType}`;
        if (r.mediaType) {
          directive += `; type="${r.mediaType}"`;
        }
        if (r.importance) {
          directive += `; importance=${r.importance}`;
        }
        return directive;
      })
      .join(', ');
  }

  clear(): void {
    this.resources = [];
  }
}
