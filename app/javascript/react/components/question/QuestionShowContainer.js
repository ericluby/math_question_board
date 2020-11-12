import React, { useState } from 'react'

import ChatContainer from './ChatContainer'

const QuestionShowContainer = (props) => {
  
  return(
    <div className="page">
      <ChatContainer
        classroomId = {props.match.params.classroom_id}
        questionId = {props.match.params.question_id}
        />
    </div>
  )
}

export default QuestionShowContainer