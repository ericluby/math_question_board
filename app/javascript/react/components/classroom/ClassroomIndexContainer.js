import React, { useEffect, useState } from "react"

import ClassroomTile from "./ClassroomTile"
import ClassroomFormContainer from "./ClassroomFormContainer"

const ClassroomIndexContainer = (props) => {
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    fetch("/api/v1/classrooms")
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
      setClassrooms(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const ClassroomList = classrooms.map((classroomObject) => {
    return (
    <ClassroomTile 
      key={classroomObject.id}
      data={classroomObject}
    />
    )
  })

  return(
    <div>
      <p>hello from the classroom Index Container.  Scroll down to choose a class or create one.</p>
      {ClassroomList}
      <ClassroomFormContainer/>
    </div>
  )
}

export default ClassroomIndexContainer