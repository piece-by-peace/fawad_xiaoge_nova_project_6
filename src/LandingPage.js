import React, { Component } from 'react';
import TimerDifficulty from './TimerDiffculty';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            timer: 0,
        };
    }
    startGame = () => {};

    render() {
        return (
            <div>
                <h1>Piece by peace</h1>
                <TimerDifficulty />
                <button onClick={this.startGame}>Start Game</button>
            </div>
        );
    }
}

export default LandingPage;
