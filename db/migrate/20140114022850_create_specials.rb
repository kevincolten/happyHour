class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.string :item_id
      t.decimal :price, :precision => 4, :scale => 2
      t.integer :event_id

      t.timestamps
    end
  end
end
