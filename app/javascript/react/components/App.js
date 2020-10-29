import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";

import QuestionIndexContainer from "./question/QuestionIndexContainer.js"

const App = (props) => {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={QuestionIndexContainer}/>
    </Switch>
  </BrowserRouter>
  )
}

export default App
