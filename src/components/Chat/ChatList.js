import React, { useState, useEffect, useRef } from 'react';

import Socket from '@/utils/socket';

import ChatItem from './ChatItem';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const socketInstance = useRef(Socket.getInstance());

  useEffect(() => {
    const registerChatEventHandler = () => {
      socketInstance.current.on('chat:getNewChat', newChat => {
        setChatList(draft => draft.concat([newChat]));
      });
    };

    const cleanupChatEvnetHandler = () => {
      socketInstance.current.off('chat:getNewChat');
    };

    registerChatEventHandler();
    return () => {
      cleanupChatEvnetHandler();
    };
  }, []);

  return (
    <div className="chat__chat-list">
      {chatList.map((chat, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ChatItem key={idx} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
