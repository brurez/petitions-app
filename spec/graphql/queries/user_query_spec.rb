require 'rails_helper'

describe Queries::UserQuery, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:another_user) { FactoryBot.create(:user, email: "another@email.com") }
  let(:query) do
    <<~GRAPHQL
      query($id: Int!){
        user(id: $id) {
          id
          firstName
          lastName
          email
        }
      }
    GRAPHQL
  end

  context 'when current user is the user' do
    before do
      user
    end

    let(:request) do
      ApplicationSchema.execute(
        query,
        variables: {
          id: user.id
        },
        context: { current_user: user }
      )
    end

    let(:returned_user) { request["data"]["user"] }

    it 'gets the correct user' do
      expect(returned_user).to match(hash_including(
                                       "id" => user.id,
                                       "firstName" => user.first_name,
                                       "lastName" => user.last_name,
                                       "email" => user.email
                                     ))
    end
  end

  context 'when current user is different' do
    before do
      user
    end

    let(:request) do
      ApplicationSchema.execute(
        query,
        variables: {
          id: user.id
        },
        context: { current_user: another_user }
      )
    end

    let(:returned_error_message) {request["errors"][0]["message"] }

    it 'returns an error message' do
      expect(returned_error_message).to eq("Unauthorized")
    end
  end
end
