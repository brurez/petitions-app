class ApplicationController < ActionController::API
  include Pundit::Authorization

  after_action :verify_authorized

  def context
    {
      current_user: UserService.get_user_by_token(token)
    }
  end

  def token
    request.headers["Authorization"].to_s.split(" ").last
  end
end
