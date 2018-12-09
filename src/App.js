import React, { Component } from 'react';
import axios from 'axios';
import './App.scss'
import Question from './Questions/Question';
import Header from './Questions/Header';
import LandingPage from './LandingPage/LandingPage';
import stockWords from './Questions/data';

import { leaderboardDbRef } from './firebase';

class App extends Component {
    constructor() {
        super();
        this.state = {
            // words picked randomly from stockWords
            stockWords: stockWords,
            score: 0,
            // Array of questions
            questionSet: [],
            index: 0,
            userDifficulty: '',
            currentGameTime: 0,
            userName: '',
        };
    }

    componentDidMount() {
        this.generateWordSet();
    }

    generateWordSet = () => {
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

        return axios.all(axiosArray).then((results) => {
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
    };

    counter = null;

    updateScore = (score) => {
        console.log('before update score', this.state.score);

        this.setState((currentState) => {
            return { score: currentState.score + score };
        });
        this.showNextQuestion();
        console.log('new score', this.state.score);
    };

    showNextQuestion = () => {
        if (this.state.index >= 9) {
            this.endGame();
        }

        this.setState((currentState) => {
            return { index: currentState.index + 1 };
        });
    };

    timerLevelStartGame = (e) => {
        e.preventDefault();

        const userDifficulty = e.target.value;
        let selectedGameTime = 0;

        switch (userDifficulty) {
            case 'easy':
                selectedGameTime = 60;
                break;
            case 'medium':
                selectedGameTime = 45;
                break;
            case 'hard':
                selectedGameTime = 30;
                break;
            default:
                alert('How did you manage to break the difficulty setting...');
                break;
        }

        this.setState({ 
            currentGameTime: selectedGameTime,
            userDifficulty: userDifficulty, 
        });

        console.log(userDifficulty);
        // Set the timer to a variable so that clearInterval() can be called when the time runs out or if the user exits the game.
        this.counter = setInterval(this.updateGameTime, 1000);
    };

    updateGameTime = () => {
        const currentGameTime = this.state.currentGameTime;
        if (currentGameTime <= 0) {
            this.endGame();
        } else {
            this.setState({ currentGameTime: currentGameTime - 1 });
        }
    };

    endGame = () => {
        clearInterval(this.counter);
        this.setState({ currentGameTime: 0 });
    };

    handleUserNameInput = (e) => {
        this.setState({ userName: e.target.value });
    };

    handleSubmitScore = (e) => {
        e.preventDefault();

        // Add their score to the db
        leaderboardDbRef.push().set({
            name: this.state.userName || 'Anonymous',
            score: this.state.score,
        })
        .then(() => {
            this.setState({ userDifficulty: '', index: 0, score: 0 });
            this.generateWordSet();
        });
    };

    render() {
        return (
            <div className="wrapper">
                <Header score={this.state.score} currentTime={this.state.currentGameTime} />

                {this.state.userDifficulty === '' ? (
                    <LandingPage
                        handleOnClickButton={this.timerLevelStartGame}
                    />
                ) : (
                    <Question
                        data={this.state.questionSet[this.state.index]}
                        updateScore={this.updateScore}
                    />
                )}
                
                {this.state.index > 9 ?
                    (<div>
                        <button>Show results</button> 
                        <span> Enter your name </span>
                        <input type="text" value={this.state.userName} onChange={this.handleUserNameInput} required/>
                        <button onClick={this.handleSubmitScore}>Submit Score</button>
                    </div>)
                    
                    : null
                }
            </div>
        );
    }
}

export default App;
