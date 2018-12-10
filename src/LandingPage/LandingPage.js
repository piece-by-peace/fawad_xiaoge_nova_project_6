import React from 'react';
import Instructions from './Instructions'
import Leaderboard from './Leaderboard';

const LandingPage = ({ handleOnClickButton }) => {

    return (
        <div className="landing_page">
            

            <h1>Piece <span>by</span> Peace</h1>
            <div>
                <h2>Choose difficulty</h2>
                <button value="easy" onClick={handleOnClickButton}>
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
