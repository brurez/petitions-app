require 'rails_helper'

describe Queries::PetitionQuery, type: :graphql do
  let(:user) { FactoryBot.create(:user) }
  let(:petition) { FactoryBot.create(:petition, user: user) }
  let(:comment) { FactoryBot.create(:comment, user: user, petition: petition) }
  let(:media_file) { FactoryBot.create(:petition_media_file, petition: petition) }
  let(:vote) { FactoryBot.create(:vote, user: user, petition: petition) }
  let(:query) do
    <<~GRAPHQL
      query{
        petitions {
          id
          title
          description
          numberOfVotes
          user {
            firstName
            lastName
          }
          mediaFiles {
            id
          }
          comments {
            commentText
            user {
              firstName
              lastName
            }
          }
        }
      }
    GRAPHQL
  end

  before do
    user
    petition
    vote
    comment
    media_file
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

    it "has media file" do
      expect(returned_petitions[0]["mediaFiles"][0]).to match(hash_including({
                                                                               "id" => media_file.id
                                                                             }))
    end

    it "has user" do
      expect(returned_petitions[0]["user"]).
        to match(hash_including({
                                  "firstName" => user.first_name,
                                  "lastName" => user.last_name,
                                }))
    end

    it "has comment" do
      expect(returned_petitions[0]["comments"][0]).
        to match(hash_including({
                                  "commentText" => comment.comment_text
                                }))
    end

    it "has comment user name" do
      expect(returned_petitions[0]["comments"][0]["user"]).
        to match(hash_including({
                                  "firstName" => user.first_name,
                                  "lastName" => user.last_name,
                                }))
    end
  end
end
