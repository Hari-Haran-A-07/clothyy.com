/**
 * WebSocket Client Heartbeat and Zombie Connection Reaper
 * Maintains live telemetry streams without connection leaks.
 */

class HeartbeatMonitor {
  constructor(timeoutMs = 30000, pingIntervalMs = 15000) {
    this.timeoutMs = timeoutMs;
    this.pingIntervalMs = pingIntervalMs;
    this.clients = new Map();
  }

  registerClient(clientId, sendPingFn, terminateFn) {
    this.clients.set(clientId, {
      lastSeen: Date.now(),
      sendPing: sendPingFn,
      terminate: terminateFn,
    });
  }

  recordHeartbeat(clientId) {
    const client = this.clients.get(clientId);
    if (client) {
      client.lastSeen = Date.now();
      return true;
    }
    return false;
  }

  reapDeadConnections(currentTime = Date.now()) {
    let reapedCount = 0;
    for (const [clientId, data] of this.clients.entries()) {
      if (currentTime - data.lastSeen > this.timeoutMs) {
        data.terminate();
        this.clients.delete(clientId);
        reapedCount++;
      }
    }
    return reapedCount;
  }

  activeClientsCount() {
    return this.clients.size;
  }
}

module.exports = { HeartbeatMonitor };
