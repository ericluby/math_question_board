import React, { useEffect, useState } from "react"

import QuestionIndexContainer from '../question/QuestionIndexContainer'
import AddUserToClassroomForm from './AddUserToClassroomForm'

const ClassroomShowContainer = (props) => {
  const [usersWithRoles, setusersWithRoles] = useState([])
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
      setusersWithRoles(body.users_with_role)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])
  
  const teachers = usersWithRoles.filter(user => user.role === "teacher")
  const TeachersList = teachers.map((user, index) => {
    return (
      <li key={index} className="side-bar-names-text light-text ">{user.user.first_name} {user.user.last_name} </li>
    )
  })

  const students = usersWithRoles.filter(user => user.role === "student")
  const StudentsList = students.map((user, index) => {
    return (
      <li key={index} className="side-bar-names-text light-text ">{user.user.first_name} {user.user.last_name} </li>
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
      setusersWithRoles([...usersWithRoles, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <div className="grid-x page">
      <div className="cell medium-3 side-bar-general-background">
        <ul className="no-bullet side-bar-user-background" >
          <p className="light-text side-bar-role-text">
            Teachers:
          </p>
          {TeachersList}
        </ul>
        <ul className="light-text no-bullet side-bar-user-background">
          <p className="side-bar-role-text">
          Students:
          </p>
          {StudentsList}
        </ul>
        <div>
          <AddUserToClassroomForm
            addnewRoster={addnewRoster}
            classroomId={props.match.params.id}
          />
        </div>
      </div>
      <div className="cell medium-9 show-background">
        <QuestionIndexContainer
          classroomId={props.match.params.id}
        />
      </div>
    </div>
  )
}

export default ClassroomShowContainer