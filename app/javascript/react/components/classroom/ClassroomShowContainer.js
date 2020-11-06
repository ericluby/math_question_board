import React, { useEffect, useState } from "react"

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
    <div>
      <p>hello from the classroom Show Container</p>
      <ul>
        {TeachersList}
      </ul>
      <ul>
        {StudentsList}
      </ul>
    </div>
  )
}

export default ClassroomShowContainer