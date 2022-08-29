class AddUniqueIndexToVotes < ActiveRecord::Migration[7.0]
  def change
    add_index :votes, [:user_id, :petition_id], unique: true
  end
end
