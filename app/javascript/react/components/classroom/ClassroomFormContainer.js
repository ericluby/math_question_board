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
    <div>
      <p>hello from the classroom form!</p>
      <form onSubmit={handleSubmit} >
        <label>
          Classroom Subject:
          <input
            name="subject"
            id="subject"
            type="text"
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
            onChange={handleChange}
            value={newClassroom.term}
          />
        </label>
        <input
          className="button"
          type="submit" 
          value="Create New Classroom" />
      </form>
    </div>
  )
}

export default ClassroomFormContainer