class Petition < ApplicationRecord
  belongs_to :user
  has_many :petition_media_files, :class_name => 'Petition::MediaFile'
  has_many :votes

  def number_of_votes
    votes.count
  end
end
