# frozen_string_literal: true

module Types
  class VoteInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :user_id, Integer, required: false
    argument :petition_id, Integer, required: true
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
