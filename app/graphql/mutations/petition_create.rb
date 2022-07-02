# frozen_string_literal: true

module Mutations
  class PetitionCreate < BaseMutation
    description "Creates a new petition"

    field :petition, Types::PetitionType, null: false

    argument :petition_input, Types::PetitionInputType, required: true

    def resolve(petition_input:)
      petition = ::Petition.new(**petition_input)
      raise GraphQL::ExecutionError.new "Error creating petition", extensions: petition.errors.to_hash unless petition.save

      { petition: petition }
    end
  end
end
