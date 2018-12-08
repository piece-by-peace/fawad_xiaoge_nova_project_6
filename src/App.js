import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';
import Header from './Header';
import LandingPage from './LandingPage';

let totalGameTime = 0;
let counter = 0;
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

  timerLevelStartGame = (e) => {
    e.preventDefault();
    const userDifficulty = e.target.value;

    switch (userDifficulty) {
      case "easy":
        totalGameTime = 60;
        break;
      case "medium":
        totalGameTime = 45;
        break;
      case "hard":
        totalGameTime = 30;
        break;
      default:
        alert("How did you manage to break the difficulty setting...");
        break;
    }

    this.displayTime();
    // Set the timer to a variable so that clearInterval() can be called when the time runs out or if the user exits the game.
    counter = setInterval(this.timer1, 1000);
  };

  displayTime = () => {
    let strTime;

    if (totalGameTime >= 45) {
      if (totalGameTime % 60 < 10) {
        strTime = `${Math.floor(totalGameTime / 60)}:0${totalGameTime % 60}`;
      } else {
        strTime = `${Math.floor(totalGameTime / 60)}:${totalGameTime % 60}`;
      }
    } else if (totalGameTime < 10) {
      strTime = `0:0${totalGameTime}`
    } else {
      strTime = `0:${totalGameTime}`
    }
    let timer = document.getElementById('timer');
    timer.innerHTML = 0;
    timer.innerHTML = strTime;

    // For debugging purposes
    console.log(totalGameTime);
  }

  timer1 = () => {
    if (totalGameTime <= 0) {
      this.endGame();
    } else {
      totalGameTime--;
    }
    this.displayTime();
  }

  endGame = () => {
    clearInterval(counter);
  }

  render() {
    return (
      <div>
        <Header score={this.state.score} timer={totalGameTime} />
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
