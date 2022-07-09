FactoryBot.define do
  factory :petition do
    title { "MyString" }
    description { "MyText" }
    user { nil }
    city { nil }
  end
end
