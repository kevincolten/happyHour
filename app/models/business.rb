class Business < ActiveRecord::Base
    attr_accessible :name, :address, :city, :state,
                  :zipcode, :phone, :email, :website,
                  :has_tv

    has_many :events

    has_many :specials, through: :events
end
