class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.string :item
      t.decimal :price
      t.integer :event_id

      t.timestamps
    end
  end
end
