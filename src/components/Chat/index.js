import React, { useState, useEffect, useRef } from 'react';

import Socket from '@/utils/socket';

import './chat.css';
import ChatForm from './ChatForm';
import ChatList from './ChatList';

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const socketInstance = useRef(Socket.getInstance());

  useEffect(() => {
    registerChatEventHandler();
    return () => {
      cleanupChatEvnetHandler();
    };
  }, []);

  const registerChatEventHandler = () => {
    socketInstance.current.on('chat:getNewChat', newChat => {
      setChatList(draft => draft.concat([newChat]));
    });
  };

  const cleanupChatEvnetHandler = () => {
    socketInstance.current.off('chat:getNewChat');
  };

  return (
    <div className="chat">
      <ChatList chatList={chatList} />
      <ChatForm setChatList={setChatList} />
    </div>
  );
};

export default Chat;
