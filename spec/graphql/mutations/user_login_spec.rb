require 'rails_helper'

describe Mutations::UserLogin do
  let(:email) { "my@email.com" }
  let(:password) { "my-password" }
  let(:user) { FactoryBot.create(:user, email: email, password: password) }

  before do
    user
  end

  let(:mutation) do
    <<~GRAPHQL
      mutation($input: UserLoginInput!){
        userLogin(input: $input) {
          user {
            firstName
            email
          }
          token
        }
      }
    GRAPHQL
  end

  context 'when password is incorrect' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input: {
            userLoginInput: {
              email: email,
              password: 'wrong-password'

            } }
        })
    end

    let(:returned_data) { request["data"]["userLogin"] }
    let(:returned_error) {  request['errors'][0]['message']}

    it 'returns no data' do
      expect(returned_data).to be_nil
    end

    it 'returns error message' do
      expect(returned_error).to eq("The email address and password doesn't match")
    end
  end

  context 'when credentials are correct' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input: {
            userLoginInput: {
              email: email,
              password: password
            } }
        })
    end

    let(:returned_data) { request["data"]["userLogin"] }
    let(:returned_token) { request["data"]["userLogin"]["token"] }

    it 'returns user token' do
      expect(returned_data['token']).not_to be_nil
    end
  end
end
