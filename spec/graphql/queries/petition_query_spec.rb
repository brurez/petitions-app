require 'rails_helper'

describe Queries::PetitionQuery, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:petition) { FactoryBot.create(:petition, user: user) }
  let(:vote) { FactoryBot.create(:vote, user: user, petition: petition) }
  let(:query) do
    <<~GRAPHQL
      query{
        petitions {
          id
          title
          description
          numberOfVotes
        }
      }
    GRAPHQL
  end

  before do
    user
    petition
    vote
  end

  context "getting petitions" do
    let(:request) do
      ApplicationSchema.execute(
        query,
        variables: {},
        context: { current_user: user }
      )
    end

    let(:returned_petitions) { request["data"]["petitions"] }

    it "returns all petitions" do
      expect(returned_petitions[0]).to match(hash_including({
                                                              "title" => petition.title,
                                                              "description" => petition.description,
                                                              "numberOfVotes" => 1,
                                                            }))
    end
  end
end
