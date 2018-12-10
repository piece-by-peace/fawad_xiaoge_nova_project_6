import React from 'react';
import Instructions from './Instructions'
import Leaderboard from './Leaderboard';

const LandingPage = ({ handleOnClickButton }) => {

    return (
        <div className="landing_page">
            

            <h1>Piece <span>by</span> Peace</h1>
<<<<<<< HEAD

            <p>match each homophone to its corresponding correct defintion</p>
            <h2>Choose difficulty</h2>
            <div>
                <button onClick={handleOnClickButton} value="easy">
=======
            <div>
                <h2>Choose difficulty</h2>
                <button value="easy" onClick={handleOnClickButton}>
>>>>>>> f0d24abac3dc1396ea0664a36175bea8a13eec17
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
