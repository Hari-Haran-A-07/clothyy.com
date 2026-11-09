# frozen_string_literal: true

require_relative '../services/trunk_show_access'

RSpec.describe LoyaltyEngine::TrunkShowAccess do
  describe '.evaluate_eligibility' do
    it 'grants Couture Elite full 48-hour early access and champagne reception' do
      result = described_class.evaluate_eligibility(
        tier_name: 'Couture Elite',
        lifetime_spend_cents: 5_000_000,
        atelier_appointments_count: 5
      )

      expect(result[:eligible]).to be true
      expect(result[:priority_rank]).to eq(1)
      expect(result[:early_access_hours]).to eq(48)
      expect(result[:complimentary_guest_passes]).to eq(2)
      expect(result[:private_champagne_reception]).to be true
    end

    it 'denies standard tier with low spend and no atelier visits' do
      result = described_class.evaluate_eligibility(
        tier_name: 'Standard',
        lifetime_spend_cents: 200_00,
        atelier_appointments_count: 0
      )

      expect(result[:eligible]).to be false
      expect(result[:early_access_hours]).to eq(0)
      expect(result[:private_champagne_reception]).to be false
    end
  end
end
