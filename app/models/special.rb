class Special < ActiveRecord::Base
    attr_accessible :item_id, :price, :event_id

    belongs_to :event

    has_many :special_tags

    belongs_to :item

    has_many :tags, through: :special_tags
end
