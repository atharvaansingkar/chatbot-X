// src/components/Chatbot.js

import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

function Chatbot() {
  React.useEffect(() => {
    addResponseMessage('Welcome to the chatbot!');
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        userId: 'user123',
        message: newMessage,
      });
      response.data.forEach((msg) => addResponseMessage(msg.text));
    } catch (error) {
      console.error('Error sending message to backend:', error);
      
      addResponseMessage('Error communicating with the server.');
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Educational Chatbot"
      subtitle="Ask me anything about the courses!"
    />
  );
}

export default Chatbot;