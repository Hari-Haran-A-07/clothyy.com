/**
 * CLOTHYYY.COM — Security Middleware Unit Test Suite
 */

import { securityHeaders } from './security';

describe('Security Headers Middleware', () => {
  it('should set all mandated enterprise security headers on the response', () => {
    const headers: Record<string, string> = {};
    const req = {} as any;
    const res = {
      setHeader: (name: string, value: string) => {
        headers[name] = value;
      },
    } as any;
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    securityHeaders(req, res, next);

    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=()');
    expect(headers['Content-Security-Policy']).toContain("default-src 'self'");
    expect(headers['Content-Security-Policy']).toContain('https://images.unsplash.com');
    expect(nextCalled).toBe(true);
  });
});
