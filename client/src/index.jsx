import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import Scoreboard from './components/Scoreboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  componentDidMount() {
    var username = prompt("What is your username?");
    if (username === null || username === "") {
      username = "default";
    }
    this.setState({
      username: username,
    });
  }

  render() {
    return (
      <div className="app-container">
        <nav>
          <h1>SAVE GUDETAMA!</h1>
        </nav>  
        <div className="game-container">
          <Game username={this.state.username}/>
          <Scoreboard />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));