module Mutations
  class UserLogin < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true


  end
end
