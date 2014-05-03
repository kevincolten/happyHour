class EventsController < ApplicationController
    
    def index
        @events = Event.includes(:business, :days, :event_type, :tags, {specials: [:tags, :item]})
        @events = @events.where event_type_id: params['event_type_id'] if params['event_type_id']
    end
end
