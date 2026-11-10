# frozen_string_literal: true

module Loyalty
  class TierRetentionService
    TIER_ANNUAL_REQUIREMENTS = {
      'SILVER' => 2_500,
      'GOLD' => 10_000,
      'PLATINUM' => 25_000,
      'ATELIER_ELITE' => 75_000
    }.freeze

    GRACE_PERIOD_DAYS = 90
    LIFETIME_VIP_SPEND_WAIVER = 250_000

    def evaluate_retention(current_tier, annual_spend, lifetime_spend)
      required = TIER_ANNUAL_REQUIREMENTS[current_tier] || 0

      # Check lifetime spend exemption for legacy ultra-VIP patrons
      if lifetime_spend >= LIFETIME_VIP_SPEND_WAIVER
        return {
          status: :exempt_lifetime,
          current_tier: current_tier,
          grace_period_days: 0,
          shortfall: 0,
          retained: true
        }
      end

      if annual_spend >= required
        {
          status: :qualified,
          current_tier: current_tier,
          grace_period_days: 0,
          shortfall: 0,
          retained: true
        }
      else
        shortfall = required - annual_spend
        {
          status: :grace_period,
          current_tier: current_tier,
          grace_period_days: GRACE_PERIOD_DAYS,
          shortfall: shortfall,
          retained: true
        }
      end
    end
  end
end
