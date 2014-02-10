class Tag < ActiveRecord::Base
    attr_accessible :label

    has_many :special_tags

    has_many :specials, through: :special_tags
end
