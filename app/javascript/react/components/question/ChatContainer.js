import React, { useState, useEffect } from 'react';
import Message from '../Message';
import TextFieldWithSubmit from '../TextFieldWithSubmit';
import Dropzone from "react-dropzone";
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'

addStyles()

const ChatContainer = (props) => {
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState("")
  const [imageUpload, setImageUpload] = useState({
    image: ""
  });
  const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

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
        question_id: props.questionId
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

  const handleImageFormSubmit = (event) => {
    event.preventDefault();
    let body = new FormData();
    body.append("image", imageUpload.image);
    fetch(`/api/v1/classrooms/${props.classroomId}/questions/${props.questionId}/messages`, {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        Accept: "image/jpeg",
        Accept: "image/jpg",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
      setImageUpload({
        image: ""
      })
    };

  const handleMessageChange = (event) => {
    setBody(event.target.value)
  }

  const handleFileUpload = (acceptedFiles) => {
    setImageUpload({
      ...imageUpload,
      image: acceptedFiles[0],
    });
  };
  
  let photoUploaded = null;
  if (imageUpload.image != "") {
    photoUploaded = (
      <div>
        <h5>Photo Uploaded: {imageUpload.image.path}</h5>
      </div>
    );
  }

  const handleEquationFormSubmit = (event) => {
    event.preventDefault();
    App.chatChannel.send({
      body: `ltx${latex}`,
      userId: user.user_id
    })
    handleClearForm();
  };

  let messagesComponents = messages.map(message => {
    return(
      // renders latex
      // <StaticMathField>{message.body}</StaticMathField>

      // renders images and text
      <Message
        key={message.messageId}
        body={message.body}
      />
    )
  }, this);

  return(
    <div className="grid-x">
      <div className='callout chat cell medium-12' id='chatWindow'>
        {messagesComponents}
      </div>
      <form onSubmit={handleFormSubmit} className="cell medium-12">
        <TextFieldWithSubmit
          content={body}
          name='message'
          handlerFunction={handleMessageChange}
        />
      </form>

      <div>
        <form onSubmit={handleImageFormSubmit} className='grid-x cell medium-6'>
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h5 id="drop-zone" className="cell callout">
                    Click here or drag and drop to upload a image of your work
                  </h5>
                </div>
              </section>
            )}
          </Dropzone>
            
          {photoUploaded}
          
          <div className="grid-x align-center">
            <input
              type="submit"
              value="Send image"
              />
          </div>
        </form>
      </div>
      
      <div className='grid-x cell medium-6'>
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex())
          }}
        />
        <form onSubmit={handleEquationFormSubmit} className="grid-x align-center">
          <input
                type="submit"
                value="send equation"
                />
        </form>
      </div>
    </div>
  );
}

export default ChatContainer;
