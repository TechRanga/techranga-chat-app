import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './sign-in.style.css';
const SignIn =()=>{

    const [userName,setUserName] = useState('');
    const [chatRoom,setChatRoom] = useState('');

    const onSignIn=(e)=>{
        if(!userName || !chatRoom){
            e.preventDefault();
        }
    };

    return (
        <div className='sign-in-outer-container'>
            <div className='sign-in-inner-container'>
                <h className='sign-in-header'>Chat Now</h>
                <div><input placeholder='Username' className='sign-in-input mt-20' type='text' onChange={e=>{setUserName(e.target.value)}}/></div>
                <div><input placeholder='Chat Room Name' className='sign-in-input mt-20' type='text' onChange={e=>{setChatRoom(e.target.value)}}/></div>
                <Link onClick={onSignIn} to={`/chat?userName=${userName}&chatRoom=${chatRoom}`} >
                    <button className='sign-in-button mt-20' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
};

export default SignIn;