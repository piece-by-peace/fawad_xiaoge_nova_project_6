import React from 'react';

import Leaderboard from './Leaderboard';

const LandingPage = ({ handleOnClickButton }) => {

    return (
        <div className="landing_page">
            
            <div className="monogram">
                <img src={require('./letter_p_medieval_monogram.svg')} alt="" />
                <h1>iece <span>by</span> eace</h1>
            </div>

            <p>match each homophone to its corresponding correct defintion</p>
            <h2>Choose difficulty</h2>
            <div>
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
            <Leaderboard />
        </div>
    );
};

export default LandingPage;
