import React, { useEffect, useState } from "react"

import QuestionIndexContainer from '../question/QuestionIndexContainer'

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
  
  // const UsersList = users.map((userObject, index) => {
  //   debugger
  //     return (
  //       <li key={index} >{userObject.role}: {userObject.first_name} {userObject.last_name} </li>
  //     )
  // })

  const teachers = users.filter(user => user.role === "teacher")
  const TeachersList = teachers.map((userObject, index) => {
    return (
      <li key={index} >{userObject.role}: {userObject.first_name} {userObject.last_name} </li>
    )
  })

  const students = users.filter(user => user.role === "student")
  const StudentsList = students.map((userObject, index) => {
    return (
      <li key={index} >{userObject.role}: {userObject.first_name} {userObject.last_name} </li>
    )
  })

  return(
    <div className="grid-x page">
      <div className="cell medium-3 secondary">
        <ul className="light-text">
          {TeachersList}
        </ul>
        <ul className="light-text">
          {StudentsList}
        </ul>
      </div>
      <div className="cell medium-9">
        <QuestionIndexContainer/>
      </div>
    </div>
  )
}

export default ClassroomShowContainer