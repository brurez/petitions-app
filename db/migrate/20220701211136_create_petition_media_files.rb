class CreatePetitionMediaFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :petition_media_files do |t|
      t.string :title
      t.references :petition, null: false, foreign_key: true

      t.timestamps
    end
  end
end
