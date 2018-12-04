import React, { Component } from 'react';
import axios from 'axios';

const stockWords = ['capital', 'hour', 'meet', 'storey', 'lute', 'phase', 'praise', 'pried', 'trussed', 'moat', 
   'sealing', 'chili', 'straight', 'jell', 'jeans', 'idol', 'faint', 'yolk', 'troop', 'alter',
   'cokes', 'draft', 'reek', 'vain', 'vail', 'colonel', 'chords', 'rye', 'lichens', 'sack',
   'queue', 'coup', 'bail', 'peace', 'piers', 'pour', 'bridal', 'whether', 'creek', 'effect']
class Questions extends Component {
   constructor(){
      super();
      this.state = {
         // words picked randomly from stockWords
         randomSet: [],
         score: 0,
         // Array of questions
         questionSet: []
      };
   }
   
   componentDidMount() {
      // build the randomSet array by choosing words randomly from stockWords without repeating
      // Fisher-Yates algorithm to create random array
      for (var i = stockWords.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = stockWords[i];
         stockWords[i] = stockWords[j];
         stockWords[j] = temp;
      }
      for (let i = 0; i < 10; i++) {
         this.state.randomSet.push(stockWords[i])
      }

      axios({
         method: 'GET',
         url: 'https://api.datamuse.com/words?rel_hom=hughes&md=d',
         dataType: 'json',
      }).then((result)=>{
         console.log(result.data.filter((word)=>{
            return word.defs != null
         }));
      });
   }
   render(){
      return(
         <h1>Question</h1>
      )
   }
}

export default Questions;