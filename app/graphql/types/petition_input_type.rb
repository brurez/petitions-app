# frozen_string_literal: true

module Types
  class PetitionInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :title, String, required: true
    argument :description, String, required: true
  end
end
