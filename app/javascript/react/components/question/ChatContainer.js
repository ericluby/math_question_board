import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [latex, setLatex] = useState('x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}')
  const [chatInputType, setChatInputType] = useState("text")

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

  const changeStatusOnSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/v1/classrooms/${props.classroomId}/questions/${props.questionId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: "closed"
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
      debugger
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`)
    );
  }

  let messagesComponents = messages.map(message => {
    return(
      <Message
        key={message.messageId}
        body={message.body}
      />
    )
  }, this);

  const changeToText = (event) => {
    event.preventDefault();
    setChatInputType("text")
  }

  const changeToImage = (event) => {
    event.preventDefault();
    setChatInputType("image")
  }

  const changeToEquation = (event) => {
    event.preventDefault();
    setChatInputType("equation")
  }

  let inputComponents = () => {
    if(chatInputType === "text"){
      return(
        <form onSubmit={handleFormSubmit} className="cell medium-10">
          <TextFieldWithSubmit
            content={body}
            name='message'
            handlerFunction={handleMessageChange}
          />
        </form>
      )
    }else if(chatInputType === "image"){
      return(
        <div className="row grid-x">
          <form onSubmit={handleImageFormSubmit} className='grid-x cell medium-10'>
            <Dropzone onDrop={handleFileUpload} id="drop-zone">
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h5 className="callout cell small-6">
                      Click here or drag and drop to upload a image of your work
                    </h5>
                  </div>
                </section>
              )}
            </Dropzone>
              
            {photoUploaded}
            
            <div className="grid-x">
              <input
                type="submit"
                value="Send image"
                className="button light-text large"
                />
            </div>
          </form>
        </div>
      )
    }else if(chatInputType === "equation"){
      return(
        <div className='grid-x row align-center' >
          <EditableMathField
            className="white-BG"
            latex={latex}
            onChange={(mathField) => {
              setLatex(mathField.latex())
            }}
          />
          <form onSubmit={handleEquationFormSubmit} className="grid-x align-middle">
            <input
                  type="submit"
                  className="button light-text large"
                  value="send equation"
                  style={{height: "100%"}}
                  />
          </form>
        </div>
      )
    }
  };

  return(
    <div className="grid-x row align-center">
      <div className='callout chat cell chat-box medium-10 style={{margin-top: "16px"}}' id='chatWindow' >
        {messagesComponents}
      </div>

      <div>
        <button onClick={changeToText}>Text</button>
        <button onClick={changeToImage}>Image</button>
        <button onClick={changeToEquation}>Equation</button>
      </div>

      <div>
        {inputComponents()}
      </div>

      <div>
        <form onSubmit={changeStatusOnSubmit} className="grid-x align-middle">
          <input
            type="submit"
            className="button light-text large"
            value="Mark Question As Complete"
          />
        </form>
      </div>
      <Link className="button light-text large" to={`/classrooms/${props.classroomId}`}>Return To The Classroom</Link>
    </div>
  );
}

export default ChatContainer;
