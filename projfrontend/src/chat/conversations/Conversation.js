import React, {useState, useEffect} from 'react';
import "./conversation.css"

const Conversation = ({conversationName, conversationImg, }) => {

  return (
    <div className="conversation">
      <img  className='conversationImg' src={conversationImg } />
      <span className="conversationName">
        {conversationName}
      </span>
    </div>
    );
}
export default Conversation