import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';

// stockWords: [
//     'capital',
//     'mind',
//     'meet',
//     'storey',
//     'pried',
//     'see',
//     'moat',
//     'sealing',
//     'chili',
//     'straight',
//     'jell',
//     'jeans',
//     'idol',
//     'faint',
//     'yolk',
//     'troop',
//     'alter',
//     'cokes',
//     'draft',
//     'vain',
//     'colonel',
//     'chords',
//     'rye',
//     'lichens',
//     'sack',
//     'coup',
//     'bail',
//     'peace',
//     'piers',
//     'pour',
//     'bridal',
//     'whether',
//     'creek',
//     'effect',
// ],

class QuestionContainer extends Component {
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

        // randomly chooses a definiton to display on screen, either def of word1 (originalword passed into api) or def of word2(homophone)
        const getRandomPosition = () => {
            const randomPosition = Math.floor(Math.random() * 2);
            return randomPosition;
        };

        // const getPosition = () => {
        //     const word0Position = randomPosition();

        //     if (word0Post == 0) {
        //         word1Post = 1;
        //     } else if (word0Post == 1) {
        //         word1Post = 0;
        //     }
        //     return word0Post, word1Post;
        // };

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

                    // words: result.data,
                    // choosenDef: chooseDef(), // choose random 0 or 1
                };
                console.log();
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

    render() {
        return (
            <div>
                <Question data={this.state.questionSet[this.state.index]} />
                {this.state.index < 9 ? (
                    <button onClick={this.showNextQuestion}>
                        Next Question
                    </button>
                ) : (
                    <button>Show results</button>
                )}
            </div>
        );
    }
}

export default QuestionContainer;
