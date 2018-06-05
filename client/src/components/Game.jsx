import React from 'react';
import Brick from './Brick.jsx';
import axios from 'axios';
const io = require('socket.io-client'); 
const socket = io();

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      username: '',
      dictionary: {},
      words: [],
      theirWords: ["this", "is", "a", "test"],
      time: 0,
      timeInterval: 1000,
      round: 'all',
      instructions: `Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men\nCouldn't put Humpty together again.\nHURRY - KEEP TYPING TO PREVENT HIS DEMISE!`,
      prompt: 'START GAME',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWord = this.addWord.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.sendScore = this.sendScore.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.updateWordList = this.updateWordList.bind(this);
    socket.on('receive from opponent', (payload) => {
      this.updateWordList(payload);
    });
  }

  componentDidMount() {
    axios.get('/dictionary')
    .then(results => {
      this.setState({
        dictionary: results.data,
      })
    }).catch(err => {
      console.error(err);
    });

    socket.emit('room', {room: this.props.room});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.words.length !== prevState.words.length) {
      socket.emit('send to opponent', {
        room: this.props.room,
        newWords: this.state.words,
      }) 
    }
  }

  updateWordList(words) {
    this.setState({
      theirWords: words
    })
  }

  componentWillUnmount() {  
    socket.emit('leaving room', {
      room: this.props.room
    });
  }

  addWord() {
    var availableWords = this.state.dictionary[this.state.round];
    var newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    this.setState({
      words: [...this.state.words, newWord]
    });
  }

  sendScore(username, score) {
    axios.post('/wordgame', {
      "username": username,
      "high_score": score
    })
    .then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    })
  }

  stopGame() {
    document.getElementById('gudetama').style.display = "none";
    document.getElementById('typing-input').disabled = true;
    document.getElementById('overlay').style.display = "block";

    // enables user to hit "enter" after 2 seconds to restart game
    setTimeout(() => {
      if (document.getElementById('overlay').display !== "none") {
        document.getElementById("user-input").focus();
      }
    }, 2000);
    
    this.sendScore(this.state.username, this.state.time);
    
    this.setState({
      instructions: 'GAME OVER',
      prompt: 'REPLAY',
    });
  }

  startGame(e) {
    e.preventDefault();
    document.getElementById('typing-input').disabled = false;
    document.getElementById('typing-input').focus();
    document.getElementById('overlay').style.display = "none";
    document.getElementById('gudetama').style.display = "block";
    document.getElementById('gudetama').style.backgroundColor = "rgba(255, 0, 0, 0)";

    // long function to define what happens at every interval
    var go = () => {
      // creates a loop by calling itself:
      var step = setTimeout(() => {
        go();
      }, this.state.timeInterval);

      this.addWord();

      // ends game or changes background color of gudetama based on length of "words" array
      if (this.state.words.length >= 20) {
        clearTimeout(step);
        this.stopGame();
      } else if (this.state.words.length > 15) {
        document.getElementById('gudetama').style.backgroundColor = "rgba(255, 0, 0, 1)";
      } else if (this.state.words.length > 10) {
        document.getElementById('gudetama').style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      }

      // updates the time and speeds up the game accordingly 
      var newTime = this.state.time + 1;
      if (newTime > 20) {
        this.setState({
          time: newTime,
          timeInterval: 600,
          //round: 'roundThree', // uncomment these to only serve short words at beginning, long words at end
        });
      } else if (newTime > 8) { 
        this.setState({
          time: newTime,
          timeInterval: 800,
          //round: 'roundTwo',
        });
      } else {
        this.setState({
          time: newTime,
          //round: 'roundOne',
        });
      }
    }

    // blank slate, then start!
    this.setState({
      words: [],
      time: 0,
      timeInterval: 1000,
      userInput: '',
    }, () => go());
  
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value,
    })
  }

  handleUserNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var submittedWord = this.state.userInput;
    var index = this.state.words.indexOf(submittedWord);
    
    // check if what they typed is in our "words" array
    if (index !== -1) {
      document.getElementById("typing-input").style.backgroundColor = "green";
      setTimeout(() => {
        document.getElementById("typing-input").style.backgroundColor = "white";
      }, 100);
      var newWords = this.state.words.slice();
      newWords.splice(index, 1);
      this.setState({
        words: newWords,
      });
    } else {
      document.getElementById("typing-input").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("typing-input").style.backgroundColor = "white";
      }, 100);
    }

    this.setState({
      userInput: '',
    });
  }

  render() {
    return (
      <div className="game">
        <div id="overlay">
          <p>{this.state.instructions}</p><br></br>
          <div>
            <form onSubmit={this.startGame} autoComplete="off">
              <p></p>
              <input id="user-input" placeholder="Who are you?" value={this.state.username} onChange={this.handleUserNameChange} autoFocus/>
            </form>
          </div>
          <div id="overlay-start" onClick={this.startGame} className="blinking">{this.state.prompt}</div>
        </div>
    
        <div className="timer">
          <h1>{this.state.time}</h1>
        </div>

        <div className="board">
          {/* your game: */}
          <div className="play" > 
            {this.state.words.map((word, index) => {
              return <Brick word={word} key={index} />
            })}
            <div id="gudetama" ></div>
            <form onSubmit={this.handleSubmit} autoComplete="off" >
              <input id="typing-input" value={this.state.userInput} onChange={this.handleChange} />
            </form>
          </div>
          {/* their game: */}
          <div className="play"> 
            {this.state.theirWords.map((word, index) => {
              return <Brick word={word} key={index} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Game;