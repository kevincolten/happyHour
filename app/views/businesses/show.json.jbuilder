json.name @business.name
json.address @business.address
json.phone @business.phone
json.website @business.website
json.set! :events do 
    json.array! @business.events do |event|
        json.id event.id
        json.name event.event_type.name
        json.start_time event.start_time.to_time.strftime('%H:%M')
        json.end_time event.end_time.to_time.strftime('%H:%M')
        json.set! :days do
            json.array! event.days.each do |day|
                json.id day.id
                json.name day.name
            end
        end
        json.set! :tags do
            json.array! event.tags do |tag|
                json.id tag.id
                json.label tag.label
            end
        end
        json.set! :specials do
            json.array! event.specials do |special|
                json.item special.item.name
                json.price number_to_currency(special.price.to_f)
                json.set! :tags do
                    json.array! special.tags do |tag|
                        json.id tag.id
                        json.label tag.label
                    end
                end
            end
        end
    end
end