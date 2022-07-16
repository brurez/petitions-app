# frozen_string_literal: true

module Mutations
  class PetitionUpdate < BaseMutation
    description "Updates a petition by id"

    field :petition, Types::PetitionType, null: false

    argument :id, ID, required: true
    argument :petition_input, Types::PetitionInputType, required: true

    def resolve(id:, petition_input:)
      authenticated?
      petition = ::Petition.find(id)
      raise GraphQL::ExecutionError.new "Error updating petition", extensions: petition.errors.to_hash unless petition.update(**petition_input)
      authorize petition, :update?
      petition.update!(**petition_input)
      { petition: petition.reload }
    end
  end
end
