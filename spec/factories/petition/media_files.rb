FactoryBot.define do
  factory :petition_media_file, class: 'Petition::MediaFile' do
    url { "http://my-url.com/path" }
    filename { "photo.jpg" }
    content_type { "MyString" }
    petition { nil }
  end
end
