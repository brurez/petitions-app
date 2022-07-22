Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins %w[http://localhost:3000 https://final-project-brurez.vercel.app http://final-project-brurez.vercel.app]
    resource '*', headers: :any, methods: [:get, :post]
  end
end
