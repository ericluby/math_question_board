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
    <div className="grid-x align-center">
      <div>
        <p className="text-center width:100%">Have a Math Question? Ask it here!</p>
        <form onSubmit={handleSubmit} >
          <label>
            Question Title:
            <input
              name="title"
              id="title"
              type="text"
              placeholder="Triangle Area Formula"
              onChange={handleChange}
              value={newQuestion.title}
            />
          </label>
          <label>
            Question:
            <textarea
              rows="3"
              name="questionBody"
              id="questionBody"
              type="text"
              onChange={handleChange}
              value={newQuestion.questionBody}>
            </textarea>
          </label>
          <input
            className="button"
            type="submit" 
            value="Submit New Question" />
        </form>
      </div>
    </div>
  )
}

export default QuestionFormContainer