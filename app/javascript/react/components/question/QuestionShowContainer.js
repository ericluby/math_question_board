import React from "react"

import ChatContainer from './ChatContainer'

const QuestionShowContainer = (props) => {
  debugger
  return(
    <div>
      <ChatContainer
        classroomId = {props.match.params.classroom_id}
        questionId = {props.match.params.question_id}
        />
    </div>
  )
}

export default QuestionShowContainer