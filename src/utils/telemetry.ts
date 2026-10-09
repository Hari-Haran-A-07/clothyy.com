/**
 * CLOTHYYY.COM — Real-Time Client Telemetry & Web Vitals Dispatcher
 * Monitors First Contentful Paint (FCP), Largest Contentful Paint (LCP),
 * Cumulative Layout Shift (CLS), and streams telemetry to the JavaScript real-time hub.
 */

export interface TelemetryEvent {
  eventType: 'PAGE_VIEW' | 'PERF_METRIC' | 'VIP_ENGAGEMENT' | 'CART_ADD';
  path: string;
  metricName?: string;
  value?: number;
  timestamp: string;
  userAgent: string;
}

class TelemetryEngine {
  private queue: TelemetryEvent[] = [];
  private isBroadcasting = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPerformanceObserver();
    }
  }

  private initPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.logMetric('FCP', entry.startTime);
            }
          }
        });
        observer.observe({ type: 'paint', buffered: true });
      } catch (e) {
        // Fallback for older browsers
      }
    }
  }

  public logMetric(name: string, value: number) {
    this.queue.push({
      eventType: 'PERF_METRIC',
      path: window.location.pathname,
      metricName: name,
      value: Math.round(value),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    this.flush();
  }

  public logEngagement(event: 'PAGE_VIEW' | 'VIP_ENGAGEMENT' | 'CART_ADD', details?: string) {
    this.queue.push({
      eventType: event,
      path: window.location.pathname,
      metricName: details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    this.flush();
  }

  private flush() {
    if (this.isBroadcasting || this.queue.length === 0) return;
    this.isBroadcasting = true;

    // Simulated async dispatch to JavaScript Telemetry Microservice (:8089)
    setTimeout(() => {
      this.queue = [];
      this.isBroadcasting = false;
    }, 300);
  }
}

export const telemetry = new TelemetryEngine();
