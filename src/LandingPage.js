import React from 'react';

const LandingPage = ({ handleOnClickButton }) => {
    return (
        <div className="landing_page">
            <h1>Piece <span>by</span> Peace</h1>
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
        </div>
    );
};

export default LandingPage;
