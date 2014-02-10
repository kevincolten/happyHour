class SpecialTag < ActiveRecord::Base
    attr_accessible :special_id, :tag_id

    belongs_to :special

    belongs_to :tag
end
