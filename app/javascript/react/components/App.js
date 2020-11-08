import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";

import QuestionIndexContainer from "./question/QuestionIndexContainer.js"
import ClassroomIndexContainer from "./classroom/ClassroomIndexContainer.js"
import ClassroomShowContainer from "./classroom/ClassroomShowContainer.js"

const App = (props) => {
  return (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={ClassroomIndexContainer}/>
    <Route exact path="/classrooms/:id" component={ClassroomShowContainer}/>
    </Switch>
  </BrowserRouter>
  )
}

export default App
