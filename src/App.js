import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';
import Header from './Header';
import LandingPage from './LandingPage';

class App extends Component {
    constructor() {
        super();
        this.state = {
            // words picked randomly from stockWords
            stockWords: [
                'capital',
                'mind',
                'meet',
                'storey',
                'lute',
                'phase',
                'praise',
                'pried',
                'see',
                'moat',
                'sealing',
                'chili',
                'straight',
                'jell',
                'jeans',
                'idol',
                'faint',
                'yolk',
                'troop',
                'alter',
                'cokes',
                'draft',
                'reek',
                'vain',
                'vail',
                'colonel',
                'chords',
                'rye',
                'lichens',
                'sack',
                'their',
                'coup',
                'bail',
                'peace',
                'piers',
                'pour',
                'bridal',
                'whether',
                'creek',
                'effect',
            ],
            score: 0,
            timer: 0,
            // Array of questions
            questionSet: [],
            index: 0,
        };
    }

    componentDidMount() {
        // build the randomSet array by choosing words randomly from stockWords without repeating
        // Fisher-Yates algorithm to create random array
        let stockWords = Array.from(this.state.stockWords);
        let randomSet = [];
        for (var i = stockWords.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = stockWords[i];
            stockWords[i] = stockWords[j];
            stockWords[j] = temp;
        }
        for (let i = 0; i < 10; i++) {
            randomSet.push(stockWords[i]);
        }
        console.log(randomSet);
        // based on the number of words in randomSet call the API and pass the word and return its homophone and definition and push them into the questionSet array by building an object for each question

        // randomly  chooses a button configuration for displaying the two words

        const getRandomPosition = () => {
            const randomPosition = Math.floor(Math.random() * 2);
            return randomPosition;
        };

        const axiosArray = randomSet.map((word) => {
            return axios({
                method: 'GET',
                url: `https://api.datamuse.com/words?rel_hom=${word}&md=d`,
                dataType: 'json',
            });
        });

        axios.all(axiosArray).then((results) => {
            const response = results.map((result, i) => {
                // console.log(result);
                return {
                    originalWord: randomSet[i],
                    homophone: result.data[0].word,
                    definition: result.data[0].defs[0],
                    answer: result.data[0].word,
                    wordPosition: getRandomPosition(),
                };
            });
            this.setState({
                questionSet: response,
            });
        });
        console.log();
    }

    showNextQuestion = () => {
        this.setState((currentState) => {
            console.log(currentState.index + 1);
            return { index: currentState.index + 1 };
        });
    };

    updateScore = (score) => {
        console.log('before update score', this.state.score);
        this.setState((currentState) => {
            return { score: currentState.score + score };
        });
        this.showNextQuestion();
        console.log('new score', this.state.score);
    };

    startTimer = (totalGameTime) => {
        console.log('State timer', this.state.timer);
        // timer = this.state.timer;
        document.getElementById('timer').innerHTML = this.state.timer;
        totalGameTime--;
        if (totalGameTime < 0) {
            alert('You lose!');
        } else {
            setTimeout(this.startTimer, 1000);
        }
    };

    //  startTimer = (duration, display) => {
    //     var timer = duration, minutes, seconds;
    //     setInterval = () => {
    //         minutes = parseInt(timer / 60, 10)
    //         seconds = parseInt(timer % 60, 10);

    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;

    //         display.textContent = minutes + ":" + seconds;

    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000;
    // }

    // window.onload =  () =>  {
    //     var fiveMinutes = 60 * 0.5,
    //         display = document.querySelector('#timer');
    //     startTimer(fiveMinutes, display);
    // };

    timerLevelStartGame = (e) => {
        e.preventDefault();
        const userDifficulty = e.target.value;
        console.log(userDifficulty);

        let totalGameTime = 0;

        if (userDifficulty === 'easy') {
            totalGameTime = 60;
        } else if (userDifficulty === 'medium') {
            totalGameTime = 45;
        } else {
            totalGameTime = 30;
        }

        this.setState({
            timer: 20,
        });

        // console.log(
        //     'before setting the state to totalGameTime',
        //     this.state.timer
        // );
        // console.log('total game time', totalGameTime);

        // this.setState((currentState) => {
        //     return { timer: 20 };
        // });
        console.log('Timer in Timer', this.state.timer);

        // console.log('state of time after setting state', this.state.timer);
        // console.log('this is the totalGame time', totalGameTime);
        // console.log(
        //     'this is the data type of totalGameTime',
        //     typeof totalGameTime
        // );

        this.startTimer(this.state.timer);
    };

    render() {
        return (
            <div className="wrapper">
                <Header score={this.state.score} timer={this.state.timer} />
                <LandingPage handleOnClickButton={this.timerLevelStartGame} />
                <Question
                    data={this.state.questionSet[this.state.index]}
                    updateScore={this.updateScore}
                />
                {this.state.index > 9 ? <button>Show results</button> : null}
            </div>
        );
    }
}

export default App;
