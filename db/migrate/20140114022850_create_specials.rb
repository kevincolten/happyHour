class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.integer :item_id
      t.decimal :price, :precision => 4, :scale => 2
      t.boolean :off
      t.integer :event_id

      t.timestamps
    end
  end
end
