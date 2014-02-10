class CreateSpecialTags < ActiveRecord::Migration
  def change
    create_table :special_tags do |t|
      t.integer :special_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
