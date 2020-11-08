import React from "react"
import { Link } from "react-router-dom";

const ClassroomTile = (props) => {
  return(
    <Link to={`/classrooms/${props.data.id}`} >
      <div className="card">
        <p>Subject: {props.data.subject}</p>
        <p>Term: {props.data.term}</p>
      </div>
    </Link>
  )
}

export default ClassroomTile