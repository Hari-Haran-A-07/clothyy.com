# frozen_string_literal: true

require 'rspec'
require_relative '../services/loyalty_tier_service'

RSpec.describe Clothyyy::LoyaltyTierService do
  describe '.calculate_status' do
    context 'when spend is below 1500 KWD' do
      it 'assigns SILVER tier with 1.0x point multiplier' do
        status = described_class.calculate_status(500.0)
        expect(status[:tier_code]).to eq('SILVER')
        expect(status[:points_multiplier]).to eq(1.0)
        expect(status[:accumulated_points]).to eq(5000)
      end
    end

    context 'when spend is between 1500 and 5000 KWD' do
      it 'assigns GOLD tier with 1.5x multiplier and early access' do
        status = described_class.calculate_status(2000.0)
        expect(status[:tier_code]).to eq('GOLD')
        expect(status[:points_multiplier]).to eq(1.5)
        expect(status[:accumulated_points]).to eq(30_000)
      end
    end

    context 'when spend exceeds 15000 KWD' do
      it 'unlocks ROYAL_BLACK tier with chauffeur privileges and 3.0x multiplier' do
        status = described_class.calculate_status(25_000.0)
        expect(status[:tier_code]).to eq('ROYAL_BLACK')
        expect(status[:points_multiplier]).to eq(3.0)
        expect(status[:privileges]).to include('White-Glove Chauffeur Delivery')
      end
    end
  end
end
