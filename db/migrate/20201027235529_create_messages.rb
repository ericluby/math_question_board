class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.belongs_to :user, null: false
      t.belongs_to :question, null:false

      t.text :body
      t.string :image

      t.timestamps null: false
    end
  end
end
