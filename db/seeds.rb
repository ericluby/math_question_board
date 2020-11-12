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

u5 = User.create(email: "banana@gmail.com", password: "123456", first_name: "Nick", last_name: "Banana", is_admin: false)
u6 = User.create(email: "fake@fake.com", password: "123456", first_name: "Faker", last_name: "Baker", is_admin: false)
u7 = User.create(email: "fang@example.com", password: "123456", first_name: "Fang", last_name: "Unicorn", is_admin: false)
u8 = User.create(email: "keen@example.com", password: "123456", first_name: "Dova", last_name: "Cat", is_admin: false)

# classrooms
Classroom.destroy_all
cr1 = Classroom.create(subject: "5th grade math", term: "2020-2021")
cr2 = Classroom.create(subject: "6th grade math", term: "2020-2021")
cr3 = Classroom.create(subject: "7th grade math", term: "2020-2021")
cr4 = Classroom.create(subject: "8th grade math", term: "2020-2021")
cr5 = Classroom.create(subject: "Geometry", term: "Fall 2020")
cr6 = Classroom.create(subject: "Algebra", term: "Fall 2020")
cr7 = Classroom.create(subject: "Trigonometry", term: "Fall 2020")
cr8 = Classroom.create(subject: "Calculus", term: "Fall 2020")
cr9 = Classroom.create(subject: "Geometry", term: "Spring 2021")
cr10 = Classroom.create(subject: "Algebra", term: "Spring 2021")
cr11 = Classroom.create(subject: "Trigonometry", term: "Spring 2021")
cr12 = Classroom.create(subject: "Calculus", term: "Spring 2021")

# rosters
Roster.destroy_all
r1 = Roster.create(user: u5, classroom: cr2, role: "student")
r2 = Roster.create(user: u1, classroom: cr2, role: "student")
r3 = Roster.create(user: u2, classroom: cr2, role: "student")
r4 = Roster.create(user: u3, classroom: cr2, role: "student")
r5 = Roster.create(user: u4, classroom: cr2, role: "student")
r6 = Roster.create(user: u6, classroom: cr2, role: "student")
r7 = Roster.create(user: u7, classroom: cr2, role: "teacher")
r8 = Roster.create(user: u8, classroom: cr2, role: "teacher")

r9 = Roster.create(user: u5, classroom: cr4, role: "teacher")
r10 = Roster.create(user: u1, classroom: cr4, role: "teacher")
r11 = Roster.create(user: u2, classroom: cr4, role: "student")
r12 = Roster.create(user: u3, classroom: cr4, role: "student")
r13 = Roster.create(user: u4, classroom: cr4, role: "student")
r14 = Roster.create(user: u6, classroom: cr4, role: "student")
r15 = Roster.create(user: u7, classroom: cr4, role: "student")
r16 = Roster.create(user: u8, classroom: cr4, role: "student")

# questions
Question.destroy_all
q1 = Question.create(user: u1, classroom: cr2, status: "new", title: "distributive property")
q2 = Question.create(user: u2, classroom: cr2, status: "new", title: "triangle area")

# messages
Message.destroy_all
m1 = Message.create(user: u1, question: q1, body: "Greetings!")
m2 = Message.create(user: u2, question: q1, body: "Hello!")
m3 = Message.create(user: u1, question: q1, body: "How can I help you?")
m4 = Message.create(user: u1, question: q1, body: "I forget what gets distributed")
m5 = Message.create(user: u2, question: q2, body: "Yoyo!")
m6 = Message.create(user: u1, question: q2, body: "whatsup!")
m7 = Message.create(user: u1, question: q2, body: "How do I find the area of a triangle again? I forgot the formula")
