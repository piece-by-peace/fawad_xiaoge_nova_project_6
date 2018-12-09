import React from 'react';

import Leaderboard from './Leaderboard';

const LandingPage = ({ handleOnClickButton }) => {

    return (
        <div className="landing_page">
            <h1>Piece <span>by</span> Peace</h1>
            <h2>Choose difficulty</h2>
            <div>
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
            <Leaderboard />
        </div>
    );
};

export default LandingPage;
