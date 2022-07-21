class Petition < ApplicationRecord
  belongs_to :user
  has_many :media_files, :class_name => 'Petition::MediaFile'
  has_many :votes

  validates :city, presence: true
  validates :country, presence: true

  def number_of_votes
    votes.count
  end
end
