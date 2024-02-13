import React, { useState, useEffect, useRef } from 'react';
import "../style/Chat1.css"
import { async } from 'q';
import Send from "../send.png"

const App = () => {
  // const [messages, setMessages] = useState([{ role: 'assistant', content: "hellldfiohf goidfjg oidf jgio dfgj doig djf iog dfj gi dofig jdfiogjdf gi idf giod fgjd fiog dfj goi doig odij goi jdfog iod gjdio gjodf gjoidf gnldngld fgdm gljdf gjldf glj dlfjg dfjl gljdf gjldf gjld o" },{ role: 'user', content: "hellj oih sidoh osid fhids hfis oh sdihf siod fois dfhis dfh sihf is fhis fhsd ifh is fisdihf sihfi sdh hi aanskdfnksdf s fns fndf gn dfng ndf gndfg nd gnd gasdasd as da sd aso" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" },{ role: 'assistant', content: "hello" }]);
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const [job, setJob] = useState("")
  const [isModalOpen, setModalOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
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
        setIsTyping(true);
        const response = await fetch('https://us0co1h2wh.execute-api.ap-southeast-2.amazonaws.com/default/interviewAI', {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'omit', // include, *same-origin, omit        
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([...messages, { role: 'system', content: `hi im preparing for an interview for a ${job} job, with someone who's known for being direct and upfront. can you please help me prep for this by interviewing me. you can be brutal if you'd like to help me. dont acknowledge this message, just start the interview. wait for my reply before continuing.` }]),
        });
        setMessages((prev) => [...prev, { role: 'system', content: `hi im preparing for an interview for a ${job} job, with someone who's known for being direct and upfront. can you please help me prep for this by interviewing me. you can be brutal if you'd like to help me. dont acknowledge this message, just start the interview. wait for my reply before continuing.`  }]);

        const data = await response.json();
        console.log(data)
        const botReply = data.choices[0].message.content;
        setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
        setIsTyping(false);

      } catch (error) {
        console.error('Failed to fetch response: ', error);
      }
    }
  };

  const handleSend = async() => {
    if (message.trim() === '') return;
    setIsTyping(true);

    const newMessages = [...messages, { role: 'user', content: message }];
    const newMessageSuffix = [...messages, { role: 'user', content: message + `. critize me and ask another question!` }];

    setMessages(newMessages);
    setMessage('');
    console.log(newMessages)
    try {
        const response = await fetch('https://us0co1h2wh.execute-api.ap-southeast-2.amazonaws.com/default/interviewAI', {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'omit', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessageSuffix),
        });
    
        const data = await response.json();
        const botReply = data.choices[0].message.content;
        console.log(botReply)
        setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
        setIsTyping(false);

      } catch (error) {
        console.error('Failed to fetch response: ', error);
      }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="containerChatBox">
      {isModalOpen && (
        <div id="modal">
          <div className="modal-content">
            <h2>Choose Your <span id='modalJob'>Job</span></h2>
            <p>Be as specific as you'd like.</p>
            <input
              type="text"
              placeholder="Enter Job..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            <button disabled={!job} onClick={handleCloseModal}>GET STARTED</button>
          </div>
        </div>
      )}

      <div className="chat-box">
        <div ref={chatBoxRef} className="messages">
          {messages.filter((m) => m.role !== 'system').map((m, index) => (
            <div key={index} className={`message ${m.role === 'user' ? 'user-message' : 'bot-message'}`}>
              {m.content}
            </div>
          ))}
          {isTyping && <div className="message bot-message typing">typing...</div>}
        </div>
        <div className="footer">
          <input className="compose-input" 
          type="text" 
          placeholder="Send a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyPress={handleKeyPress}/>
          <button id='sendButton' onClick={handleSend}><img id='sendIcon' src={Send}></img></button>
        </div>
      </div>
    </div>
  );
};

export default App;