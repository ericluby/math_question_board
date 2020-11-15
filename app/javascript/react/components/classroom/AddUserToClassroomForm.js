import React, { useState } from "react"

const AddUserToClassroomForm = (props) => {
  const [newRoster, setNewRoster] = useState({
    email: "",
    role: "",
    classroomId: props.classroomId
  })


  const handleChange = (event) => {
    setNewRoster({
      ...newRoster,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // add a function here to persist the the user to the classroom
      // find user based on email
      // check if user is already part of classroom roster
        // if yes maybe return some error or message stating so
        // if no, create roster with classroom, user, and role
      // if there is no user by that email return some error 

    props.addnewRoster(newRoster)

    setNewRoster({
      email: "",
      role: "",
      classroomId: props.classroomId
    })
  }

  return(
    <div>
      <p className="dark-text classroom-creation-form">Add new users to the classroom!</p>
      <form onSubmit={handleSubmit} >
        <label className="dark-text">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
            onChange={handleChange}
            value={newRoster.email}
          />
        </label>

        <fieldset className="center-text">
          <input onChange={handleChange} type="radio" name="role" value="teacher" id="teacher" required/><label htmlFor="teacher" className="dark-text">Teacher</label>
          <input onChange={handleChange} type="radio" name="role" value="student" id="student"/><label htmlFor="student"className="dark-text">Student</label>
          <input onChange={handleChange} type="radio" name="role" value="tutor" id="tutor"/><label htmlFor="tutor"className="dark-text">Tutor</label>
        </fieldset>
        <div className="center-text">
          <input
            className="button light-text large"
            type="submit" 
            value="Add User" 
          />
        </div>
      </form>
    </div>
  )
}

export default AddUserToClassroomForm