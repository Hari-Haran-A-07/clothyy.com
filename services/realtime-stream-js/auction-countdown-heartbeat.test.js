const { AuctionCountdownHeartbeat } = require('./auction-countdown-heartbeat');

describe('AuctionCountdownHeartbeat', () => {
  const baseTime = 1762770000000;
  const initialEndTime = baseTime + 120000; // 2 minutes

  test('calculates correct remaining seconds', () => {
    const monitor = new AuctionCountdownHeartbeat('RUNWAY-PARIS-01', initialEndTime);
    expect(monitor.getRemainingSeconds(baseTime)).toBe(120);
    expect(monitor.isExpired(baseTime)).toBe(false);
  });

  test('triggers anti-sniping extension when bid placed in final 60s', () => {
    const monitor = new AuctionCountdownHeartbeat('RUNWAY-PARIS-01', initialEndTime, 60, 30);
    // 40 seconds remaining
    const bidTime = baseTime + 80000;

    const result = monitor.handleBidPlaced(bidTime);
    expect(result.extended).toBe(true);
    expect(result.extensionCount).toBe(1);
    expect(monitor.getRemainingSeconds(bidTime)).toBe(70); // 40 + 30
  });

  test('does not trigger extension when bid placed early', () => {
    const monitor = new AuctionCountdownHeartbeat('RUNWAY-PARIS-01', initialEndTime, 60, 30);
    // 100 seconds remaining
    const bidTime = baseTime + 20000;

    const result = monitor.handleBidPlaced(bidTime);
    expect(result.extended).toBe(false);
    expect(result.extensionCount).toBe(0);
  });

  test('reports expired when past end time', () => {
    const monitor = new AuctionCountdownHeartbeat('RUNWAY-PARIS-01', initialEndTime);
    expect(monitor.isExpired(initialEndTime + 1000)).toBe(true);
    expect(monitor.getRemainingSeconds(initialEndTime + 1000)).toBe(0);
  });
});
