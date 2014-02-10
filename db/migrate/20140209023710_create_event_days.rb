class CreateEventDays < ActiveRecord::Migration
  def change
    create_table :event_days do |t|
      t.integer :event_id
      t.integer :day_id

      t.timestamps
    end
  end
end
