/**
 * W3C Trace Context and Request Correlation Middleware
 * Ensures end-to-end telemetry propagation across all microservices.
 */
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface TraceContext {
  traceId: string;
  spanId: string;
  correlationId: string;
}

export function generateTraceparent(): string {
  const version = '00';
  const traceId = crypto.randomBytes(16).toString('hex');
  const spanId = crypto.randomBytes(8).toString('hex');
  const flags = '01';
  return `${version}-${traceId}-${spanId}-${flags}`;
}

export function tracingMiddleware(req: Request, res: Response, next: NextFunction): void {
  let traceparent = req.headers['traceparent'] as string;
  if (!traceparent) {
    traceparent = generateTraceparent();
  }

  const correlationId = (req.headers['x-correlation-id'] as string) || crypto.randomUUID();

  res.setHeader('traceparent', traceparent);
  res.setHeader('x-correlation-id', correlationId);

  (req as any).traceContext = {
    traceparent,
    correlationId,
  };

  next();
}
