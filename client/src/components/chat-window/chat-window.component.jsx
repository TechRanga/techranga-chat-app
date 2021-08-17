import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

var socket;
const ENDPOINT = "localhost:5000";

const ChatWindow =({location})=>{

    const [userName,setUserName] = useState('');
    const [chatRoom,setChatRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [userMessage,setUserMessage] = useState('');

    useEffect(()=>{
        const {userName,chatRoom} = queryString.parse(location.search);
        setUserName(userName);
        setChatRoom(chatRoom);
        socket = io(ENDPOINT);
        socket.emit('join',{userName, chatRoom},()=>{});

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        };
    },[location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage=(e)=>{
        e.preventDefault();
        if(userMessage){
            socket.emit('sendMessage',userMessage,()=>setUserMessage(''));
        }
    };

    console.log(userMessage, messages);

    return (
        <div className='chat-window-outer-container'>
            <div className='chat-window-inner-container'>
                <input value={userMessage} 
                    onChange={(event)=>{setUserMessage(event.target.value)}}
                    onKeyPress={event=>event.key==='Enter'?sendMessage(event):null}
                />
            </div>
        </div>
    )
};

export default ChatWindow;