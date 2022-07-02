require 'rails_helper'

describe Mutations::PetitionCreate, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:city) { FactoryBot.create(:city) }
  let(:mutation) do
    <<~GRAPHQL
      mutation($input: PetitionCreateInput!){
        petitionCreate(input: $input) {
          petition {
            id
            title
            description
            userId
            cityId
          }
        }
      }
    GRAPHQL
  end

  context 'when petition does not exist' do
    before do
      user
      city
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
                userId: user.id,
                cityId: city.id,
              }
            }
        })
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
                                    user_id: user.id,
                                    city_id: city.id,
                                  )
    end
  end
end
