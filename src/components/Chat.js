import React, { useState, useEffect, useRef } from 'react';
import "../style/Chat.css"
import { async } from 'q';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [job, setJob] = useState("")
  const [isModalOpen, setModalOpen] = useState(true);
  const chatBoxRef = useRef(null);
  console.log("loaded here")

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCloseModal = () => {
    setupChat()
    setModalOpen(false);
  };

  const setupChat = async () => {
    if (messages.length === 0) { // Changed from `messages === ''` to check the array length
      try {
        const response = await fetch('http://192.168.1.66:8000/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([...messages, { role: 'system', content: `hi im preparing for an interview for a ${job} job, with someone who's known for being direct and upfront. can you please help me prep for this by interviewing me. you can be brutal if you'd like to help me. dont acknowledge this message, just start the interview. wait for my reply before continuing.` }]),
        });
    
        const data = await response.json();
        const botReply = data.choices[0].message.content;
        setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
      } catch (error) {
        console.error('Failed to fetch response', error);
      }
    }
  };

  const handleSend = async() => {
    if (message.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: message }];
    const newMessageSuffix = [...messages, { role: 'user', content: message + `. critize me keep your answer short!` }];

    setMessages(newMessages);
    setMessage('');
    console.log(newMessages)
    try {
        const response = await fetch('http://192.168.1.66:8000/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessageSuffix),
        });
    
        const data = await response.json();
        const botReply = data.choices[0].message.content;
        console.log(botReply)
        setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
      } catch (error) {
        console.error('Failed to fetch response', error);
      }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    
    const setBodyHeight = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.querySelector('.containerChatBox').style.height = `${vh}px`;
    };
  
    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);
  
    return () => {
      window.removeEventListener('resize', setBodyHeight);
    };
  }, []);
    
  return (
    <div className="containerChatBox">

      {isModalOpen && (
        <div id="modal">
          <div className="modal-content">
            <h2>Choose your job</h2>
            <p>Beware, it can be brutal.</p>
            <input
              type="text"
              placeholder="Job you're applying for..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            <button disabled={!job} onClick={handleCloseModal}>Start Interview</button>
          </div>
        </div>
      )}

      <div className="chat-box">
        <div ref={chatBoxRef} className="messages">
          {messages.map((m, index) => (
            <div key={index} className={`message ${m.role === 'user' ? 'user-message' : 'bot-message'}`}>
              {m.content}
            </div>
          ))}
        </div>
        <div className="footer">
          <input id="messageInput" 
          type="text" 
          placeholder="Type a message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyPress={handleKeyPress}/>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
