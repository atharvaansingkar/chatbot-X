import React from 'react';
import { Widget, addResponseMessage, toggleMsgLoader, addLinkSnippet } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

class Chatbot extends React.Component {
  componentDidMount() {
    // Add initial welcome message
    addResponseMessage("Welcome! How can I assist you today?");
  }

  // Function to handle new messages from the user
  handleNewUserMessage = async (newMessage) => {
    toggleMsgLoader(); // Start loader

    try {
      // Send user message to Rasa backend
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: "user", // Static sender id
        message: newMessage,
      });

      // Process Rasa bot's response
      response.data.forEach((msg) => {
        if (msg.text) {
          // Add text response from the bot
          addResponseMessage(msg.text);
        }
        if (msg.image) {
          // Add image link as a clickable snippet
          addLinkSnippet({ link: msg.image, title: "Click to view image" });
        }
      });
    } catch (error) {
      console.error("Error communicating with Rasa:", error);
    }

    toggleMsgLoader(); // Stop loader
  };

  render() {
    return (
      <div className="App">
        {/* The chat widget */}
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Rasa Chatbot"
          subtitle="Ask me anything"
        />
      </div>
    );
  }
}

export default Chatbot;
