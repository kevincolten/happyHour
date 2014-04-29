class DaysController < ApplicationController

	def index
	    @events = Event.includes(:business, :days, :event_type, :tags, {specials: [:tags, :item]}).all
	    Day.all.each do |day|
	        day_events = @events.select do |event|
	            event.days.any? do |event_day|
	                event_day.name == day.name
	            end
	        end
	        instance_variable_set("@#{day.name.downcase}_events", day_events)
	    end
	    @days = [{ "day_name" => "Sunday", "events" => @sun_events },
	             { "day_name" => "Monday", "events" => @mon_events },
	             { "day_name" => "Tuesday", "events" => @tues_events },
	             { "day_name" => "Wednesday", "events" => @wed_events },
	             { "day_name" => "Thursday", "events" => @thurs_events },
	             { "day_name" => "Friday", "events" => @fri_events },
	             { "day_name" => "Saturday", "events" => @sat_events }]
	end
	
end
