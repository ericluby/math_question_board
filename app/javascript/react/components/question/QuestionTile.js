import React from "react"
import { Link } from "react-router-dom";

const QuestionTile = (props) => {
  return(
    <div className="cell">
      <Link to={`/chats/${props.data.id}`} >
        <div className="card">
          <div className="card-section">
            <h4 className="text-center">{props.data.title}</h4>
            <p>Status: {props.data.status}</p>
            <p>{props.data.created_at}</p>        
          </div>
        </div>
      </Link>
    </div>
  )
}

export default QuestionTile