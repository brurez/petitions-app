require 'rails_helper'

describe Mutations::PetitionUpdate, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:another_user) { FactoryBot.create(:user, email: "another@email.com") }
  let(:petition) { FactoryBot.create(:petition, user: user) }
  let(:another_petition) { FactoryBot.create(:petition, user: another_user) }
  let(:mutation) do
    <<~GRAPHQL
      mutation($input: PetitionUpdateInput!){
        petitionUpdate(input: $input) {
          petition {
            id
            title
            description
            userId
          }
        }
      }
    GRAPHQL
  end

  context 'when user does not own the petition' do
    before do
      user
      another_user
      another_petition
      request
    end

    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              id: another_petition.id,
              petitionInput: {
                title: "My Title",
                description: "My description...",
              }
            }
        },
        context: { current_user: user }
      )
    end

    let(:returned_error_message) do
      request["errors"][0]["message"]
    end

    it 'returns an error' do
      expect(returned_error_message).to eq("Unauthorized")
    end

    it 'does not create a petition' do
      expect { request }.not_to change { another_petition }
    end
  end

  context 'when petition exist' do
    before do
      user
      petition
      request
    end

    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              id: petition.id,
              petitionInput: {
                title: "My Title",
                description: "My description...",
              }
            }
        },
        context: { current_user: user }
      )
    end

    let(:returned_petition) do
      request["data"]["petitionUpdate"]["petition"]
    end

    it 'sets correct attributes' do
      expect(petition.reload).to have_attributes(
                                   title: "My Title",
                                   description: "My description...",
                                 )
    end

    it 'returns the petition' do
      expect(returned_petition).to match(hash_including(
                                           "id" => petition.id,
                                           "userId" => user.id,
                                           "title" => "My Title",
                                           "description" => "My description...",
                                         ))
    end
  end
end
