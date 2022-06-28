# frozen_string_literal: true

module Mutations
  class UserCreate < BaseMutation
    description "Creates a new user"

    field :user, Types::UserType, null: false

    argument :user_input, Types::UserInputType, required: true

    type Types::UserCreateType

    def resolve(user_input:)
      user = User.new(**user_input)
      raise GraphQL::ExecutionError.new "Error creating user", extensions: user.errors.to_hash unless user.save
      token = UserService.generate_token(user)

      { user: user, token: token  }
    end
  end
end
