require 'rails_helper'

describe Mutations::VoteCreate, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:another_user) { FactoryBot.create(:user, email: "another@email.com") }
  let(:petition) { FactoryBot.create(:petition, user: user) }
  let(:mutation) do
    <<~GRAPHQL
      mutation($input: VoteCreateInput!){
        voteCreate(input: $input) {
          vote {
            id
          }
        }
      }
    GRAPHQL
  end

  before do
    user
    another_user
    petition
  end

  context 'when vote does not exist' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              voteInput: {
                petitionId: petition.id
              }
            }
        },
        context: { current_user: another_user }
      )
    end

    let(:returned_vote) { request["data"]["voteCreate"]["vote"] }
    let(:created_vote) do
      Vote.find_by(petition: petition, user: another_user)
    end

    it 'creates an vote' do
      expect { request }.to change { Vote.count }.by(1)
    end

    it 'sets correct attributes' do
      request
      expect(created_vote).to have_attributes(
                                user_id: another_user.id,
                                petition_id: petition.id
                              )
    end
  end

  context 'when vote already exist for this petition and user' do
    let(:request) do
      ApplicationSchema.execute(
        mutation,
        variables: {
          input:
            {
              voteInput: {
                petitionId: petition.id
              }
            }
        },
        context: { current_user: another_user }
      )
    end

    before do
      Vote.create!(user: another_user, petition: petition)
    end

    it 'creates an vote' do
      expect { request }.not_to change { Vote.count }
    end
  end
end
