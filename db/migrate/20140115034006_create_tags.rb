class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label
      t.string :tag_type

      t.timestamps
    end
  end
end
