FactoryBot.define do
  factory :comment do
    comment_text { "MyText" }
    user { nil }
    petition { nil }
  end
end
