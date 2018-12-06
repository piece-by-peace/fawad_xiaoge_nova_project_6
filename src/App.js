import React, { Component } from 'react';
import './App.scss';
import QuestionContainer from './Questions/QuestionContainer';
import LandingPage from './LandingPage';

class App extends Component {
    render() {
        return (
            <div className="App">
                <LandingPage />
                <QuestionContainer />
            </div>
        );
    }
}

export default App;
