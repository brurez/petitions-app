# frozen_string_literal: true

module Mutations
  class PetitionDelete < BaseMutation
    description "Deletes a petition by ID"

    field :petition, Types::PetitionType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      authenticated?
      petition = ::Petition.find(id)
      authorize petition, :destroy?
      raise GraphQL::ExecutionError.new "Error deleting petition", extensions: petition.errors.to_hash unless petition.destroy

      { petition: petition }
    end
  end
end
