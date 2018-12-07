import React from 'react';

const Header = ({ score, timer }) => {
    return (
        <header>
            <div>Score: {score}</div>
            <div id="timer">Timer: {timer}</div>
        </header>
    );
};

export default Header;
