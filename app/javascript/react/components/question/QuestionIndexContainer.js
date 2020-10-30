import React, { useState, useEffect } from "react"

import QuestionFormContainer from './QuestionFormContainer'

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
      debugger
      setQuestions([...questions, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const addNewQuestion = (formData) => {
    debugger
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
      debugger
      setQuestions([...questions, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <div>
      <p>Hello! In the future the index page will show the classrooms that a student or teacher is a part of.  For now you can click the button below to create a new question!</p>

      <div>
        <QuestionFormContainer
          addNewQuestion={addNewQuestion}
        />
      </div>
    </div>
  )
}

export default QuestionIndexContainer