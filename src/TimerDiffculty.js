import React, { Component } from 'react';

class TimerDiffculty extends Component {
    constructor() {
        super();
    }
    TimerLevel = () => {
        const userDifficulty = document.getElementsByName('difficulty').value;

        // const userDifficulty = document.getElementsByName('difficulty').checked
        // .value;
        console.log(userDifficulty);
    };

    render() {
        return (
            <div>
                <h2>Choose difficulty</h2>
                <form>
                    <label htmlFor="easy">Easy</label>
                    <input
                        value="easy"
                        id="easy"
                        name="difficulty"
                        type="radio"
                    />

                    <label htmlFor="medium">Medium</label>
                    <input
                        id="medium"
                        name="difficulty"
                        value="medium"
                        type="radio"
                    />

                    <label htmlFor="hard">Hard</label>
                    <input
                        id="hard"
                        name="difficulty"
                        value="hard"
                        type="radio"
                    />
                </form>
                <button onClick={this.TimerLevel}>TEST</button>
            </div>
        );
    }
}

// <button onclick="onTimer()">Clickme</button>
//     <div id="mycounter"></div>
//     <script>
//         i = 60;
// function onTimer() {
//             document.getElementById('mycounter').innerHTML = i;
//         i--;
//   if (i < 0) {
//             alert('You lose!');
//         }
//   else {
//             setTimeout(onTimer, 1000);
//         }
//       }
// </script>

export default TimerDiffculty;
