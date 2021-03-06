import React, { useState, useEffect } from "react"

import QuestionFormContainer from './QuestionFormContainer'
import QuestionTile from './QuestionTile'

const QuestionIndexContainer = (props) => {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch(`/api/v1/classrooms/${props.classroomId}/questions`)
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
      setQuestions(body);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const addNewQuestion = (formData) => {
    fetch(`/api/v1/classrooms/${props.classroomId}/questions`, {
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
      setQuestions([body, ...questions]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const questionList = questions.map((questionObject) => {
    return (
    <QuestionTile 
      key={questionObject.id}
      data={questionObject}
    />
    )
  })

  return(
    <div>
      <div>
        <QuestionFormContainer
          addNewQuestion={addNewQuestion}
        />
      </div>
      <div className="grid-container">
        {questionList}
      </div>
    </div>
  )
}

export default QuestionIndexContainer