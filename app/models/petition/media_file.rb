class Petition::MediaFile < ApplicationRecord
  belongs_to :petition, optional: true

  has_one_attached :file

  def url
    file_attachment.url
  end
end
