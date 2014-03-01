class SpecialsController < ApplicationController

    def index
        @special_tags = Tag.find_all_by_tag_type('special')
        @event_tags = Tag.find_all_by_tag_type('event')
        @items = Item.all
        @event_types = EventType.all
        @days = Day.all
    end

    def create
        business = params[:business]
        business_attributes = { :google_id => business['id'],
                                :name => business['name'],
                                :address => business['formatted_address'],
                                :phone => business['formatted_phone_number'],
                                :website => business['website'] }
        ActiveRecord::Base.transaction do
            new_business = Business.new(business_attributes)
            @success = new_business.save
            
            event = params[:event]
            new_event = Event.new( :business_id => new_business.id,
                                   :event_type_id => event['event_type']['id'],
                                   :start_time => event['start_time'],
                                   :end_time => event['end_time'] )
            @success = @success && new_event.save
            event['event_tag_ids'].each do |tag_id, value|
                if value
                    event_tag = EventTag.new( :event_id => new_event.id,
                                              :tag_id => tag_id )
                    @success = @success && event_tag.save
                end
            end
            event['day_ids'].each do |day_id, value|
                if value
                    event_day = EventDay.new( :event_id => new_event.id,
                                              :day_id => day_id )
                    @success = @success && event_day.save
                end
            end
            special = params[:special]
            off = special['off'] ? special['off'] : false
            new_special = Special.new( :event_id => new_event.id,
                                       :item_id => special['item']['id'],
                                       :price => special['price'], 
                                       :off => off)
            @success = @success && new_special.save
            special['special_tag_ids'].each do |tag_id, value|
                if value
                    special_tag = SpecialTag.new(:special_id => new_special.id,
                                                 :tag_id => tag_id)
                    @success = @success && special_tag.save
                end
            end
        end
        render :json => (@success) ? params : "error"
    end
end
