Day.create!(name: "Sun")
Day.create!(name: "Mon")
Day.create!(name: "Tues")
Day.create!(name: "Wed")
Day.create!(name: "Thurs")
Day.create!(name: "Fri")
Day.create!(name: "Sat")

EventType.create!(name: "Happy Hour")

EventType.create!(name: "Brunch")

EventType.create!(name: "Trivia")

Item.create!(name: "beer")

Item.create!(name: "bloody mary")

Item.create!(name: "buffet")

Item.create!(name: "mimosa")

Item.create!(name: "margarita")

Item.create!(name: "shots")

Item.create!(name: "appetizers")

Item.create!(name: "entrees")

Item.create!(name: "trivia")

Tag.create!(label: "domestic", tag_type: "special")

Tag.create!(label: "import", tag_type: "special")

Tag.create!(label: "premium", tag_type: "special")

Tag.create!(label: "glass", tag_type: "special")

Tag.create!(label: "can", tag_type: "special")

Tag.create!(label: "well", tag_type: "special")

Tag.create!(label: "carafe", tag_type: "special")

Tag.create!(label: "pitcher", tag_type: "special")

Tag.create!(label: "tv", tag_type: "event")

Tag.create!(label: "patio", tag_type: "event")

Tag.create!(label: "bar", tag_type: "event")

Tag.create!(label: "pool table", tag_type: "event")

Tag.create!(label: "shuffleboard", tag_type: "event")

Tag.create!(label: "darts", tag_type: "event")

Tag.create!(label: "video games", tag_type: "event")

Tag.create!(label: "karaoke", tag_type: "event")
