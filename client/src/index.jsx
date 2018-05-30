import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import Scoreboard from './components/Scoreboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="app-container">
        <h1>Our awesome game</h1>
        <Game />
        <Scoreboard />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));