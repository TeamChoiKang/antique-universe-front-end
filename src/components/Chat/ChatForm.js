import React, { useState } from 'react';

import Socket from '@/utils/socket';

const INIT_MESSAGE = '';

const ChatForm = () => {
  const [chatForm, setChatForm] = useState(INIT_MESSAGE);

  const onChange = e => {
    setChatForm(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const socketInstance = Socket.getInstance();
    socketInstance.emit('chat:createNewChat', chatForm);
    setChatForm(INIT_MESSAGE);
  };

  return (
    <form className="chat__chat-form">
      <input
        className="chat__chat-form-input"
        type="text"
        value={chatForm}
        onChange={onChange}
        label="Outlined"
        variant="outlined"
      />
      <button className="chat__chat-form-btn" type="submit" onClick={onSubmit}>
        전송
      </button>
    </form>
  );
};

export default ChatForm;
