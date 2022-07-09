module Auth
  extend ActiveSupport::Concern

  include Pundit::Authorization

  def current_user
    context[:current_user]
  end

  def authenticated?
    return true if current_user

    raise GraphQL::ExecutionError.new("You must be logged in", options: { status: :unauthorized, code: 401 })
  end
end
