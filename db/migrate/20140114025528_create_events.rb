class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :event_type_id
      t.integer :business_id
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
