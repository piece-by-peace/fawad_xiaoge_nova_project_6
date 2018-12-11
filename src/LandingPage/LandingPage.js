import React from 'react';
import Instructions from './Instructions'
import Leaderboard from './Leaderboard';

const LandingPage = ({ handleOnClickButton }) => {

    return (
        <div className="landing-page">
            <h1>Piece <span>by</span> Peace</h1>
            <div className="difficulty-options">
                <h2>Choose difficulty</h2>
                <button onClick={handleOnClickButton} value="easy">
                    easy
                </button>

                <button onClick={handleOnClickButton} value="medium">
                    medium
                </button>

                <button onClick={handleOnClickButton} value="hard">
                    hard
                </button>
            </div>
            <Instructions />
            <Leaderboard />
        </div>
    );
};

export default LandingPage;
