class SpecialsController < ApplicationController

    def index
        @businesses = nearby_businesses('1221 Barton Hills Dr, Austin, TX  78704')['results']
        @special_tags = Tag.find_all_by_tag_type('special')
        @event_tags = Tag.find_all_by_tag_type('event')
        @items = Item.all
        @event_types = EventType.all
        @days = Day.all
    end

    def create
        business_url = "https://maps.googleapis.com/maps/api/place/details/json?"
        business_url += "key=#{ENV['GOOGLE_PUBLIC_API_KEY']}&"
        business_url += "reference=#{params[:business_reference]}&"
        business_url += "sensor=false"
        business_response = RestClient.get(URI.encode(business_url.strip))
        business_hash = JSON.parse(business_response)['result']
        business_attributes = {:google_id => business_hash['id'],
                               :name => business_hash['name'],
                               :address => business_hash['formatted_address'],
                               :phone => business_hash['formatted_phone_number'],
                               :website => business_hash['website']}
        logger.info(params)
        ActiveRecord::Base.transaction do
            business = Business.new(business_attributes)
            @success = business.save
            event = Event.new(:business_id => business.id,
                              :event_type_id => params[:event_type])
            @success = @success && event.save
            params[:event_tags].each do |tag_id, value|
                logger.info(value)
                if value
                    event_tag = EventTag.new(:event_id => event.id,
                                             :tag_id => tag_id)
                    @success = @success && event_tag.save
                end
            end
            params[:days].each do |day_id, value|
                if value
                    event_day = EventDay.new(:event_id => event.id,
                                             :day_id => day_id)
                    @success = @success && event_day.save
                end
            end
        end
        if @success
            render :json => params
        else
            render :json => "error"
        end
    end
end
