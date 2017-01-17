class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.integer :x
      t.integer :y
      t.references :user
      t.references :character

      t.timestamps
    end
  end
end
