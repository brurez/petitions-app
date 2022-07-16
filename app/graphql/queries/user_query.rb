module Queries::UserQuery
  extend ActiveSupport::Concern

  # fields included in the User GraphQL query
  included do
    field :user, Types::UserType, null: false,
          description: "Get user" do
      argument :id, Integer, required: true
    end
  end

  def user(id:)
    # throws an exception if the user is not logged in
    authenticated?
    # finds the user with corresponding id
    user = User.find(id)
    # uses Pundit User policy to check if the current user can access this User record
    authorize user, :show?
    user
  end
end
