class Petition < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_many :petition_media_files, :class_name => 'Petition::MediaFile'
end
