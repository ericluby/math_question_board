import React from "react"
import { Link } from "react-router-dom";

const ClassroomTile = (props) => {
  return(
    <div className="cell">
        <Link to={`/classrooms/${props.data.id}`} >
          <div className="card class-tile hover-zoom">
            <p>{props.data.subject}</p>
            <p><b>Term:</b> {props.data.term}</p>
          </div>
      </Link>
    </div>
  )
}

export default ClassroomTile