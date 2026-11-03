# frozen_string_literal: true

require_relative '../services/perks_calculator'

RSpec.describe Clothyyy::Loyalty::PerksCalculator do
  describe '.evaluate_tier' do
    it 'assigns bronze for zero or low points' do
      expect(described_class.evaluate_tier(100)).to eq(:bronze)
    end

    it 'assigns silver for points above 2,500' do
      expect(described_class.evaluate_tier(3_000)).to eq(:silver)
    end

    it 'assigns gold for points above 10,000' do
      expect(described_class.evaluate_tier(15_000)).to eq(:gold)
    end

    it 'assigns platinum for points above 25,000' do
      expect(described_class.evaluate_tier(30_000)).to eq(:platinum)
    end

    it 'assigns royal_noir for points above 60,000' do
      expect(described_class.evaluate_tier(75_000)).to eq(:royal_noir)
    end
  end

  describe '.calculate_perks' do
    it 'returns exclusive perks and discount for royal_noir members' do
      perks = described_class.calculate_perks(
        client_id: 'VIP-777',
        total_points: 85_000,
        annual_spend_cents: 5_000_000,
        tenure_years: 3
      )

      expect(perks[:tier]).to eq(:royal_noir)
      expect(perks[:discount_rate]).to eq(0.20)
      expect(perks[:point_multiplier]).to eq(3.0)
      expect(perks[:eligible_perks]).to include("Champagne Reception & Runway Invitation")
      expect(perks[:eligible_perks]).to include("Dedicated Master Tailor")
      expect(perks[:eligible_perks]).to include("Tenured Connoisseur Anniversary Gift")
    end
  end
end
