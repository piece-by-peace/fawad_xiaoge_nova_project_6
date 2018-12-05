import React, { Component } from 'react';
import axios from 'axios';

// const stockWords = ['capital', 'hour', 'meet', 'storey', 'lute', 'phase', 'praise', 'pried', 'trussed', 'moat',
//    'sealing', 'chili', 'straight', 'jell', 'jeans', 'idol', 'faint', 'yolk', 'troop', 'alter',
//    'cokes', 'draft', 'reek', 'vain', 'vail', 'colonel', 'chords', 'rye', 'lichens', 'sack',
//    'queue', 'coup', 'bail', 'peace', 'piers', 'pour', 'bridal', 'whether', 'creek', 'effect']

class Questions extends Component {
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
                'there',
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
        let testArray = [];
        const axiosArray = randomSet.map((word) => {
            return axios({
                method: 'GET',
                url: `https://api.datamuse.com/words?rel_hom=${word}&md=d`,
                dataType: 'json',
            });
        });

        axios.all(axiosArray).then(
            axios.spread((...results) => {
                const response = results.map((result) => {
                    return {
                        homophone: result.data[0].word,
                    };
                });
                this.setState({
                    questionSet: response,
                });
                console.log(this.state.questionSet);
            })
        );

        // for (let i = 0; i < randomSet.length; i++) {
        //    axios({
        //       method: 'GET',
        //       url: `https://api.datamuse.com/words?rel_hom=${randomSet[i]}&md=d`,
        //       dataType: 'json',
        //    }).then((result) => {
        //       console.log(result)

        //          // console.log("Meets condition", result.data[0].word)
        //          testArray.push(result
        //             // {
        //             //    originalWord: randomSet[i],
        //             //    homophone: result.data[0].word,
        //             //    answer: result.data[0].word
        //             // }
        //          )

        //    });
        // }
        // console.log(testArray)
        // this.setState({
        //    questionSet : testArray
        // },()=>{
        //    // console.log(this.state.questionSet)
        // })
        // console.log(testArray);
    }

    render() {
        // console.log(this.state.questionSet)
        return (
            <div>
                {this.state.questionSet.map((question) => {
                    // console.log(question)
                    return <p>{question.homophone}</p>;
                })}
            </div>
        );
    }
}

export default Questions;
