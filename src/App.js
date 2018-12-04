import React, { Component } from 'react';
import './App.scss';
import Questions from './Questions/Questions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Questions />
      </div>
    );
  }
}

export default App;
