class Event < ActiveRecord::Base
    attr_accessible :event_type_id, :business_id, :start_time, :end_time

    belongs_to :business

    has_many :specials

    belongs_to :event_type

    has_many :event_days

    has_many :days, through: :event_days

    has_many :event_tags

    has_many :tags, through: :event_tags

    def now
        start_time = Time.at(self.start_time.hour * 60 * 60 + self.start_time.min * 60 + self.start_time.sec)
        end_time = Time.at(self.end_time.hour * 60 * 60 + self.end_time.min * 60 + self.end_time.sec)
        now_time = Time.at(Time.now.hour * 60 * 60 + Time.now.min * 60 + Time.now.sec)
        return start_time < now_time && now_time < end_time
    end
end