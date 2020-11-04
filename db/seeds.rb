# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# users
User.destroy_all
u1 = User.new(first_name: "Eric", last_name: "Luby", email: "luby@fake.com", is_admin: true)
u1.password =  "1234567"
u1.save

u2 = User.new(first_name: "small", last_name: "student", email: "6th@fake.com", is_admin: false)
u2.password =  "1234567"
u2.save

u3 = User.new(first_name: "tall", last_name: "student", email: "8th@fake.com", is_admin: false)
u3.password =  "1234567"
u3.save

# classrooms
Classroom.destroy_all
cr1 = Classroom.create(subject: "6th grade math", term: "2020-2021")
cr2 = Classroom.create(subject: "8th grade math", term: "2020-2021")

# rosters
Roster.destroy_all
r1 = Roster.create(user: u2, classroom: cr1)