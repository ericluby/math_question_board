import React, { useState, useEffect } from "react"

import QuestionFormContainer from './QuestionFormContainer'
import QuestionTile from './QuestionTile'

const QuestionIndexContainer = (props) => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("/api/v1/questions")
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
      setQuestions(body);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const addNewQuestion = (formData) => {
    fetch("/api/v1/questions", {
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
      setQuestions([...questions, body]);
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
      <p>Hello! In the future the index page will show the classrooms that a student or teacher is a part of.  For now you can click the button below to create a new question!</p>

      <div>
        <QuestionFormContainer
          addNewQuestion={addNewQuestion}
        />
      </div>
        {questionList}
    </div>
  )
}

export default QuestionIndexContainer