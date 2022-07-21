class AllowPetitionIdNullOnMediaFile < ActiveRecord::Migration[7.0]
  def change
    change_column_null :petition_media_files, :petition_id, true
  end
end
