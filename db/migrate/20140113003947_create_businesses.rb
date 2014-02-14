class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :google_id
      t.string :name
      t.string :address
      t.string :website
      t.string :phone
      
      t.timestamps
    end
  end
end
