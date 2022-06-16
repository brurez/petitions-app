# frozen_string_literal: true

module Mutations
  class UserDelete < BaseMutation
    description "Deletes a user by ID"

    field :user, Types::UserType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      user = ::User.find(id)
      raise GraphQL::ExecutionError.new "Error deleting user", extensions: user.errors.to_hash unless user.destroy

      { user: user }
    end
  end
end
