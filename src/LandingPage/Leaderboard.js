import React, { Component } from 'react';
import { leaderboardDbRef } from '../firebase';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            leaderboard: [],
            leaderboardShown: false,
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

    render() {
        const leaderboardContent = (showContent) => {
            if (showContent) {
                return (
                    <div>
                        <h2> Leaderboard </h2>
                        {this.state.leaderboard.map((entry, index) => {
                            return (
                                <div key={entry.key}>
                                    {index + 1}. {entry.name} - {entry.score}
                                </div>
                            );
                        })}
                    </div>
                );
            } else {
                return null;
            }
        };

        return (
            <div>
                <button onClick={this.toggleLeaderboard}>
                    Show leaderboard
                </button>
                {leaderboardContent(this.state.leaderboardShown)}
            </div>
        );
    }
}

export default Leaderboard;
