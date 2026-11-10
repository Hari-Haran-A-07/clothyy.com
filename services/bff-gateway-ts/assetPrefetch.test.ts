import { describe, it, expect, beforeEach } from 'vitest';
import { AssetPrefetchBuilder } from './assetPrefetch';

describe('AssetPrefetchBuilder', () => {
  let builder: AssetPrefetchBuilder;

  beforeEach(() => {
    builder = new AssetPrefetchBuilder();
  });

  it('generates well-formed Link preload header for high-bandwidth client', () => {
    builder
      .addResource({
        uri: '/assets/runway_look_01.webp',
        asType: 'image',
        mediaType: 'image/webp',
        importance: 'high',
      })
      .addResource({
        uri: '/assets/runway_walk_preview.mp4',
        asType: 'video',
        mediaType: 'video/mp4',
      });

    const header = builder.buildLinkHeader(true);
    expect(header).toContain('</assets/runway_look_01.webp>; rel=preload; as=image; type="image/webp"; importance=high');
    expect(header).toContain('</assets/runway_walk_preview.mp4>; rel=preload; as=video; type="video/mp4"');
  });

  it('omits heavy video assets for low-bandwidth connections', () => {
    builder
      .addResource({
        uri: '/assets/thumbnail.webp',
        asType: 'image',
      })
      .addResource({
        uri: '/assets/heavy_runway_4k.mp4',
        asType: 'video',
      });

    const header = builder.buildLinkHeader(false);
    expect(header).toContain('thumbnail.webp');
    expect(header).not.toContain('heavy_runway_4k.mp4');
  });
});
