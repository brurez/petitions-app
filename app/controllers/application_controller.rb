class ApplicationController < ActionController::API
  include Pundit::Authorization

  # returns the current user based on the content of the JSON Web Token
  def current_user
    UserService.get_user_by_token(token)
  end

  # gets the JSON Web Token from the Authorization header in the HTTP request
  def token
    request.headers["Authorization"].to_s.split(" ").last
  end
end
