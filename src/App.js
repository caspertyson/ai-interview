import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';

function App() {
  const [userClickedStart, setUserClickedStart] = useState(false);

  const handleClickStart = () => {
    setUserClickedStart(true);
  };

  return (
    <div className="App">
      <div className={`landing-page-container ${userClickedStart ? 'fade-out' : ''}`}>
        <LandingPage onClickStart={handleClickStart} />
      </div>
      <div className={`chat-container ${userClickedStart ? 'fade-in' : ''}`}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
