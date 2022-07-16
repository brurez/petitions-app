FactoryBot.define do
  factory :petition do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
  end
end
