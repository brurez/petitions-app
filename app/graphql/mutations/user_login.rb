module Mutations
  class UserLogin < BaseMutation
    description "Login user"

    argument :user_login_input, Types::CredentialsInputType, required: true

    type Types::UserTokenType

    def resolve(user_login_input:)
      user = UserService.get_user_with_password(user_login_input[:email], user_login_input[:password])
      # Build the JWT to be used on the frontend to authenticate with the backend
      token = UserService.generate_token(user)

      { user: user, token: token  }
    end
  end
end
