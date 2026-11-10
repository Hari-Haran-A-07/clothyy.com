/**
 * Synchronizes live couture runway auction countdown timers across distributed client websockets.
 * Supports anti-sniping dynamic time extensions and wall-clock drift mitigation.
 */
class AuctionCountdownHeartbeat {
  constructor(roomCode, endTimeEpochMs, antiSnipingThresholdSec = 60, antiSnipingExtensionSec = 30) {
    this.roomCode = roomCode;
    this.endTimeEpochMs = endTimeEpochMs;
    this.antiSnipingThresholdSec = antiSnipingThresholdSec;
    this.antiSnipingExtensionSec = antiSnipingExtensionSec;
    this.extensionCount = 0;
  }

  getRemainingSeconds(nowEpochMs = Date.now()) {
    const diffMs = this.endTimeEpochMs - nowEpochMs;
    return Math.max(0, Math.floor(diffMs / 1000));
  }

  isExpired(nowEpochMs = Date.now()) {
    return this.getRemainingSeconds(nowEpochMs) <= 0;
  }

  handleBidPlaced(nowEpochMs = Date.now()) {
    const remainingSec = this.getRemainingSeconds(nowEpochMs);
    let extended = false;

    if (remainingSec > 0 && remainingSec <= this.antiSnipingThresholdSec) {
      this.endTimeEpochMs += this.antiSnipingExtensionSec * 1000;
      this.extensionCount++;
      extended = true;
    }

    return {
      extended,
      extensionCount: this.extensionCount,
      newEndTimeEpochMs: this.endTimeEpochMs,
      remainingSeconds: this.getRemainingSeconds(nowEpochMs)
    };
  }

  generateHeartbeatPayload(nowEpochMs = Date.now()) {
    return {
      roomCode: this.roomCode,
      serverTime: nowEpochMs,
      endTimeEpochMs: this.endTimeEpochMs,
      remainingSeconds: this.getRemainingSeconds(nowEpochMs),
      isExpired: this.isExpired(nowEpochMs),
      extensionCount: this.extensionCount
    };
  }
}

module.exports = { AuctionCountdownHeartbeat };
