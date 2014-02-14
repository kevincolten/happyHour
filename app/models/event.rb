class Event < ActiveRecord::Base
    attr_accessible :event_type_id, :business_id, :start_time, :end_time

    belongs_to :business

    has_many :specials

    belongs_to :event_type

    has_many :event_days

    has_many :days, through: :event_days

    has_many :event_tags

    has_many :tags, through: :event_tags
end