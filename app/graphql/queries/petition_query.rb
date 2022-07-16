module Queries::PetitionQuery
  extend ActiveSupport::Concern

  included do
    field :petition, Types::PetitionType, null: false,
          description: "Get petition" do
      argument :id, Integer, required: true
    end

    field :petitions, [Types::PetitionType], null: false,
          description: "Get petitions list" do
    end
  end

  def petition(id:)
    petition = Petition.find(id)
    authorize petition, :show?
    petition
  end

  def petitions
    petitions = Petition.all
    authorize petitions, :show?
    petitions
  end
end
