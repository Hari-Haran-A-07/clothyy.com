# frozen_string_literal: true

require 'sinatra'
require 'sinatra/json'
require 'rack/cors'
require_relative 'services/loyalty_tier_service'

set :port, 8088
set :bind, '0.0.0.0'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: %i[get post options]
  end
end

get '/health' do
  json(
    service: 'CLOTHYYY Royal Loyalty & Privileges Engine',
    status: 'HEALTHY_ONLINE',
    language: "Ruby #{RUBY_VERSION} (Sinatra)",
    gc_profile: 'COMPACTING_GARBAGE_COLLECTOR',
    timestamp: Time.now.utc.iso8601
  )
end

get '/api/v1/loyalty/tier' do
  spend = (params[:lifetime_spend_kwd] || 2500.0).to_f
  status = Clothyyy::LoyaltyTierService.calculate_status(spend)
  json(status)
end

puts '[CLOTHYYY Ruby Loyalty Engine] Initializing Puma/Sinatra on port 8088...'
