import React, { Component } from 'react';
// Components
import Game from './Components/Game/Game';

// Styles
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}
