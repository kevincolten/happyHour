class BusinessesController < ApplicationController
    def index
        render json: Business.all
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
