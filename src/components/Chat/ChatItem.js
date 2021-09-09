import React from 'react';

const ChatItem = ({ chat }) => {
  const { author, message } = chat;
  return (
    <div className="chat__chat-item">
      <span className="chat__chat-item-author">{author}</span>
      <span className="chat__chat-item-message">{message}</span>
    </div>
  );
};

export default ChatItem;
