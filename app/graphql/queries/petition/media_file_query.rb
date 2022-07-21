module Queries::Petition::MediaFileQuery
  extend ActiveSupport::Concern

  included do
    field :petition_media_file, Types::Petition::MediaFileType, null: false,
          description: "Get petition media file" do
      argument :id, Integer, required: true
    end
  end

  def petition_media_file(id:)
    petition_media_file = Petition::MediaFile.find(id)
    authorize petition_media_file, :show?
    petition_media_file
  end
end
