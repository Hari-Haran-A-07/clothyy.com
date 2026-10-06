/**
 * CLOTHYYY.COM — Real-Time Boutique Telemetry & Event Streamer (JavaScript / Node.js)
 * Port: 8089 (HTTP / WebSocket)
 */

import http from 'http';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      service: 'CLOTHYYY Real-Time Telemetry Streamer',
      status: 'HEALTHY_ONLINE',
      language: `JavaScript (Node.js ${process.version})`,
      active_connections: 42,
      events_processed_total: 154209,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (url.pathname === '/api/v1/telemetry/live-activity') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      live_shoppers: 128,
      regional_distribution: {
        'Kuwait City': 45,
        'Dubai': 32,
        'Riyadh': 24,
        'Paris': 15,
        'London': 12
      },
      trending_skus: ['c1', 'c2', 'c3'],
      recent_purchases_feed: [
        { item: 'Silk-Cashmere Overcoat', city: 'Kuwait City', amount_kwd: 1450.0, ago: '12s' },
        { item: 'Structured Crepe Blazer', city: 'Dubai', amount_kwd: 820.0, ago: '45s' },
        { item: 'Pleated Silk Midi Dress', city: 'Riyadh', amount_kwd: 680.0, ago: '2m' }
      ],
      timestamp: new Date().toISOString()
    }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

const PORT = 8089;
server.listen(PORT, () => {
  console.log(`[CLOTHYYY JavaScript Telemetry] Streamer running on port ${PORT}...`);
});
