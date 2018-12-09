import React from 'react';

const LandingPage = ({ handleOnClickButton }) => {
    return (
        <div className="landing_page">
            <h1>Piece by peace</h1>
            <h2>Choose difficulty</h2>
            <div>
                <button className="button-stripe" onClick={handleOnClickButton} value="easy">
                    easy
                </button>

                <button className="button-stripe" onClick={handleOnClickButton} value="medium">
                    medium
                </button>

                <button className="button-stripe" onClick={handleOnClickButton} value="hard">
                    hard
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
