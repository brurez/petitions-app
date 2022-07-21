FactoryBot.define do
  factory :petition do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    latitude { 1 }
    longitude { 2 }
    address { "8 Lewisham Way" }
    city { "London" }
    state { "LD" }
    country { "UK" }
    postal_code { "SE14 6NW" }
  end
end
