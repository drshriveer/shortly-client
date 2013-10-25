class AddLastVisited < ActiveRecord::Migration
  def up
    add_column :links, :last_visited, :datetime
  end

  def down
    remove_column :links, :last_visited
  end
end
