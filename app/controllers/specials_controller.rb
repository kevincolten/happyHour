class SpecialsController < ApplicationController

    def index
        render json: Special.find_all_by_business_id(params[:business_id])
    end

    def show
        render json: Special.find(params[:id])
    end

    def create
        @special = Special.new(params[:special])
        if @special.save
            render json: @special, status: :created, location: @special
        else
            render json: @special.errors, status: :unprocessable_entity
        end
     end

    def update
        @special = Special.find(params[:id])
        if @special.update_attributes(params[:special])
            head :no_content
        else
            render json: @special.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @special = Special.find(params[:id])
        @special.destroy
        head :no_content
    end
end
