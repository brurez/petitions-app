module Mutations
  class UserLogin < BaseMutation
    description "Login user"

    field :user, Types::UserType, null: false

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(user_input:)
      user = User.new(**user_input)
      raise GraphQL::ExecutionError.new "Error creating user", extensions: user.errors.to_hash unless user.save
      token = UserService.generate_token(user)

      { user: user, token: token  }
    end
  end
end
