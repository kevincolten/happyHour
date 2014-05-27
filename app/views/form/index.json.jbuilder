json.set! :special_tags do
    json.array! @special_tags do |tag|
        json.label tag.label
        json.id tag.id
    end
end

json.set! :event_tags do
    json.array! @event_tags do |tag|
        json.label tag.label
        json.id tag.id
    end
end

json.set! :items do
    json.array! @items do |item|
        json.name item.name
        json.id item.id
    end
end

json.set! :event_types do
    json.array! @event_types do |type|
        json.name type.name
        json.id type.id
    end
end

json.set! :days do
    json.array! @days do |day|
        json.name day.name
        json.id day.id
    end
end