class Event < ActiveRecord::Base
  attr_accessible :business_id, :end_time, :friday, :monday, :name, :saturday, :start_time, :sunday, :thursday, :tuesday, :wednesday, :has_tv
end
