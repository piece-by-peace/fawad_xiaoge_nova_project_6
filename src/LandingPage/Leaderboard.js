import React, { Component } from 'react';
import { leaderboardDbRef } from '../firebase';

class Leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: {}
        };
    }

    componentDidMount() {
        // Get the top 10 entries, ordered by score
        leaderboardDbRef
            .orderByChild('score')
            .limitToLast(10)
            .once('value', (snapshot) => {
                const leaderboard = snapshot.val();

                console.log(leaderboard);
                if (leaderboard != null) {
                    this.setState({ leaderboard: leaderboard });
                }
            });
    }


    render() {
        return (
        <div>
            <h2> Leaderboard </h2>
            { Object.entries(this.state.leaderboard)
                .sort((a, b) => b[1].score - a[1].score)
                .map(([key, leader]) => {
                    return (
                        <div key={leader.key}>
                            {leader.score} - {leader.name}
                        </div>
                    );
                })
            }
        </div>
        );
    }
}

export default Leaderboard;