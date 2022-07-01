class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :comment_text
      t.references :user, null: false, foreign_key: true
      t.references :petition, null: false, foreign_key: true

      t.timestamps
    end
  end
end
