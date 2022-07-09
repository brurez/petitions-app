require 'rails_helper'

describe Mutations::UserCreate, type: :graphql do
  let(:mutation) do
    <<~GRAPHQL
      mutation($input: UserCreateInput!){
        userCreate(input: $input) {
          user {
            email
          }
          token
        }
      }
    GRAPHQL
  end

  context 'when user does not exist' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              userInput: {
                email: 'bruno@email.com',
                firstName: 'Bruno',
                lastName: 'de Rezende',
                password: '1234'
              }
            }
        })
    end

    let(:returned_user) { request["data"]["userCreate"]["user"] }
    let(:returned_token) { request["data"]["userCreate"]["token"] }
    let(:created_user) do
      email = returned_user["email"]
      User.find_by(email: email)
    end

    it 'creates an user' do
      expect { request }.to change { User.count }.by(1)
    end

    it 'sets correct attributes' do
      expect(created_user).to have_attributes(
                        email: returned_user["email"],
                        first_name: 'Bruno',
                        last_name: 'de Rezende'
                      )
    end

    it 'creates a password digest' do
      expect(created_user.password_digest.size).to be(60)
    end

    it 'returns Json Web Token' do
      expect(returned_token).to_not be_nil
    end
  end
end
