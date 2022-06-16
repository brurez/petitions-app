class User < ApplicationRecord
  has_secure_password

  self.primary_key = :email

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end

