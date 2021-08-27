import React, { useState, useEffect } from 'react';

import Socket from '@/utils/socket';

import ChatItem from './ChatItem';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    registerChatListEvent();
  }, []);

  const registerChatListEvent = () => {
    const socketInstance = Socket.getInstance();
    socketInstance.on('chat:getNewChat', newChat => {
      const newChatList = chatList.concat([newChat]);
      setChatList(newChatList);
    });
  };

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
