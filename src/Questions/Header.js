import React from 'react';

const Header = ({ score, currentTime }) => {
    const formatTimeString = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const secondsStr = (seconds < 10) ? '0' + seconds : seconds;

        return `${minutes}:${secondsStr}`;
    };

    return (
        <header className="clearfix">
            <div>Score: {score}</div>
            <div>Timer: <span id="timer">{formatTimeString(currentTime)}</span></div>
        </header>
    );
};

export default Header;
