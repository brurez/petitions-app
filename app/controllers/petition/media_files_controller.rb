class Petition::MediaFilesController < ApplicationController
  # POST /petition/media_files
  def create
    @petition_media_file = Petition::MediaFile.new
    @petition_media_file.file.attach(petition_media_file_params[:file])
    @petition_media_file.save!

    render json: { media_file_id: @petition_media_file.reload.id }, status: 200
  end

  private
    # Only allow a list of trusted parameters through.
    def petition_media_file_params
      params.permit(:file, :petition_id)
    end
end
