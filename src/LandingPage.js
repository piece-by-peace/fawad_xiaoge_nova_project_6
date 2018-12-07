import React, { Component } from 'react';

const LandingPage = ({ handleOnClickButton }) => {
    return (
        <div>
            <h1>Piece by peace</h1>
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
        </div>
    );
};

export default LandingPage;
