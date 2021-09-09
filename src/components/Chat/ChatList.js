import React, { useState, useEffect } from 'react';

import Socket from '@/utils/socket';

import ChatItem from './ChatItem';

const ChatList = ({ chatList }) => {
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
