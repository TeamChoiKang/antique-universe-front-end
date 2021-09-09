import React from 'react';

import './chat.css';
import ChatForm from './ChatForm';
import ChatList from './ChatList';

const Chat = () => {
  return (
    <div className="chat">
      <ChatList />
      <ChatForm />
    </div>
  );
};

export default Chat;
