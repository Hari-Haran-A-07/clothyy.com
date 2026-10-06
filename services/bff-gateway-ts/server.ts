/**
 * CLOTHYYY.COM — TypeScript BFF API Gateway Server
 * Port: 8080
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PolyglotOrchestrator } from './orchestrator.js';

const app = express();
const port = 8080;
const orchestrator = new PolyglotOrchestrator();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health & System Overview Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    service: 'CLOTHYYY Polyglot BFF API Gateway',
    status: 'HEALTHY_ONLINE',
    language: 'TypeScript 5.3 / Node.js 20',
    total_integrated_languages: 11,
    timestamp: new Date().toISOString()
  });
});

// Polyglot fleet overview
app.get('/api/v1/polyglot/fleet', (req: Request, res: Response) => {
  const fleet = orchestrator.getSystemOverview();
  res.json({
    fleet_size: fleet.length,
    services: fleet,
    global_health: '100% OPERATIONAL',
    budget_allocated_kwd: '2,000,000,000,000.000',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`[CLOTHYYY TypeScript Gateway] Running on http://localhost:${port}`);
});
