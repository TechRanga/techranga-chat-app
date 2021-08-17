const express = require('express');
require('dotenv').config({ path: './config/config.env'});
const socketio = require('socket.io');
const http = require('http');
const router = require('./route/app-route');
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users/users');
//dotenv
const PORT = process.env.SERVER_PORT;

const app = express();
const server = http.createServer(app);
const sio = socketio(server,{cors: {
    origin: '*',
}});



app.use(router);

sio.on('connection',(socket)=>{
    console.log(`We have a new connection ${socket.id}`);
    socket.on('join',({userName,chatRoom},callback)=>{
       const {error,user} = addUser({id:socket.id,userName,chatRoom});
       if(error){
           return callback(error);
       }
       socket.emit('message',{user:'admin',text:`${user.userName}, welcome to the room ${user.chatRoom}`});
       socket.broadcast.to(user.chatRoom).emit('message',{user:'admin',text:`${user.userName} has joined!`});
       socket.join(user.chatRoom);
       //callback();
    });
    socket.on('sendMessage',({message,callback})=>{
        const user = getUser(socket.id);
        if(user){
            sio.to(user.chatRoom).emit('message',{user:user.userName,text:message});
        }else{
            callback({error:"Chatroom does not exist anymore"});
        }
        
    })
    socket.on('disconnect',()=>{console.log('User disconnected')});
});

server.listen(PORT);



