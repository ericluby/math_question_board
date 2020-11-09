import React, { useEffect, useState } from "react"

import QuestionIndexContainer from '../question/QuestionIndexContainer'
import AddUserToClassroomForm from './AddUserToClassroomForm'

const ClassroomShowContainer = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`/api/v1/classrooms/${props.match.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      setUsers(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])
  
  const teachers = users.filter(user => user.role === "teacher")
  const TeachersList = teachers.map((userObject, index) => {
    return (
      <li key={index} >{userObject.first_name} {userObject.last_name} </li>
    )
  })

  const students = users.filter(user => user.role === "student")
  const StudentsList = students.map((userObject, index) => {
    return (
      <li key={index} >{userObject.first_name} {userObject.last_name} </li>
    )
  })

  const addnewRoster = (formData) => {
    fetch("/api/v1/rosters", {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'same-origin',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      setUsers([...users, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <div className="grid-x page">
      <div className="cell medium-3 secondary">
        <ul className="light-text">
          Teachers:
          {TeachersList}
        </ul>
        <ul className="light-text">
          Students:
          {StudentsList}
        </ul>
        <div>
          <AddUserToClassroomForm
            addnewRoster={addnewRoster}
            classroomId={props.match.params.id}
          />
        </div>
      </div>
      <div className="cell medium-9">
        <QuestionIndexContainer/>
      </div>
    </div>
  )
}

export default ClassroomShowContainer