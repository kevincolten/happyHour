Day.create!(name: "Sun")
Day.create!(name: "Mon")
Day.create!(name: "Tues")
Day.create!(name: "Wed")
Day.create!(name: "Thurs")
Day.create!(name: "Fri")
Day.create!(name: "Sat")

# Business.create!(name: "Iron Cactus - Downtown",
#                  address: "606 Trinity St.",
#                  city: "Austin",
#                  state: "TX",
#                  zipcode: 78701,
#                  phone: "(512) 472-9240",
#                  email: "",
#                  website: "http://www.ironcactus.com/austin-downtown")

# Business.create!(name: "Black Sheep Lodge",
#                  address: " 2108 S Lamar Blvd",
#                  city: "Austin",
#                  state: "TX",
#                  zipcode: 78704,
#                  phone: "(512) 707-2744",
#                  email: "",
#                  website: "http://www.blacksheeplodge.com/")

EventType.create!(name: "Happy Hour")

EventType.create!(name: "Brunch")

# Event.create!(event_type_id: 1,
#               start_time: "15:00:00",
#               end_time: "19:30:00",
#               business_id: 2)

# EventDay.create!(event_id: 1,
#                  day_id: 2)
# EventDay.create!(event_id: 1,
#                  day_id: 3)
# EventDay.create!(event_id: 1,
#                  day_id: 4)

# Event.create!(event_type_id: 2,
#               start_time: "10:00:00",
#               end_time: "15:00:00",
#               business_id: 1)

# EventDay.create!(event_id: 2,
#                  day_id: 1)
# EventDay.create!(event_id: 2,
#                  day_id: 7)

# Event.create!(event_type_id: 2,
#               start_time: "10:30:00",
#               end_time: "15:00:00",
#               business_id: 2)

# EventDay.create!(event_id: 3,
#                  day_id: 1)

Item.create!(name: "beer")

Item.create!(name: "bloody mary")

Item.create!(name: "buffet")

Item.create!(name: "mimosa")

Item.create!(name: "margarita")

# Special.create!(item_id: 1,
#                 price: 2.50,
#                 event_id: 1)

# Special.create!(item_id: 1,
#                 price: 3.50,
#                 event_id: 1)

# Special.create!(item_id: 5,
#                 price: 4.00,
#                 event_id: 1)

# Special.create!(item_id: 2,
#                 price: 4.50,
#                 event_id: 2)

# Special.create!(item_id: 2,
#                 price: 4.00,
#                 event_id: 3)

# Special.create!(item_id: 3,
#                 price: 15.00,
#                 event_id: 2)

# Special.create!(item_id: 4,
#                 price: 1.50,
#                 event_id: 2)

# Special.create!(item_id: 4,
#                 price: 7.00,
#                 event_id: 2)

Tag.create!(label: "domestic", tag_type: "special")

Tag.create!(label: "import", tag_type: "special")

Tag.create!(label: "premium", tag_type: "special")

Tag.create!(label: "glass", tag_type: "special")

Tag.create!(label: "can", tag_type: "special")

Tag.create!(label: "carafe", tag_type: "special")

Tag.create!(label: "pitcher", tag_type: "special")

Tag.create!(label: "tv", tag_type: "event")

Tag.create!(label: "patio", tag_type: "event")

Tag.create!(label: "bar", tag_type: "event")

Tag.create!(label: "pool table", tag_type: "event")

Tag.create!(label: "shuffleboard", tag_type: "event")

Tag.create!(label: "darts", tag_type: "event")

Tag.create!(label: "video games", tag_type: "event")



# SpecialTag.create!(special_id: 1,
#                    tag_id: 1)

# SpecialTag.create!(special_id: 1,
#                    tag_id: 5)

# SpecialTag.create!(special_id: 2,
#                    tag_id: 2)

# SpecialTag.create!(special_id: 2,
#                    tag_id: 3)

# SpecialTag.create!(special_id: 7,
#                    tag_id: 4)

# SpecialTag.create!(special_id: 8,
#                    tag_id: 6)
