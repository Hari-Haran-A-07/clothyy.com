import { generateTraceparent, tracingMiddleware } from './tracing';

describe('BFF Tracing Middleware', () => {
  it('generates valid W3C traceparent string format', () => {
    const tp = generateTraceparent();
    const parts = tp.split('-');
    expect(parts.length).toBe(4);
    expect(parts[0]).toBe('00');
    expect(parts[1].length).toBe(32);
    expect(parts[2].length).toBe(16);
    expect(parts[3]).toBe('01');
  });

  it('populates response headers and passes to next middleware', () => {
    const req: any = { headers: {} };
    const res: any = {
      headers: {},
      setHeader(k: string, v: string) {
        this.headers[k] = v;
      },
    };
    let nextCalled = false;
    tracingMiddleware(req, res, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(true);
    expect(res.headers['traceparent']).toBeDefined();
    expect(res.headers['x-correlation-id']).toBeDefined();
  });
});
