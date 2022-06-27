FactoryBot.define do
  factory :user, class: "User" do
    first_name { "John" }
    last_name  { "Doe" }
    email { "johndoe@email.com" }
    password { "weakpassword" }
  end
end
