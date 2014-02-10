class Day < ActiveRecord::Base
    attr_accessible :name

    has_many :event_days

    has_many :events, through: :event_days
end
