import React from "react"

const QuestionTile = (props) => {
  return(
    <div className="cell">
      <div className="card">
        <div className="card-section">
          <h4 className="text-center">{props.data.title}</h4>
          <p>Status: {props.data.status}</p>
          <p>{props.data.created_at}</p>        
        </div>
      </div>
    </div>
  )
}

export default QuestionTile