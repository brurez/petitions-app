# Service responsible to handle Json Web Tokens
class JwtService
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  class << self
    # Creates an JWT from the given payload
    def encode(payload)
      JWT.encode(payload, SECRET_KEY)
    end

    # Returns the payload from the JWT
    def decode(token)
      decoded = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new decoded
    end

    # Builds the payload hash
    def build_payload(user_id)
      {
        sub: user_id,
        exp:  24.hours.from_now.to_i
      }
    end
  end
end
