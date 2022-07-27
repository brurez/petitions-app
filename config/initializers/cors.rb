Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins %w[http://localhost:3000 https://final-project-two-opal.vercel.app]
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
