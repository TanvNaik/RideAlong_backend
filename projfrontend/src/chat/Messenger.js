import React, { useEffect, useRef, useState } from 'react'
import './messenger.css'
import Base from '../core/Base'
import Conversation from './conversations/Conversation'
import Message from './message/message'
import { isAuthenticated } from '../authentication/helper'
import { createMessage, getMessages, getUserConversations } from './helper/chatapicalls'
import {io} from "socket.io-client"
const Messenger = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState("")
    const [error, setError] = useState("")
    const {user, token} = isAuthenticated()
    const [message, setMessage] = useState("Write a message...")
    /* const [socket, setSocket] = useState(null) */
    const socket = useRef()
    const scrollRef = useRef()


    useEffect(() => {
        socket.current = io("ws://localhost:8900")

        // receiving message
        socket.current.on('getMessage', (data) => {
            console.log(data.sender)
            setArrivalMessage({
                sender: data.sender,
                content: data.text,
                createdAt: Date.now(),
                })
        })
    },[])
    
    useEffect(()=>{
        console.log("inside arricva;message")
        console.log(arrivalMessage.sender)
        if(arrivalMessage){
            if( currentChat){
                if (currentChat.members[0]._id === arrivalMessage.sender._id || currentChat.members[0]._id === arrivalMessage.sender._id ){
                    setMessages(prev => [...prev, arrivalMessage])
                }
            }
        }
    },[arrivalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit('addUser', user._id)
        socket.current.on('getUsers', users => {
            //
        })
    },[user])


    useEffect(() => {
        getUserConversations(user._id, token)
        .then(data => {
            setConversations(data.conversations)          
        }).catch(err => console.log(err))
    },[])

    const loadChat = () => {
        if(currentChat){
            getMessages(currentChat._id)
            .then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setMessages(data.message)
                }
            })}
    }
    useEffect(() => {
        loadChat()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    const handleChange =() =>(e) => {
        setMessage(e.target.value)
    }
    const handleClick = (conversation) => {
        setCurrentChat(conversation)
    }

    const sendMessage = () => {
        
        const mess = {
            conversationId: currentChat._id,
            sender: user._id,
            content: message
        }
        const receiverId = (currentChat.members[0]._id === user._id) ? currentChat.members[1]._id : currentChat.members[0]._id
        socket.current.emit('sendMessage', {
            sender: user,
            receiverId,
            text: message
        })
        createMessage(mess).then(data => {
            if(data.error) {
                setError("Unable to send message")
            }else{
                setMessages([...messages, data.message])
                setMessage("")
                loadChat()
            }
        }).catch(err => console.log(err))
    }


    const messenger = () => {
        return (
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search' className='chatMenuInput' />
                        {conversations && conversations.map((conversation, key) => {
                                let member = conversation.members[0].name === user.name ? conversation.members[1] : 
                                conversation.members[0]
                                return(
                                    <span key={key} onClick={() => handleClick(conversation)}>
                                    <Conversation conversation={conversation} conversationImg={`http://localhost:8800/image/${member.profile_pic}`}  conversationName={member.name} currentUser={user} token={token}/>
                                    </span>
                                )
                            }) 
                        }
                                     
                    </div>  
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper"> 
                        {
                            currentChat ?
                            <>
                                <div className="chatBoxName">
                                    <div className="chatName">
                                    {
                                        currentChat.members[0].name === user.name ? currentChat.members[1].name : 
                                        currentChat.members[0].name
                                    }
                                    </div>
                               
                               <div style={{'height': '3rem' }}></div>
                                {
                                    messages && messages.map((message, key) => {
                                        return (
                                            <div className="chatBoxTop" key={key}>
                                                <div ref={scrollRef}>
                                                <Message message= {message}
                                                own={
                                                    message.sender._id == user._id ? "own" : ""
                                                } /></div>
                            
                                            </div>
                                        )
                                    })
                                }
                          </div>
                                
                                <div className="chatBoxBottom">
                                    <div className="chatMessageInput">
                                        <br />
                                        <textarea name="message" placeholder={message} onChange={handleChange()}></textarea>
                                    </div>
                                    <button className='chatSubmitButton' onClick={sendMessage}>Send</button>
                                </div>
                            </>
                            :
                            <span className="noConversationText">Open a conversation to chat</span>

                        }
                    </div> 
                </div>
            </div>
        )
    }


    return (
        <Base title="">
           {messenger()}
        </Base>
    )
}

export default Messenger
