import React, { useState } from "react"

const ClassroomFormContainer = (props) => {
  const [newClassroom, setNewClassroom] = useState({
    subject: "",
    term: ""
  })

  const handleChange = (event) => {
    setNewClassroom({
      ...newClassroom,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // add a function here to persist the classroom
    props.addNewClassroom(newClassroom)
    setNewClassroom({
      subject: "",
      term: ""
    })
  }

  return(
    <div className="dark-text">
      <p className="dark-text">Create a New Classroom Below</p>
      <form onSubmit={handleSubmit} >
        <label>
          Classroom Subject:
          <input
            name="subject"
            id="subject"
            type="text"
            placeholder="6th grade math"
            onChange={handleChange}
            value={newClassroom.subject}
          />
        </label>
        <label>
        Classroom Term:
          <input
            name="term"
            id="term"
            type="text"
            placeholder="2020-2021"
            onChange={handleChange}
            value={newClassroom.term}
          />
        </label>
        <div className="center-text">
          <input
            className="button light-text large hover-zoom2"
            type="submit" 
            value="Create New Classroom" 
          />
        </div>
      </form>
    </div>
  )
}

export default ClassroomFormContainer