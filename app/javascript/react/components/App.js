import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faFont, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faImages, faFont, faSquareRootAlt)

import ClassroomIndexContainer from "./classroom/ClassroomIndexContainer.js"
import ClassroomShowContainer from "./classroom/ClassroomShowContainer.js"
import QuestionShowContainer from "./question/QuestionShowContainer.js"


const App = (props) => {
  return (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={ClassroomIndexContainer}/>
    <Route exact path="/classrooms/:id" component={ClassroomShowContainer}/>
    <Route exact path="/classrooms/:classroom_id/questions/:question_id" component={QuestionShowContainer}/>
    </Switch>
  </BrowserRouter>
  )
}

export default App
