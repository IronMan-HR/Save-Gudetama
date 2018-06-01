import React from 'react';
import Brick from './Brick.jsx';
import axios from 'axios';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      username: '',
      dictionary: {},
      words: [],
      time: 0,
      timeInterval: 1000,
      round: 'roundOne',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWord = this.addWord.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.sendScore = this.sendScore.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
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

  stopGame(intervals) {
    document.getElementById('gudetama').style.display = "none";
    document.getElementById("typing-input").disabled = true;
    intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.sendScore(this.state.username, this.state.time);
    this.setState({
      //gudetama: "https://i2-prod.irishmirror.ie/incoming/article11358170.ece/ALTERNATES/s615/I171017_153342_1646320oTextTRMRMMGLPICT000055183128o.jpg",
      // words: [],
      // time: 0,
    })
  }

  startGame(e) {
    e.preventDefault();
    document.getElementById("typing-input").focus();
    document.getElementById("overlay").style.display = "none";
    var timeInterval = setInterval(() => {
      var currentTime = this.state.time + 1;
      if (currentTime > 14) {
        this.setState({
          time: currentTime,
          round: 'roundThree',
        });
      } else if (currentTime > 7) {
        this.setState({
          time: currentTime,
          timeInterval: 500,
          round: 'roundTwo',
        });
      } else {
        this.setState({
          time: currentTime,
        });
      }
    }, 1000);
    
    var wordInterval = setInterval(() => {
      this.addWord();
      if (this.state.words.length >= 20) {
        this.stopGame([timeInterval, wordInterval]);
      }
    }, 1000); 
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
    var index = this.state.words.indexOf(this.state.userInput);
    
    if (index !== -1) {
      var newWords = this.state.words.slice();
      newWords.splice(index, 1);
      this.setState({
        words: newWords,
      });
    }

    this.setState({
      userInput: '',
    });
  }

  render() {
    return (
      <div className="game">
        <div id="overlay">
          <p>Humpty Dumpty sat on a wall,</p><br></br>
          <p>Humpty Dumpty had a great fall.</p><br></br>
          <p>All the king's horses and all the king's men</p><br></br>
          <p>Couldn't put Humpty together again.</p><br></br>
          <p>HURRY - KEEP TYPING TO PREVENT HIS DEMISE!</p><br></br>
          <div>
            <form onSubmit={this.startGame}>
              <p></p>
              <input placeholder="Who are you?" value={this.state.username} onChange={this.handleUserNameChange} autoFocus/>
            </form>
          </div>
          <div id="overlay-start" onClick={this.startGame} className="blinking">START GAME</div>
        </div>

        <div className="timer">
          <h1>{this.state.time}</h1>
        </div>

        {/* <div className="wall"></div> */}

        <div className="play" > 
          {this.state.words.map((word, index) => {
            return <Brick word={word} key={index} />
          })}
          <div id="gudetama" ></div>
          <form onSubmit={this.handleSubmit} >
            <input id="typing-input" value={this.state.userInput} onChange={this.handleChange} />
          </form>
        </div>
      </div>
    )
  }
}

export default Game;