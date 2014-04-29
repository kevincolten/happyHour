json.array! @days do |day|
    json.day_name day['day_name']
    json.set! :events do
        json.array! day['events'] do |event|
            json.id             event.id
            json.name           event.event_type.name
            json.start_time     event.start_time.strftime('%H:%M:%S')
            json.end_time       event.end_time.strftime('%H:%M:%S')
            json.start_time_for event.start_time.strftime('%l:%M%P')
            json.end_time_for   event.end_time.strftime('%l:%M%P')

            json.set! :event_tags do 
                json.array! event.tags do |tag|
                    json.id    tag.id
                    json.label tag.label
                end
            end

            json.set! :specials do
                json.array! event.specials do |special|
                    json.id    special.id
                    json.item  special.item.name
                    json.price number_to_currency(special.price.to_f)
                    json.off   special.off

                    json.set! :special_tags do 
                        json.array! special.tags do |tag|
                            json.id    tag.id
                            json.label tag.label
                        end
                    end

                end
            end

            json.business do
                json.id event.business.id
                json.google_id event.business.google_id
                json.name event.business.name
                json.address event.business.address
                json.phone event.business.phone
                json.website event.business.website
                json.latitude event.business.latitude
                json.longitude event.business.longitude
            end
        end
    end
end