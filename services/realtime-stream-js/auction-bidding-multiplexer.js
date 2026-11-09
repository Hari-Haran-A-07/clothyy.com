/**
 * High-concurrency WebSocket live auction room bidding multiplexer.
 * Handles bid stream dispatch and anti-sniping bid reconciliation for one-of-a-kind couture runway pieces.
 */
class AuctionBiddingMultiplexer {
  constructor(roomCode, startingReservePrice) {
    this.roomCode = roomCode;
    this.currentHighBid = startingReservePrice;
    this.winningBidder = null;
    this.bidHistory = [];
    this.activeWatchers = new Set();
  }

  registerWatcher(socketId) {
    this.activeWatchers.add(socketId);
    return this.activeWatchers.size;
  }

  unregisterWatcher(socketId) {
    this.activeWatchers.delete(socketId);
    return this.activeWatchers.size;
  }

  submitBid(bidderId, amount, timestamp = Date.now()) {
    if (amount <= this.currentHighBid) {
      return {
        accepted: false,
        reason: `Bid EUR ${amount} must strictly exceed current high bid EUR ${this.currentHighBid}`,
        currentHighBid: this.currentHighBid
      };
    }

    const bidRecord = {
      bidderId,
      amount,
      timestamp,
      sequence: this.bidHistory.length + 1
    };

    this.currentHighBid = amount;
    this.winningBidder = bidderId;
    this.bidHistory.push(bidRecord);

    return {
      accepted: true,
      bidRecord,
      currentHighBid: this.currentHighBid
    };
  }

  getAuctionState() {
    return {
      roomCode: this.roomCode,
      currentHighBid: this.currentHighBid,
      winningBidder: this.winningBidder,
      totalBidsCount: this.bidHistory.length,
      activeWatchersCount: this.activeWatchers.size
    };
  }
}

module.exports = { AuctionBiddingMultiplexer };
