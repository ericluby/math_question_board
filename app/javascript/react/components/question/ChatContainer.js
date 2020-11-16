import React, { useState, useEffect } from 'react';
import Message from '../Message';
import Dropzone from "react-dropzone";
import { addStyles, EditableMathField } from 'react-mathquill'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          scrollToBottom()
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

  const handleTextFormSubmit = (event) => {
    event.preventDefault();
    // Send info to the receive method on the back end
    App.chatChannel.send({
      body: body,
      userId: user.user_id,
      userImage: user.profile_photo
    })
    handleClearForm();
    scrollToBottom()
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
      scrollToBottom()
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

  const handleEquationFormSubmit = (event) => {
    event.preventDefault();
    App.chatChannel.send({
      body: `ltx${latex}`,
      userId: user.user_id,
      userImage: user.profile_photo
    })
    handleClearForm();
    scrollToBottom()
  };

  let messagesComponents = messages.map(message => {
    message.profilePhoto.url = message.profilePhoto.url || "https://math-mentors-production.s3.amazonaws.com/studentbasicimage.png"
    return(
      <Message
        key={message.messageId}
        body={message.body}
        profileImage={message.profilePhoto}
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


  if (imageUpload.image != "") {
    photoUploaded = (
      <div>
        <p>Photo Uploaded: {imageUpload.image.path}</p>
      </div>
    );
  }
  
  let photoUploaded = null;
  if(imageUpload.image === ""){
    photoUploaded = (
    <div>
      {/* <p className="no-margin placeholder-text">Click here or drag and drop to upload an image</p> */}
      <p className="no-margin placeholder-text">Insert an image</p>
    </div>
    )
  }else if (imageUpload.image !== ""){
    photoUploaded = (
    <div>
      {/* <p className="no-margin placeholder-text">Photo Uploaded: {imageUpload.image.path}</p> */}
      <p className="no-margin placeholder-text">{imageUpload.image.path}</p>
    </div>
    )
  }

  let chatSubmit = () => {
    if(chatInputType === "text"){
      return(
      <div>
        <input 
          type='submit' 
          value='Send' 
          onClick={handleTextFormSubmit} 
          className='light-text input-group-button min-height secondary' 
        />
      </div>
      )
    }else if(chatInputType === "image"){
      return(
        <div>
          <input
            type="submit"
            value="Send"
            onClick={handleImageFormSubmit}
            className="light-text input-group-button min-height secondary"
          />
        </div>
      )
    }else if(chatInputType === "equation"){
      return(
        <input
          type="submit"
          value="Send"
          onClick={handleEquationFormSubmit}
          className="light-text input-group-button min-height secondary"
          style={{height: "100%"}}
        />
      )
    }
  }

  let chatInput = () => {
    // text input
    if(chatInputType === "text"){
      return(
        <input
          className='input-group-field min-height'
          name='message'
          onChange={handleMessageChange}
          type='text'
          value={body} 
          placeholder="Type your text here"
        />
      );
    }
    // image input
    else if(chatInputType === "image"){
      return(
        <div className="full-width">
          <form onSubmit={handleImageFormSubmit} className='input-group-field min-height'>
            <Dropzone onDrop={handleFileUpload} id="drop-zone">
              {({ getRootProps, getInputProps }) => (
                <section className="full-width">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="callout no-margin">
                      {photoUploaded}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            
          </form>
        </div>
      )
    }
    // equation input
    else if(chatInputType === "equation"){
      return(
        <div className='grid-x row align-center full-width' >
          <EditableMathField
            className="white-BG input-group-field min-height"
            latex={latex}
            onChange={(mathField) => {
              setLatex(mathField.latex())
            }}
          />
        </div>
      )
    }
  };

  const scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  return(
    <div className="grid-x row align-center show-background">
      <div className='callout chat cell chat-box medium-11' id='chatWindow' >
        {messagesComponents}
      </div>

      <div className="input-group min-height top-margin side-margins">
        <button onClick={changeToText} className="input-group-label min-height"><FontAwesomeIcon icon="font" /></button>
        <button onClick={changeToImage} className="input-group-label min-height"><FontAwesomeIcon icon="images" /></button>
        <button onClick={changeToEquation} className="input-group-label min-height"><FontAwesomeIcon icon="square-root-alt" /></button>
        {chatInput()}
        {chatSubmit()}
      </div>

      <div 
        style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}
      >
      </div>
    </div>
  );
}

export default ChatContainer;
