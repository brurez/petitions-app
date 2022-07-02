# frozen_string_literal: true

module Types
  class PetitionInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :title, String, required: true
    argument :description, String, required: true
    argument :user_id, Integer, required: true
    argument :city_id, Integer, required: true
  end
end
