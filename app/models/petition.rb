class Petition < ApplicationRecord
  belongs_to :user
  has_many :media_files, :class_name => 'Petition::MediaFile', dependent: :delete_all
  has_many :votes, dependent: :delete_all

  validates :city, presence: true
  validates :country, presence: true

  def number_of_votes
    votes.count
  end
end
