import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from './components/sign-in/sign-in.component';
import ChatWindow from './components/chat-window/chat-window.component';

const App =()=>(
    <Router>
        <Route path='/' exact component={SignIn} />
        <Route path='/chat' component={ChatWindow} />
    </Router>
);

export default App;