# frozen_string_literal: true

module Mutations
  class UserCreate < BaseMutation
    description "Creates a new user"

    argument :user_input, Types::UserInputType, required: true

    type Types::UserTokenType

    def resolve(user_input:)
      user = User.new(**user_input)
      # Raises an error with all validation messages
      raise GraphQL::ExecutionError.new "Invalid input: #{user.errors.full_messages.join(', ')}", extensions: user.errors.to_hash unless user.save
      # Build the JWT to be used on the frontend to authenticate with the backend
      token = UserService.generate_token(user)

      { user: user, token: token  }
    end
  end
end
