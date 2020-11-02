import React from "react"

const QuestionTile = (props) => {
  return(
    <div>
      <p>Title: {props.data.title}</p>
      <p>Status: {props.data.status}</p>
      <p>Created: {props.data.created_at}</p>
    </div>
  )
}

export default QuestionTile