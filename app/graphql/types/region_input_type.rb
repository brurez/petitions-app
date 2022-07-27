# frozen_string_literal: true

module Types
  class RegionInputType < Types::BaseInputObject
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true
    argument :radius, Float, required: true
  end
end
