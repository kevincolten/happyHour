class EventsController < ApplicationController
    
    def index
        @events = Event.includes(:business, :days, :event_type, :tags, {specials: [:tags, :item]}).all
    end

end
