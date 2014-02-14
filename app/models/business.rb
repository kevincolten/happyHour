class Business < ActiveRecord::Base
    attr_accessible :name, :address, :phone, :website, :google_id
    has_many :events

    has_many :specials, through: :events
end
