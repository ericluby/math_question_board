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
  
   const UsersList = users.map((userObject) => {
      return (
        <li key={userObject.id} >{userObject.id} {userObject.first_name} {userObject.last_name}</li>
      )
   })

  return(
    <div>
      <p>hello from the classroom Show Container</p>
      <ul>
        {UsersList}
      </ul>
    </div>
  )
}

export default ClassroomShowContainer