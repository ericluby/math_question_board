import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill'


const isImgURL = /^http\S*\.(png|jpg|jpeg|gif)$/i;
const isLatex = /^ltx/

addStyles()

const Message = (props) => {
  if(isImgURL.test(props.body)){
    return(
      <img src={props.body}/>
    )
  }else if(isLatex.test(props.body)){
    const equation = props.body.substring(3);
    return(
        <div>
          <StaticMathField>{equation}</StaticMathField>
        </div>
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
