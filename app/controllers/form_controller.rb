class FormController < ApplicationController

    def index
        @special_tags = Tag.find_all_by_tag_type('special')
        @event_tags = Tag.find_all_by_tag_type('event')
        @items = Item.all
        @event_types = EventType.all
        @days = Day.all
    end
    
end
