class UserService
  class << self
    def get_user_with_password(email, password)
      user = User.find_by(email: email)
      if user.nil?
        raise ApplicationError, "The email address and password doesn't match"
      end
      is_correct_password = user.authenticate(password)
      unless is_correct_password
        raise ApplicationError, "The email address and password doesn't match"
      end

      user
    end

    def get_user_by_token(token)
      return nil if token.nil?
      begin
        payload = JwtService.decode(token)
      rescue
        return nil
      end
      User.find(payload["sub"])
    end

    def generate_token(user)
      payload = JwtService.build_payload(user.id)
      JwtService.encode(payload)
    end
  end
end
