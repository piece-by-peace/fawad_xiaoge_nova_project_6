import React, { Component } from 'react';
import axios from 'axios';
import './App.scss'
import Question from './Questions/Question';
import Header from './Questions/Header';
import LandingPage from './LandingPage/LandingPage';
import Leaderboard from './LandingPage/Leaderboard';
import stockWords from './Questions/data';
import { leaderboardDbRef } from './firebase';
import Footer from './Footer';

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
            userName: ''
        };
    }

    componentDidMount() {
        this.generateWordSet();
        this.updateLeaderboard();
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
        // based on the number of words in randomSet call the API and pass the word and return its homophone and definition and push them into the questionSet array by building an object for each question

        // randomly  chooses a button configuration for displaying the two words

        const getRandomPosition = () => {
            const randomPosition = Math.floor(Math.random() * 2);
            return randomPosition;
        };

        const axiosArray = randomSet.map((word) => {
            // still keeping the old axios had to use proxy after deploying the firebase app
            // return axios({
            //     method: 'GET',
            //     url: `https://api.datamuse.com/words?rel_hom=${word}&md=d`,
            //     dataType: 'json'
            // });
            return axios({
                url: 'https://proxy.hackeryou.com',
                dataResponse: 'json',
                method: 'GET',
                params: {
                    reqUrl: `https://api.datamuse.com/words?rel_hom=${word}&md=d`
                }
            });
        });

        return axios.all(axiosArray).then((results) => {
            const response = results.map((result, i) => {
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

    updateLeaderboard = () => {
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

    counter = null;

    updateScore = (score) => {

        this.setState((currentState) => {
            return { score: currentState.score + score };
        });
        this.showNextQuestion();
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
            // for Try Again functionality
            .then(() => {
                this.setState({ userDifficulty: '', index: 0, score: 0 });
                this.generateWordSet();
            });
        this.setState({
            userName: ""
        })
    };


    render() {

        return (
            <div className="wrapper">
                {this.state.userDifficulty === '' ? (
                    <div>
                        <LandingPage
                            handleOnClickButton={this.timerLevelStartGame}
                        />
                        <Footer />
                    </div>
                ) : (

                        (this.state.currentGameTime === 0 && this.state.userDifficulty !== '') || (this.state.index > 9) ?
                            <div>
                                <Header score={this.state.score} currentTime={this.state.currentGameTime} />

                                {(this.state.index > 9) ?
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        data-name="Layer 1"
                                        viewBox="0 0 72 90" x="0px" y="0px">
                                        <path d="M35.76,56.34a1,1,0,0,1-.71-.3l-5.8-5.8a4.08,4.08,0,0,1-.54.63,5,5,0,0,1-7.09,0,5,5,0,0,1,0-7.09,4.61,4.61,0,0,1,.63-.54l-5.8-5.8a1,1,0,0,1,0-1.41l6.77-6.77a1,1,0,0,1,1.66.4,3,3,0,1,0,5-3.07,2.86,2.86,0,0,0-1.2-.73,1,1,0,0,1-.67-.72,1,1,0,0,1,.27-.94l6.77-6.77a1,1,0,0,1,1.41,0l5.8,5.8a4.08,4.08,0,0,1,.54-.63,5,5,0,0,1,7.1,7.09,4.69,4.69,0,0,1-.64.54L55.07,36a1,1,0,0,1,0,1.41l-6.78,6.77a1,1,0,0,1-.94.27,1,1,0,0,1-.71-.67,3,3,0,0,0-.74-1.2,3,3,0,0,0-4.27,4.27,3,3,0,0,0,1.21.73,1,1,0,0,1,.66.72,1,1,0,0,1-.27.94L36.46,56A1,1,0,0,1,35.76,56.34ZM29,47.57a1,1,0,0,1,.7.29l6.07,6.06,5.09-5.09a5.3,5.3,0,0,1-.63-.54,5,5,0,0,1,7.1-7.09,5.35,5.35,0,0,1,.53.63l5.09-5.1-6.06-6.06a1,1,0,0,1-.27-.94,1,1,0,0,1,.67-.72,3,3,0,0,0,1.2-.73,3,3,0,0,0,0-4.27,3.09,3.09,0,0,0-4.27,0,3,3,0,0,0-.73,1.2,1,1,0,0,1-.72.67,1,1,0,0,1-.94-.27l-6.06-6.06-5.1,5.09a4.65,4.65,0,0,1,.63.53,5,5,0,0,1-7.09,7.1,5.3,5.3,0,0,1-.54-.63l-5.09,5.09,6.06,6.07a1,1,0,0,1,.27.94,1,1,0,0,1-.67.72,3,3,0,0,0-1.2.73,3,3,0,1,0,4.27,4.27,3,3,0,0,0,.73-1.2,1,1,0,0,1,.72-.67A1,1,0,0,1,29,47.57Z" />
                                        <path d="M35.76,11a1,1,0,0,1-1-1V3.5a1,1,0,0,1,2,0V10A1,1,0,0,1,35.76,11Z" /><path d="M35.76,70.5a1,1,0,0,1-1-1V63a1,1,0,0,1,2,0v6.5A1,1,0,0,1,35.76,70.5Z" /><path d="M68.75,37.5h-6.5a1,1,0,0,1,0-2h6.5a1,1,0,0,1,0,2Z" /><path d="M9.26,37.5H2.76a1,1,0,1,1,0-2h6.5a1,1,0,0,1,0,2Z" /><path d="M12.53,24.75a.94.94,0,0,1-.48-.13l-5.7-3.13a1,1,0,1,1,1-1.75L13,22.87a1,1,0,0,1,.4,1.36A1,1,0,0,1,12.53,24.75Z" /><path d="M64.68,53.38a1,1,0,0,1-.48-.12l-5.7-3.13a1,1,0,0,1,1-1.76l5.69,3.13a1,1,0,0,1-.48,1.88Z" /><path d="M48.51,14.27a1,1,0,0,1-.88-1.48l3.13-5.7a1,1,0,0,1,1.36-.39,1,1,0,0,1,.39,1.35l-3.12,5.7A1,1,0,0,1,48.51,14.27Z" /><path d="M19.88,66.42a1.07,1.07,0,0,1-.49-.12A1,1,0,0,1,19,64.94l3.13-5.7a1,1,0,0,1,1.75,1l-3.13,5.7A1,1,0,0,1,19.88,66.42Z" /><path d="M21.82,15a1,1,0,0,1-.85-.48L17.56,9a1,1,0,0,1,1.7-1.06l3.41,5.53a1,1,0,0,1-.32,1.38A1,1,0,0,1,21.82,15Z" /><path d="M53.11,65.57a1,1,0,0,1-.85-.48l-3.42-5.53a1,1,0,0,1,1.7-1.05L54,64a1,1,0,0,1-.33,1.38A1,1,0,0,1,53.11,65.57Z" /><path d="M58.3,23.56a1,1,0,0,1-.85-.47,1,1,0,0,1,.32-1.38L63.3,18.3a1,1,0,0,1,1.37.32A1,1,0,0,1,64.35,20l-5.53,3.42A1,1,0,0,1,58.3,23.56Z" /><path d="M7.69,54.85A1,1,0,0,1,7.16,53l5.53-3.42a1,1,0,1,1,1.05,1.7L8.21,54.7A1,1,0,0,1,7.69,54.85Z" />
                                    </svg>
                                    :
                                    <svg className="timerSVG"
                                        xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" space="preserve"><g><g><path d="M71.521,23.399c0,6.842-21.832,24.322-21.832,24.322S28.479,31.541,28.479,23.399c0-3.509,0-4.577,0-4.577h43.042    C71.521,18.823,71.521,18.695,71.521,23.399z" /></g><g><path d="M72.22,86.161H27.781c0,0,0-1.812,0-5.128c0-3.317,22.046-10.97,22.046-10.97s22.393,7.247,22.393,10.97    C72.22,84.754,72.22,86.161,72.22,86.161z" /></g><path d="M86.919,91H83V76.534c0-11.436-10.389-21.659-16.183-26.474C72.559,45.02,83,34.375,83,23.649V9h3.919   c2.622,0,4.748-1.915,4.748-4.5S89.541,0,86.919,0H13.081c-2.622,0-4.747,1.915-4.747,4.5S10.459,9,13.081,9H16v14.649   c0,10.982,10.714,21.589,16.476,26.543c-1.752,1.537-4.018,3.606-6.236,6.024C19.483,63.587,16,70.423,16,76.534V91h-2.919   c-2.622,0-4.747,1.916-4.747,4.5s2.125,4.5,4.747,4.5h73.838c2.622,0,4.748-1.916,4.748-4.5S89.541,91,86.919,91z M24,76.534   c0-8.745,12.084-19.922,16.813-23.488c0.924-0.693,1.365-1.777,1.355-2.923c-0.01-1.146-0.42-2.22-1.355-2.9   C36.096,43.796,24,32.881,24,23.649V9h52v14.649c0,9.01-12.006,20.092-16.705,23.6c-0.943,0.703-1.39,1.809-1.367,2.974   c0.022,1.164,0.463,2.251,1.433,2.917C64.028,56.352,76,66.815,76,76.534V91H24V76.534z" /></g>
                                    </svg>
                                }

                                <div className="input-wrapper">
                                    <label htmlFor="userName" className="visually-hidden"> Enter your name </label>
                                    <input id="userName" className="input-field" type="text" value={this.state.userName} onChange={this.handleUserNameInput} placeholder="Enter your name" required />
                                    <button onClick={this.handleSubmitScore}>Submit Score</button>
                                </div>
                                <Leaderboard />
                                <Footer />
                            </div>
                            :
                            <div>
                                <Header score={this.state.score} currentTime={this.state.currentGameTime} />
                                <Question
                                    data={this.state.questionSet[this.state.index]}
                                    updateScore={this.updateScore}
                                />
                                <Footer />
                            </div>
                    )}
            </div>
        );
    }
}

export default App;