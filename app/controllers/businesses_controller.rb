class BusinessesController < ApplicationController

    def index
        @businesses = Business.includes({events: [{specials: [:tags, :item]}, :days, :event_type, :tags]}).all
    end
end
