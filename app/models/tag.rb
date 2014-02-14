class Tag < ActiveRecord::Base
    attr_accessible :label, :tag_type

    has_many :special_tags

    has_many :specials, through: :special_tags

    has_many :event_tags

    has_many :events, through: :event_tags
end
