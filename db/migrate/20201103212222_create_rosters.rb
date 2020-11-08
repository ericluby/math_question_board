class CreateRosters < ActiveRecord::Migration[5.2]
  def change
    create_table :rosters do |t|
      t.belongs_to :user, null: false
      t.belongs_to :classroom, null: false

      t.string :role, null: false

      t.timestamps null: false
    end
  end
end
