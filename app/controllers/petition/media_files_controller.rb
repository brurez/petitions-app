class Petition::MediaFilesController < ApplicationController
  # POST /petition/media_files
  def create
    @media_file = Petition::MediaFile.new
    @media_file.file.attach(media_file_params[:file])
    @media_file.save!

    render json: { media_file_id: @media_file.reload.id }, status: 200
  end

  private
    # Only allow a list of trusted parameters through.
    def media_file_params
      params.permit(:file)
    end
end
