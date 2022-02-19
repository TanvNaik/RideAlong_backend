import React, {useState, useEffect} from 'react';
import "./conversation.css"

const Conversation = ({conversation, conversationName, conversationImg, currentUser, token }) => {

/* 
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]); */

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