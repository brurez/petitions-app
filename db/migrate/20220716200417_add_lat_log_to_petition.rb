class AddLatLogToPetition < ActiveRecord::Migration[7.0]
  def change
    add_column :petitions, :latitude, :float, null: false
    add_column :petitions, :longitude, :float, null: false
  end
end
