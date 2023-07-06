require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(email:'badboys@hotmail.co.uk', password:'helloworld')
item = Item.create(user: User.all.sample, name:'35 ml vodka', category: 'vodka', cost_price:1, sale_price:6)

5.times {
  User.create(email:Faker::Internet.email, password:Faker::TvShows::Simpsons.quote)
}

10.times {
  Item.create(user:User.all.sample, name:Faker::Beer.name, category:'beer', cost_price:Faker::Number.number(digits: 1), sale_price:Faker::Number.number(digits: 1))
}