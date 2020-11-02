import React, { useState } from "react"

const QuestionFormContainer = (props) => {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    questionBody: ""
  })

  const handleChange = (event) => {
    setNewQuestion({
      ...newQuestion,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // add a function here to persist the question
    props.addNewQuestion(newQuestion)
    setNewQuestion({
      title: "",
      questionBody: ""
    })
  }

  return(
    <div>
      <p>hello from the question form!</p>
      <form onSubmit={handleSubmit} >
        <label>
          Question Title:
          <input
            name="title"
            id="title"
            type="text"
            onChange={handleChange}
            value={newQuestion.title}
          />
        </label>
        <label>
          Question:
          <input
            name="questionBody"
            id="questionBody"
            type="text"
            onChange={handleChange}
            value={newQuestion.questionBody}
          />
        </label>
        <input
          className="button"
          type="submit" 
          value="Submit New Question" />
      </form>
    </div>
  )
}

export default QuestionFormContainer