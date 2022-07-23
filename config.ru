# This file is used by Rack-based servers to start the application.

require_relative "config/environment"
require 'rack/cors'

use Rack::Cors do
  allow do
    origins 'https://final-project-brurez.vercel.app'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end

  allow do
    origins 'http://localhost:3000'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

run Rails.application
Rails.application.load_server
