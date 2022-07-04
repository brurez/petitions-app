require 'rails_helper'

describe Mutations::PetitionCreate, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:mutation) do
    <<~GRAPHQL
      mutation($input: PetitionCreateInput!){
        petitionCreate(input: $input) {
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

  context 'when user is not logged in' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              petitionInput: {
                title: "My Title",
                description: "My description...",
              }
            }
        }
      )
    end

    let(:returned_error_message) do
      request["errors"][0]["message"]
    end

    it 'returns an error' do
      expect(returned_error_message).to eq("You must be logged in")
    end

    it 'does not create a petition' do
      expect { request }.not_to change { Petition.count }
    end
  end

  context 'when petition does not exist' do
    before do
      user
    end

    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
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
      request["data"]["petitionCreate"]["petition"]
    end

    let(:created_petition) do
      id = returned_petition["id"]
      Petition.find(id)
    end

    it 'creates an petition' do
      expect { request }.to change { Petition.count }.by(1)
    end

    it 'sets correct attributes' do
      expect(created_petition).to have_attributes(
                                    title: "My Title",
                                    description: "My description...",
                                  )
    end
  end
end
