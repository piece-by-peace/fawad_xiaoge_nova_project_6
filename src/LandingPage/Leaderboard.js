import React, { Component } from 'react';
import { leaderboardDbRef } from '../firebase';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            leaderboard: [],
            leaderboardShown: false,
            gameInfoShown: false,
        };
    }

    componentDidMount() {
        // Get the top 10 entries, ordered by score
        leaderboardDbRef
            .orderByChild('score')
            .limitToLast(10)
            .on('value', (snapshot) => {
                let leaderboard = [];
                snapshot.forEach((child) => {
                    leaderboard.unshift(child.val());
                });

                this.setState({ leaderboard: leaderboard });
            });
    }

    toggleLeaderboard = () => {
        this.setState((currentState) => {
            return { leaderboardShown: !currentState.leaderboardShown };
        });
    };

    toggleAboutGame = () => {
        this.setState((currentState) => {
            return { gameInfoShown: !currentState.gameInfoShown };
        });
    };

    render() {
        const leaderboardContent = (showContent) => {
            if (showContent) {
                return (
                    <div className="modal">
                        <div className="modal-container">
                            <h2> Leaderboard </h2>
                            {this.state.leaderboard.map((entry, index) => {
                                return (
                                    <div key={entry.key}>
                                        {index + 1}. {entry.name} - {entry.score}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        };

        const gameInfoContent = (showContent) => {
            if (showContent) {
                return (
                    <div className="instruction">
                        <p>Match the definition to the correct word</p>
                    </div>
                );
            } else {
                return null;
            }
        };

        return (
            <div>
                <div>
                    <button className="btn-leaderboard" onClick={this.toggleAboutGame}>How to Play</button>
                    {gameInfoContent(this.state.gameInfoShown)}
                </div>
                <div>
                    <button className="btn-leaderboard" onClick={this.toggleLeaderboard}>
                        Show leaderboard
                    </button>
                    {leaderboardContent(this.state.leaderboardShown)}
                </div>
            </div>
        );
    }
}

export default Leaderboard;
