// src/App.js
import React from 'react';
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="App">
    {/* Embed the dashboard.html inside an iframe */}
    <iframe
      src="/EduPlusCampus.html"
      title="Dashboard"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />

    <div className="App">
      <Chatbot />
    </div>
    </div>
  );
}

export default App;
