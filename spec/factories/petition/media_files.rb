FactoryBot.define do
  factory :petition_media_file, class: 'Petition::MediaFile' do
    url { "MyString" }
    filename { "MyString" }
    content_type { "MyString" }
    petition { nil }
  end
end
