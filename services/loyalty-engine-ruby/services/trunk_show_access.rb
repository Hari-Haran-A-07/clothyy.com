# frozen_string_literal: true

module LoyaltyEngine
  class TrunkShowAccess
    TIER_PRIORITIES = {
      'Couture Elite' => { priority: 1, early_access_hours: 48, max_guests: 2 },
      'Sartorial Connoisseur' => { priority: 2, early_access_hours: 24, max_guests: 1 },
      'Atelier Member' => { priority: 3, early_access_hours: 6, max_guests: 0 },
      'Standard' => { priority: 99, early_access_hours: 0, max_guests: 0 }
    }.freeze

    MINIMUM_VIP_LIFETIME_SPEND = 10_000 # EUR

    def self.evaluate_eligibility(tier_name:, lifetime_spend_cents:, atelier_appointments_count:)
      config = TIER_PRIORITIES.fetch(tier_name, TIER_PRIORITIES['Standard'])
      spend_eur = lifetime_spend_cents / 100.0

      is_eligible = (config[:priority] <= 2) || (spend_eur >= MINIMUM_VIP_LIFETIME_SPEND && atelier_appointments_count >= 3)

      {
        eligible: is_eligible,
        priority_rank: config[:priority],
        early_access_hours: config[:early_access_hours],
        complimentary_guest_passes: config[:max_guests],
        private_champagne_reception: config[:priority] == 1
      }
    end
  end
end
