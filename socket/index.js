const io  = require('socket.io')(8900,{
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = [];

const adduser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId})
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId )
}
const getUser = (userId) => {
     const userSo = users.map((user,i) => {
        if(user.userId == userId){
            
            return user
        }
    })
    console.log(userSo)
    return userSo

}
io.on('connection', (socket) => {

    //take userId and socket id from user
    socket.on('addUser', userId => {
        adduser(userId, socket.id)
        io.emit('getUsers', users)
    })
    
    // send and recieve message
    socket.on("sendMessage", ({ sender, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log(user)
        io.to(user.socketId).emit("getMessage", {
            sender,
          text,
        });
      });


    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)

    })
},[])