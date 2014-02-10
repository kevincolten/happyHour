class BusinessesController < ApplicationController
    
    require "rest-client"
    require "json"

    before_filter :cor

    def cor
      headers["Access-Control-Allow-Origin"]  = "http://localhost:8000"
      headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
      headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
      head(:ok) if request.request_method == "OPTIONS"
    end

    def index
        nearby_businesses("1221 Barton Hills Dr, Austin, TX  78704")
        @businesses = Business.includes({events: [{specials: [:tags, :item]}, :days, :event_type]}).all
    end

    def nearby_businesses(address)
        address = '1221 Barton Hills Dr, Austin, TX 78704'.split(' ').join('+')
        geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?"
        geocode_url += "address=#{address}&"
        geocode_url += "sensor=false"

        geocode_response = RestClient.get(URI.encode(geocode_url.strip))
        location_hash = JSON.parse(geocode_response)["results"][0]["geometry"]["location"]
        coordinates = "#{location_hash["lat"]},#{location_hash["lng"]}"

        places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        places_url += "key=#{ENV['GOOGLE_PUBLIC_API_KEY']}"
        places_url = [places_url, 
            "location=#{coordinates}",
            "sensor=false",
            "language=en",
            "rankby=distance",
            "types=bar|restaurant|cafe"].join("&")
        places_response = RestClient.get(URI.encode(places_url.strip))
        places_hash = JSON.parse(places_response)
    end

    def show
        render json: Business.find(params[:id])
    end

    def create
        @business = Business.new(params[:business])
        if @business.save
            render json: @business, status: :created, location: @business
        else
            render json: @business.errors, status: :unprocessable_entity
        end
    end

    def update
        @business = Business.find(params[:id])
        if @business.update_attributes(params[:business])
            head :no_content
        else
            render json: @business.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @business = Business.find(params[:id])
        @business.destroy
        head :no_content
    end
end
