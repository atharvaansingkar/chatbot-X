import React, { useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

const Chatbot = () => {
  useEffect(() => {
    // Initial welcome message
    addResponseMessage('Hello! How can I help you today?');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    axios.post('http://localhost:5000/webhooks/rest/webhook', {
      sender: 'user',
      message: newMessage
    }).then(response => {
      response.data.forEach(message => {
        if (message.text) {
          addResponseMessage(message.text);
        }
      });
    }).catch(error => {
      console.error('Error communicating with Rasa:', error);
    });
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatbot"
      subtitle="Ask me anything"
    />
  );
};

export default Chatbot;
