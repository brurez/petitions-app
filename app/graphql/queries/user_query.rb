module Queries::UserQuery
  extend ActiveSupport::Concern

  included do
    field :user, Types::UserType, null: false,
          description: "Get user" do
      argument :id, Integer, required: true
    end
  end

  def user(id:)
    user = User.find(id)
    authorize user, :show?
    user
  end
end
