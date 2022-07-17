# frozen_string_literal: true

module Types
  class PetitionType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :user_id, Integer, null: false
    field :number_of_votes, Integer, null: false
    field :latitude, Float, null: false
    field :longitude, Float, null: false
    field :address, String, null: false
    field :city, String, null: false
    field :state, String, null: false
    field :country, String, null: false
    field :postal_code, Int, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
