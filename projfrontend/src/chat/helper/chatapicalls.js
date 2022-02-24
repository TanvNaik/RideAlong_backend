import Conversation from "../conversations/Conversation"

export const getUserConversations = (userId, token) => {
    return fetch(`/api/getUserConversations/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}

export const createConversation = (members) => {
    return fetch(`/api/createConversation`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(members)
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const createMessage = (message) => {
    return fetch(`/api/createMessage`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }).then(res => res.json())
    .catch(err => console.log(err))
}


export const getMessages = (conversationId) => {
    return fetch(`/api/${conversationId}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}