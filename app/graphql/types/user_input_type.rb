# frozen_string_literal: true

module Types
  class UserInputType < Types::BaseInputObject
    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :password, String, required: false
  end
end
