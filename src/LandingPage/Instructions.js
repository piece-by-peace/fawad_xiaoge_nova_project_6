import React, { Component } from 'react';

class Instructions extends Component {
   constructor(){
      super();
      this.state = {
         gameInfoShown: false
      }
   }

   toggleAboutGame = () => {
      this.setState((currentState) => {
         return { gameInfoShown: !currentState.gameInfoShown };
      });
   };

   render(){

      const gameInfoContent = (showContent) => {
         if (showContent) {
            return (
               <div className="instruction">
                  <p>Match the definition to the correct word</p>
               </div>
            );
         } else {
            return null;
         }
      };

      return(
         <div>
            <button onClick={this.toggleAboutGame}>How to Play</button>
            {gameInfoContent(this.state.gameInfoShown)}
         </div>
      )
   }
}
export default Instructions;