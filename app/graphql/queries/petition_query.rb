module Queries::PetitionQuery
  extend ActiveSupport::Concern

  included do
    field :petition, Types::PetitionType, null: false,
          description: "Get petition" do
      argument :id, Integer, required: true
    end

    field :petitions, [Types::PetitionType], null: false,
          description: "Get petitions list" do
      argument :search, String, required: false
      argument :limit, Integer, required: false, default_value: 4
      argument :offset, Integer, required: false, default_value: 0
      argument :region, Types::RegionInputType, required: false
      argument :user_id, Types::ID, required: false
    end
  end

  def petition(id:)
    petition = Petition.includes(:media_files, :comments, :user).find(id)
    authorize petition, :show?
    petition
  end

  def petitions(search: nil, limit: 4, offset: 0, region: nil, user_id: nil)
    petitions = PetitionService.search(search_text: search,
                                       latitude: region&.latitude,
                                       longitude: region&.longitude,
                                       radius: region&.radius,
                                       limit: limit,
                                       offset: offset,
                                       user_id: user_id)

    authorize petitions, :show?
    petitions
  end
end
