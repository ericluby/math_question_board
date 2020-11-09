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

  const addNewClassroom = (formData) => {
    fetch("/api/v1/classrooms", {
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
      // currently not hitting this debugger
      setClassrooms([...classrooms, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <div className="grid-container page">
      <p className="text-center">Select your classroom below</p>
      <div className="grid-x grid-margin-x small-up-2 medium-up-3">
        {ClassroomList}
      </div>
      <div className="grid-x grid-margin-x align-center">
        <ClassroomFormContainer 
          addNewClassroom={addNewClassroom}
        />
      </div>
    </div>
  )
}

export default ClassroomIndexContainer