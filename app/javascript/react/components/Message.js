import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill'


const isImgURL = /^http\S*\.(png|jpg|jpeg|gif)$/i;
const isLatex = /^ltx/

addStyles()

const Message = (props) => {
  if(isImgURL.test(props.body)){
    return(
      <div>
        <img src={props.profileImage.url} width="40"/>
        <img src={props.body}/>
      </div>
    )
  }else if(isLatex.test(props.body)){
    const equation = props.body.substring(3);
    return(
        <div>
          <img src={props.profileImage.url} width="40"/>
          <StaticMathField>{equation}</StaticMathField>
        </div>
    )
  }else{
    return(
      <p>
        <img src={props.profileImage.url} width="40"/>
        {props.body}
      </p>
    )
  }
};

export default Message;
