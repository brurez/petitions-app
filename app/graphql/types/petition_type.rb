# frozen_string_literal: true

module Types
  class PetitionType < Types::BaseObject
    field :id, ID, null: false
    field :title, String
    field :description, String
    field :user_id, Integer, null: false
    field :number_of_votes, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
