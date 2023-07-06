class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :category
      t.integer :cost_price
      t.integer :sale_price
      t.timestamps
    end
  end
end
