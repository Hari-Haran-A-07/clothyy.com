# frozen_string_literal: true

require_relative '../services/tier_retention_service'

RSpec.describe Loyalty::TierRetentionService do
  subject(:service) { described_class.new }

  describe '#evaluate_retention' do
    it 'qualifies client meeting annual spend requirement' do
      result = service.evaluate_retention('GOLD', 12_000, 45_000)
      expect(result[:status]).to eq(:qualified)
      expect(result[:retained]).to be true
      expect(result[:shortfall]).to eq(0)
    end

    it 'enters 90-day grace period when spend falls short' do
      result = service.evaluate_retention('PLATINUM', 18_000, 60_000)
      expect(result[:status]).to eq(:grace_period)
      expect(result[:retained]).to be true
      expect(result[:grace_period_days]).to eq(90)
      expect(result[:shortfall]).to eq(7_000)
    end

    it 'exempts lifetime patrons with over 250k spend from downgrade' do
      result = service.evaluate_retention('ATELIER_ELITE', 10_000, 320_000)
      expect(result[:status]).to eq(:exempt_lifetime)
      expect(result[:retained]).to be true
      expect(result[:shortfall]).to eq(0)
    end
  end
end
