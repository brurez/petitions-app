class AddAddressToPetition < ActiveRecord::Migration[7.0]
  def change
    add_column :petitions, :address, :string
    add_column :petitions, :city, :string, null: false
    add_column :petitions, :state, :string, limit: 2
    add_column :petitions, :country, :string, null: false, limit: 2
    add_column :petitions, :postal_code, :string
  end
end
