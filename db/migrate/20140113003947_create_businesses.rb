class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.integer :zipcode
      t.string :phone
      t.string :email
      t.string :website
      t.boolean :has_tv

      t.timestamps
    end
  end
end
