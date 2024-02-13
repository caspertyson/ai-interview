import React from 'react';
import "../style/LandingPage.css"

const App = ({ onClickStart }) => {
    const scrollToDiv = () => {
        const element = document.getElementById('tilesContainer');
        element.scrollIntoView({ behavior: 'smooth' });
      };
    
    return (
        <div id='landingPageContainer'>
            <div id='fullPage'>
                <div id='navbar'>
                    <div id='theLetterI'>
                        I
                    </div>
                    <div id='appName'>InterviewAI.Site</div>
                </div>
                <div id='landingPageMainContent'>
                    <div id='poweredByAI'>Powered By AI</div>
                    <h1>Your <span id='interviewer'>Interviewer</span> Will Not Be This <span id='direct'>Direct</span></h1>
                    <p id='landingPageP'>Unprepared for your interview? Get ready with this application. No sign-in required.</p>
                    <button onClick={onClickStart}>Start Interview!</button>
                </div>
            </div>
            <div id='tilesContainer'>
                <div className='tileRow'>
                    <div className='tileBorder'>
                        <div className='tile'>
                            <h2>Quick, Informative Experience</h2>
                            <p id='tileP'>You can take this interview, anywhere, anytime, for as short and as long as you'd like!</p>
                        </div>
                    </div>
                    <div className='tileBorder'>
                        <div className='tile'>
                            <h2>Judgment-Free Zone</h2>
                            <p id='tileP'>No need to worry about saying something weird in front of people. You will never see this AI again! </p>
                        </div>
                    </div>
                </div>
                <div className='tileRow'>
                    <div className='tileBorder'>
                        <div className='tile'>
                            <h2>Remove First Interview Jitters</h2>
                            <p id='tileP'>The first interview is nearly always the hardest - and the most anxiety inducing. So why not take it with an AI?</p>
                        </div>
                    </div>
                    <div className='tileBorder'>
                        <div className='tile'>
                            <h2>Choose From Any Job You Like</h2>   
                            <p id='tileP'>Any job title, no matter how specific is available.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="landingPageFooter">
            <div className="column">
                <div className="row">
                <div className="sub-section">
                    <h2>InterviewAI.site</h2>
                    <p>🎯 Struggling with job interviews? Meet InterviewAI.site—your free, no sign-in needed, prep buddy!<br></br><br></br> 🚀 We offer real-world simulations with ai generated questions. Don't just practice, practice smarter. Walk into your next interview not as a bundle of nerves, but as a confident candidate. <br></br><br></br>🌟Why wait? Start Interviewing, Start Succeeding with InterviewAI.site! ”</p>
                </div>
                </div>
                <div className="row">
                <div className="sub-section">
                </div>
                </div>
            </div>
            <div className="column">
                <div className="row">
                <div className="sub-section">
                    <h2>Quick Links</h2>
                    <p onClick={onClickStart} id='startInterview'>Start Interview</p>
                    <p onClick={scrollToDiv}>What is this app good for?</p>
                </div>
                </div>
                <div className="row">
                <div className="sub-section">
                    <div id='competitors'>
                        <h2>Competitors</h2>
                        <a href='https://interviewprep-ai.com/'>Interview Prep AI</a>
                        <a href='https://grow.google/certificates/interview-warmup/'>Interview Warmup</a>
                        <a href='https://app.yoodli.ai/usecases/interview-preparation'>Yoodli</a>
                    </div>
                </div>
                </div>
            </div>
            <div className="column">
                <div className="row">
                <div className="sub-section">
                <h2>Jobs available</h2>
                    <p onClick={onClickStart}>Software Engineer</p>
                    <p onClick={onClickStart}>Accountant</p>
                    <p onClick={onClickStart}>Doctor</p>
                    <p onClick={onClickStart}>Bartender</p>
                    <p onClick={onClickStart}>Cashier</p>
                    <p onClick={onClickStart}>Hairdresser</p>
                    <p onClick={onClickStart}>Lawyer</p>
                    <p onClick={onClickStart}>Start-up founder</p>
                    <p onClick={onClickStart}>Chef</p>
                    <p onClick={onClickStart}>Many More...</p>
                </div>
                </div>
                <div className="row">
                <div className="sub-section">
                </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default App;