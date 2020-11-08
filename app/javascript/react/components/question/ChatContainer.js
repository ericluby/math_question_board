import React, { useState, useEffect } from 'react';
import Message from '../Message';
import TextFieldWithSubmit from '../TextFieldWithSubmit';

const ChatContainer = (props) => {
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState("")


  useEffect(() => {

    fetch("/api/v1/users/current", {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      setUser(data)
    })
    App.chatChannel = App.cable.subscriptions.create(
      // Info that is sent to the subscribed method
      {
        channel: "ChatChannel",
        question_id: 4
      },
      {
        connected: () => console.log("ChatChannel connected"),
        disconnected: () => console.log("ChatChannel disconnected"),
        received: data => {
          // Data broadcasted from the chat channel
          console.log(data)
          handleMessageReceipt(data)
        }
      }
    );
  }, [])


  const handleMessageReceipt = (messages) => {
    setMessages(messages)
  }

  const handleClearForm = () => {
    setBody("")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Send info to the receive method on the back end
    App.chatChannel.send({
      body: body,
      userId: user.user_id
    })

    handleClearForm();
  }

  const handleMessageChange = (event) => {
    setBody(event.target.value)
  }

  let messagesComponents = messages.map(message => {
    return(
      <Message
        key={message.messageId}
        body={message.body}
      />
    )
  }, this);

  return(
    <div>
      <div className='callout chat' id='chatWindow'>
        {messagesComponents}
      </div>
      <form onSubmit={handleFormSubmit}>
        <TextFieldWithSubmit
          content={body}
          name='message'
          handlerFunction={handleMessageChange}
        />
      </form>
    </div>
  );
}

export default ChatContainer;
