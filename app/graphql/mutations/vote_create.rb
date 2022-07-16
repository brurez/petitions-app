# frozen_string_literal: true

module Mutations
  class VoteCreate < BaseMutation
    description "Creates a new vote"

    field :vote, Types::VoteType, null: false

    argument :vote_input, Types::VoteInputType, required: true

    def resolve(vote_input:)
      authenticated?
      vote = ::Vote.new(**vote_input, user: current_user)
      authorize vote, :create?
      raise GraphQL::ExecutionError.new "Error creating vote", extensions: vote.errors.to_hash unless vote.save

      { vote: vote }
    end
  end
end
