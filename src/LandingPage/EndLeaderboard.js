import React, { Component } from 'react';
import { leaderboardDbRef } from '../firebase';

class EndLeaderboard extends Component {
   constructor() {
      super();
      this.state = {
         leaderboard: [],
         leaderboardShown: false
      }
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

   render() {
      return (
         <div>
            <h2> Leaderboard </h2>
            <div className="entries">
               {this.state.leaderboard.map((entry, index) => {
                  return (
                     <div className="entry" key={entry.key}>
                        {index + 1}. {entry.name} - {entry.score}
                     </div>
                  );
               })}
            </div>
         </div>
      );
   }
}