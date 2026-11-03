const { describe, it } = require('node:test');
const assert = require('node:assert');
const { HeartbeatMonitor } = require('./heartbeat-monitor');

describe('HeartbeatMonitor', () => {
  it('registers and tracks client heartbeat', () => {
    const monitor = new HeartbeatMonitor(5000);
    let pinged = false;
    let terminated = false;

    monitor.registerClient(
      'ws-client-1',
      () => { pinged = true; },
      () => { terminated = true; }
    );

    assert.strictEqual(monitor.activeClientsCount(), 1);
    assert.strictEqual(monitor.recordHeartbeat('ws-client-1'), true);
  });

  it('reaps clients that fail to respond within timeout', () => {
    const monitor = new HeartbeatMonitor(5000);
    let terminated = false;

    monitor.registerClient('ws-client-2', () => {}, () => { terminated = true; });

    const futureTime = Date.now() + 6000;
    const reaped = monitor.reapDeadConnections(futureTime);

    assert.strictEqual(reaped, 1);
    assert.strictEqual(terminated, true);
    assert.strictEqual(monitor.activeClientsCount(), 0);
  });
});
