class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.belongs_to :user, null: false

      t.string :status, null: false
      t.string :title, null: false

      t.timestamps null: false
    end
  end
end
