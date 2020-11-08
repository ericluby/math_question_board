# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
u1 = User.create(email: "banana@gmail.com", password: "123456", first_name: "Nick", last_name: "banana", is_admin: false)
u2 = User.create(email: "fake@fake.com", password: "123456", first_name: "faker", last_name: "baker", is_admin: false)

Question.destroy_all
q1 = Question.create(user: u1, status: "new", title: "distributive property")
q2 = Question.create(user: u2, status: "new", title: "triangle area")

Message.destroy_all
m1 = Message.create(user: u1, question: q1, body: "greetings!")
m2 = Message.create(user: u2, question: q1, body: "hello!")
m3 = Message.create(user: u1, question: q1, body: "how can i help?")
m4 = Message.create(user: u2, question: q2, body: "yoyo!")
m5 = Message.create(user: u1, question: q2, body: "whatsup!!")
