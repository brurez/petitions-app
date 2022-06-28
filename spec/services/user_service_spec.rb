require 'rails_helper'

describe UserService do
  let(:email) { "my@email.com" }
  let(:password) { "my-password" }
  let(:user) { FactoryBot.create(:user, email: email, password: password) }

  before do
    user
  end

  describe '#get_user_with_password' do
    it 'returns user when password is correct' do
      returned_user, = UserService.get_user_with_password(email, password)
      expect(returned_user).to eq(user)
    end

    it 'returns nil when password is incorrect' do
      returned_user, = UserService.get_user_with_password(email, "incorrect-password")
      expect(returned_user).to eq(nil)
    end
  end
end
