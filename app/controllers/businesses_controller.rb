class BusinessesController < ApplicationController

    def index
        @businesses = Business.includes({events: [{specials: [:tags, :item]}, :days, :event_type, :tags]}).all
    end

    def show
        @business = Business.includes({events: [{specials: [:tags, :item]}, :days, :event_type, :tags]})
                            .find_by_google_id(params[:id])
        if @business
            render 'businesses/show.json'
        else
            render :json => "{}"
        end
    end
end
