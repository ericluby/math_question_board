class CreateClassrooms < ActiveRecord::Migration[5.2]
  def change
    create_table :classrooms do |t|
      t.string :subject, null: false
      t.string :term, null: false

      t.timestamps null: false
    end
  end
end
