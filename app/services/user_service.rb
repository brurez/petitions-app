class UserService
  class << self
    def get_user_with_password(email, password)
      user = User.find_by(email: email)
      is_correct_password = user.authenticate(password)
      return nil, :incorrect_password unless is_correct_password

      [user, "Ok"]
    end

    def get_user_by_token(token)
      return nil if token.nil?
      begin
        payload = JwtService.decode(token)
      rescue
        return nil
      end
      User.find_by!(email: payload["sub"])
    end

    def generate_token(user)
      payload = JwtService.build_payload(user.email)
      JwtService.encode(payload)
    end
  end
end
