import React from 'react';

const Header = ({ score, timer }) => {
    return (
        <header>
            <div>Score: {score}</div>
            <div>Timer: <span id="timer">{timer}</span></div>
        </header>
    );
};

export default Header;
