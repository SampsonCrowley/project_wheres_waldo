# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Character.create(name: "Waldo", x: 1598, y:624, radius: 100)
Character.create(name: "Wenda", x: 1090, y: 579, radius: 90)
Character.create(name: "Odlaw", x: 1128, y: 1062, radius: 100)
Character.create(name: "Whitebeard", x: 2382, y: 1493, radius: 160)
Character.create(name: "Woof", x: 1911, y: 1086, radius: 60)
puts "Characters created"
