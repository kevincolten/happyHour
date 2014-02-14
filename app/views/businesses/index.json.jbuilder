json.array! @businesses do |business|
    json.name business.name
    json.address business.address
    json.phone business.phone
    json.website business.website
    json.set! :events do 
        json.array! business.events do |event|
            json.name event.event_type.name
            json.start_time event.start_time
            json.end_time event.end_time
            json.days event.days.map { |day| day.name }.join(", ")
            json.set! :specials do
                json.array! event.specials do |special|
                    json.item special.item.name
                    json.price number_to_currency(special.price.to_f)
                    if special.tags.length > 0
                        json.tags " (#{special.tags.map { |tag| tag.label }.join(", ")})"
                    end
                end
            end
        end
    end
end