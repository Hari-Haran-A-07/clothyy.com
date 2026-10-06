# frozen_string_literal: true

module Clothyyy
  class LoyaltyTierService
    TIERS = {
      silver: {
        min_spend_kwd: 0,
        perks: ['Complimentary Eco-Packaging', 'Standard Express Delivery'],
        multiplier: 1.0
      },
      gold: {
        min_spend_kwd: 1_500,
        perks: ['Priority Global Express Delivery', 'Early Access to Seasonal Drops', '5% Atelier Credit'],
        multiplier: 1.5
      },
      platinum: {
        min_spend_kwd: 5_000,
        perks: ['Private Atelier Fitting Access', 'Dedicated Personal Stylist', 'Free Monogramming', '10% Atelier Credit'],
        multiplier: 2.0
      },
      royal_black: {
        min_spend_kwd: 15_000,
        perks: ['White-Glove Chauffeur Delivery', 'Direct Line to Creative Director', 'Runway Show Invitations (Paris/Milan)', 'Bespoke Custom Tailoring', '15% Atelier Credit'],
        multiplier: 3.0
      }
    }.freeze

    def self.calculate_status(lifetime_spend_kwd)
      tier = case lifetime_spend_kwd
             when 15_000..Float::INFINITY then :royal_black
             when 5_000...15_000 then :platinum
             when 1_500...5_000 then :gold
             else :silver
             end

      config = TIERS[tier]
      points_earned = (lifetime_spend_kwd * 10 * config[:multiplier]).to_i

      {
        tier_code: tier.to_s.upcase,
        tier_name: tier.to_s.split('_').map(&:capitalize).join(' '),
        lifetime_spend_kwd: lifetime_spend_kwd,
        accumulated_points: points_earned,
        privileges: config[:perks],
        points_multiplier: config[:multiplier],
        next_tier_progress: calculate_progress(lifetime_spend_kwd, tier)
      }
    end

    def self.calculate_progress(spend, current_tier)
      case current_tier
      when :silver
        { next_tier: 'GOLD', remaining_kwd: (1_500 - spend).clamp(0, 1_500), progress_pct: (spend / 1_500.0 * 100).round(1) }
      when :gold
        { next_tier: 'PLATINUM', remaining_kwd: (5_000 - spend).clamp(0, 3_500), progress_pct: ((spend - 1_500) / 3500.0 * 100).round(1) }
      when :platinum
        { next_tier: 'ROYAL_BLACK', remaining_kwd: (15_000 - spend).clamp(0, 10_000), progress_pct: ((spend - 5_000) / 10000.0 * 100).round(1) }
      when :royal_black
        { next_tier: 'MAX_TIER_ACHIEVED', remaining_kwd: 0, progress_pct: 100.0 }
      end
    end
  end
end
