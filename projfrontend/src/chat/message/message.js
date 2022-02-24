import "./message.css"
import React from 'react'
import { format } from "timeago.js";
import { isAuthenticated } from "../../authentication/helper";


const Message = ({message, own}) => {
    const {user} = isAuthenticated()
    return (
        <div className={own === "own" ? "message own" : "message"} >
        {
            own === 'new' ? 
            (<>
            <div className='message-new' >
                <b>Start Conversation</b>
            </div>
            </>) : (
                <>
                <div className={own === "own" ? "messageTopown" : "messageTop"} >
                {
                    own === "own" ? (
                        <img  className='messageImg' src={`http://localhost:8800/image/${user.profile_pic}` } />
                    ) :
                    ( own !== "new" &&
                        <img  className='messageImg' src={`http://localhost:8800/image/${message.sender.profile_pic}` } />
                    )
                }
            <p className="messageText" >{message.content}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
            </>
            )
        }
        
            
        </div>
    )
}

export default Message
