import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";

import QuestionIndexContainer from "./question/QuestionIndexContainer.js"
import ChatContainer from "./question/ChatContainer.js"

const App = (props) => {
  return (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={QuestionIndexContainer}/>
    <Route exact path="/chats/:id" component={ChatContainer}/>
    </Switch>
  </BrowserRouter>
  )
}

export default App
