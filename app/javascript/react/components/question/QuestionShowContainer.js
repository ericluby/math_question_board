import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import ChatContainer from './ChatContainer'

const QuestionShowContainer = (props) => {
  const [questionTitle, setQuestionTitle] = useState("")
  const [status, setStatus] = useState("")
  
  useEffect(() => {
    fetch(`/api/v1/classrooms/${props.match.params.classroom_id}/questions/${props.match.params.question_id}`)
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
      setQuestionTitle(body.title);
      setStatus(body.status);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const changeStatusOnSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/v1/classrooms/${props.match.params.classroom_id}/questions/${props.match.params.question_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: "closed",
        }),
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
      setStatus(body.status)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`)
    );
  }

  return(
    <div className="page center-items ">
      <div className="margins no-bottom-margins center-text">
        <span className="side-margins">
          <input
              type="submit"
              className="button light-text"
              value="Mark Question As Complete"
            />
        </span>
        <span className="side-margins">
          <Link className="button light-text" to={`/classrooms/${props.match.params.classroom_id}`}>Return To The Classroom</Link>
        </span>
      </div>
      <div className="grid-x row align-center">
        <div className="grid-x medium-11 grid-padding-x center-text top-margin bottom-margin min-height">
          <div className="cell medium-9 callout min-height">
            <h4>{questionTitle}</h4>
          </div>
          <div className="cell medium-3 callout min-height">
            <h6>Status: {status} </h6>
          </div>
        </div>
      </div>
      <ChatContainer
        classroomId = {props.match.params.classroom_id}
        questionId = {props.match.params.question_id}

        />
    </div>
  )
}

export default QuestionShowContainer