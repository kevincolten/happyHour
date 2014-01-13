class Business < ActiveRecord::Base
  attr_accessible :address, :city, :email, :name, :phone, :state, :website, :zipcode
end
