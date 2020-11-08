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

u2 = User.new(first_name: "Nathan", last_name: "Jones", email: "njones@fake.com", is_admin: false)
u2.password =  "1234567"
u2.save

u3 = User.new(first_name: "Tom", last_name: "Smith", email: "tsmith@fake.com", is_admin: false)
u3.password =  "1234567"
u3.save

u4 = User.new(first_name: "Jacob", last_name: "Marley", email: "jmarley@fake.com", is_admin: false)
u4.password =  "1234567"
u4.save

u5 = User.create(email: "banana@gmail.com", password: "123456", first_name: "Nick", last_name: "banana", is_admin: false)
u6 = User.create(email: "fake@fake.com", password: "123456", first_name: "faker", last_name: "baker", is_admin: false)

# classrooms
Classroom.destroy_all
cr1 = Classroom.create(subject: "6th grade math", term: "2020-2021")
cr2 = Classroom.create(subject: "8th grade math", term: "2020-2021")

# rosters
Roster.destroy_all
r1 = Roster.create(user: u1, classroom: cr1, role: "teacher")
r1 = Roster.create(user: u2, classroom: cr1, role: "student")
r1 = Roster.create(user: u3, classroom: cr1, role: "student")
r1 = Roster.create(user: u4, classroom: cr1, role: "tutor")
r1 = Roster.create(user: u4, classroom: cr2, role: "student")

# questions
Question.destroy_all
q1 = Question.create(user: u1, classroom: cr1, status: "new", title: "distributive property")
q2 = Question.create(user: u2, classroom: cr1, status: "new", title: "triangle area")

# messages
Message.destroy_all
m1 = Message.create(user: u1, question: q1, body: "greetings!")
m2 = Message.create(user: u2, question: q1, body: "hello!")
m3 = Message.create(user: u1, question: q1, body: "how can i help?")
m4 = Message.create(user: u2, question: q2, body: "yoyo!")
m5 = Message.create(user: u1, question: q2, body: "whatsup!!")
