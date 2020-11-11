import React from 'react';

const isImgURL = /^http\S*\.(png|jpg|jpeg|gif)$/i;

const Message = (props) => {
  if(isImgURL.test(props.body)){
    return(
      <img src={props.body}/>
    )
  }else{
    return(
      <p>
        {props.body}
      </p>
    )
  }
};

export default Message;
