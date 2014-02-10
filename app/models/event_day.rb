class EventDay < ActiveRecord::Base
    attr_accessible :day_id, :event_id

    belongs_to :day

    belongs_to :event
end
