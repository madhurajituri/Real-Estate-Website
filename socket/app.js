import {Server} from 'socket.io';

const io = new Server({
    cors:{
        origin:"http://localhost:5173",
    }
});

let onlineUsers = []

const addUser = (userId , socketId) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if(!userExists){
        onlineUsers.push({userId , socketId});
    }
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
}

io.on("connection" , (socket) => {
    socket.on("newUser", (userId)=>{
        addUser(userId , socket.id);
        // console.log(onlineUsers);
    });

    socket.on("send" , ({receiverId , data})=>{
        const receiver = getUser(receiverId);
        console.log("online users ",onlineUsers);
        console.log("receiverid:" ,receiverId);
        console.log("receiver:" ,receiver);
        io.to(receiver.socketId).emit("getmsg" , data);
    });

    socket.on("disconnect" , ()=>{
        removeUser(socket.id);
    })
})

io.listen("4000");