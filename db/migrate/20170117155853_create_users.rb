class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :initials
      t.string :highscore

      t.timestamps
    end
  end
end
