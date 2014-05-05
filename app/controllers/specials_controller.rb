class SpecialsController < ApplicationController

    def create
        business = params[:business].split("|")
        business_attributes = { :google_id => business[0],
                                :name => business[1],
                                :address => business[2],
                                :phone => business[3],
                                :website => business[4],
                                :latitude => business[5],
                                :longitude => business[6] }
        ActiveRecord::Base.transaction do
            new_business = Business.new(business_attributes)
            @success = new_business.save
            event = params[:event]
            if params[:event_id]
                new_event = {}
                new_event = Event.find(params[:event_id])
            else
                new_event = Event.new( :business_id => new_business.id,
                                       :event_type_id => event['event_type_ids'][0],
                                       :start_time => event['start_time'],
                                       :end_time => event['end_time'] )
                @success = @success && new_event.save
            end
            if event['event_tag_ids']
              event['event_tag_ids'].each do |tag_id|
                  event_tag = EventTag.new( :event_id => new_event.id,
                                            :tag_id => tag_id )
                  @success = @success && event_tag.save
              end
            end
            event['event_day_ids'].each do |day_id|
                event_day = EventDay.new( :event_id => new_event.id,
                                          :day_id => day_id )
                @success = @success && event_day.save
            end
            special = params[:special]
            off = special['off'] ? special['off'] : false
            new_special = Special.new( :event_id => new_event.id,
                                       :item_id => special['item_id'],
                                       :price => special['price'], 
                                       :off => off)
            @success = @success && new_special.save
            if special['special_tag_ids']
              special['special_tag_ids'].each do |tag_id, value|
                  special_tag = SpecialTag.new( :special_id => new_special.id,
                                                :tag_id => tag_id )
                  @success = @success && special_tag.save
              end
            end
        end
        render :json => (@success) ? params : "error"
    end
end
