const { describe, it } = require('node:test');
const assert = require('node:assert');
const { AuctionBiddingMultiplexer } = require('./auction-bidding-multiplexer');

describe('AuctionBiddingMultiplexer', () => {
  it('accepts higher bids and updates auction high water mark', () => {
    const mux = new AuctionBiddingMultiplexer('RUNWAY-LOOK-01', 5000);

    const bid1 = mux.submitBid('CLIENT-PARIS-001', 6000);
    assert.strictEqual(bid1.accepted, true);
    assert.strictEqual(mux.currentHighBid, 6000);
    assert.strictEqual(mux.winningBidder, 'CLIENT-PARIS-001');

    const bid2 = mux.submitBid('CLIENT-TOKYO-009', 7500);
    assert.strictEqual(bid2.accepted, true);
    assert.strictEqual(mux.currentHighBid, 7500);
    assert.strictEqual(mux.winningBidder, 'CLIENT-TOKYO-009');
  });

  it('rejects bids equal to or lower than current high bid', () => {
    const mux = new AuctionBiddingMultiplexer('RUNWAY-LOOK-01', 5000);
    mux.submitBid('CLIENT-PARIS-001', 6000);

    const underBid = mux.submitBid('CLIENT-NYC-002', 5500);
    assert.strictEqual(underBid.accepted, false);
    assert.strictEqual(mux.currentHighBid, 6000);

    const equalBid = mux.submitBid('CLIENT-NYC-002', 6000);
    assert.strictEqual(equalBid.accepted, false);
  });

  it('tracks watchers count accurately', () => {
    const mux = new AuctionBiddingMultiplexer('RUNWAY-LOOK-01', 5000);
    mux.registerWatcher('socket_1');
    mux.registerWatcher('socket_2');

    assert.strictEqual(mux.getAuctionState().activeWatchersCount, 2);

    mux.unregisterWatcher('socket_1');
    assert.strictEqual(mux.getAuctionState().activeWatchersCount, 1);
  });
});
