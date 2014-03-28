class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :google_id
      t.string :name
      t.string :address
      t.string :website
      t.string :phone
      t.decimal :latitude, precision: 8, scale: 6
      t.decimal :longitude, precision: 8, scale: 6
      
      t.timestamps
    end
  end
end
