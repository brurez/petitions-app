# frozen_string_literal: true

module Types
  class PetitionInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :title, String, required: true
    argument :description, String, required: true
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true
    argument :address, String, required: true
    argument :city, String, required: true
    argument :state, String, required: true
    argument :country, String, required: true
    argument :postal_code, Int, required: true
  end
end
