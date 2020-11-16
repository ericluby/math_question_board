import React from "react"
import { Link } from "react-router-dom";

const QuestionTile = (props) => {
  return(
    <div className="cell">
      <Link to={`/classrooms/${props.data.classroom.id}/questions/${props.data.id}`} >
        <div className="card class-tile hover-zoom2 card-section-padding">
          <div className="card-section card-section-padding">
            <h4 className="text-center">{props.data.title}</h4>
            <p>Status: {props.data.status}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default QuestionTile