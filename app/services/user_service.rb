class UserService
  class << self
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
