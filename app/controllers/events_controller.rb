class EventsController < ApplicationController
    def index
        render json: Event.all
    end

    def show
        render json: Event.find(params[:id])
    end

    def create
        @event = Event.new(params[:event])
        if @event.save
            render json: @event, status: :created, location: @event
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    def update
        @event = Event.find(params[:id])
        if @event.update_attributes(params[:event])
            head :no_content
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy
        head :no_content
    end
end
