import React from 'react';
import "../style/LandingPage.css"

const App = ({ onClickStart }) => {
    return (
        <div id='landingPageContainer'>
            <div id='navbar'>
                <div id='theLetterI'>
                    I
                </div>
                <div id='appName'>InterviewAI.Site</div>
            </div>
            <h1>Your <span id='interviewer'>Interviewer</span> Will Not Be This <span id='direct'>Direct</span></h1>
            <p>Unprepared for your interview? Get ready with this application. No sign-in required.</p>
            <button onClick={onClickStart}>Start Interview!</button>
        </div>
    )
};

export default App;