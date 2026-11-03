# frozen_string_literal: true

module Clothyyy
  module Loyalty
    class PerksCalculator
      TIER_THRESHOLDS = {
        bronze: { min_points: 0, multiplier: 1.0 },
        silver: { min_points: 2_500, multiplier: 1.25 },
        gold: { min_points: 10_000, multiplier: 1.5 },
        platinum: { min_points: 25_000, multiplier: 2.0 },
        royal_noir: { min_points: 60_000, multiplier: 3.0 }
      }.freeze

      def self.evaluate_tier(total_points)
        return :royal_noir if total_points >= 60_000
        return :platinum   if total_points >= 25_000
        return :gold       if total_points >= 10_000
        return :silver     if total_points >= 2_500

        :bronze
      end

      def self.calculate_perks(client_id:, total_points:, annual_spend_cents:, tenure_years:)
        tier = evaluate_tier(total_points)
        multiplier = TIER_THRESHOLDS[tier][:multiplier]

        perks = []
        perks << "Standard Express Shipping" if total_points >= 0
        perks << "Private Atelier Preview" if [:gold, :platinum, :royal_noir].include?(tier)
        perks << "Dedicated Master Tailor" if [:platinum, :royal_noir].include?(tier)
        perks << "Champagne Reception & Runway Invitation" if tier == :royal_noir

        if tenure_years >= 2
          perks << "Tenured Connoisseur Anniversary Gift"
        end

        discount_rate = case tier
                        when :royal_noir then 0.20
                        when :platinum   then 0.15
                        when :gold       then 0.10
                        when :silver     then 0.05
                        else 0.00
                        end

        {
          client_id: client_id,
          tier: tier,
          point_multiplier: multiplier,
          discount_rate: discount_rate,
          eligible_perks: perks,
          annual_spend_usd: annual_spend_cents / 100.0
        }
      end
    end
  end
end
