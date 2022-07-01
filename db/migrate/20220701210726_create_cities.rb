class CreateCities < ActiveRecord::Migration[7.0]
  def change
    create_table :cities do |t|
      t.string :name
      t.string :state, limit: 2
      t.string :country_code, limit: 2

      t.timestamps
    end
  end
end
