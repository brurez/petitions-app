# frozen_string_literal: true

module Types
  class Petition::MediaFileType < Types::BaseObject
    field :id, ID, null: false
    field :petition_id, Integer
    field :url, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
