import React from 'react';
import Brick from './Brick.jsx';
import dictionary from '../dictionary.js';
import Timer from './Timer.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      words: [],
      time: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWord = this.addWord.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
  }

  addWord() {
    var newWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    this.setState({
      words: [...this.state.words, newWord]
    });
  }

  stopGame(intervals) {
    intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.setState({
      words: [],
      time: 0,
    })
  }

  startGame() {
    var timeInterval = setInterval(() => {
      var currentTime = this.state.time;
      currentTime++;
      this.setState({
        time: currentTime,
      })
    }, 1000);
    
    var wordInterval = setInterval(() => {
      this.addWord();
      if (this.state.words.length >= 16) {
        this.stopGame([timeInterval, wordInterval]);
      }
    }, 1000); 
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var index = this.state.words.indexOf(this.state.userInput);
    
    if (index !== -1) {
      var newWords = this.state.words.slice();
      newWords.splice(index, 1);
      this.setState({
        userInput: '',
        words: newWords,
      })
    }
  }

  render() {
    return (
      <div className="game">
        <Timer time={this.state.time} startGame={this.startGame}/>
        <div className="wall"></div>
        <div className="play">
          <div className="gudetama"></div>
          {this.state.words.map((word, index) => {
            return <Brick word={word} key={index} />
          })}
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.userInput} onChange={this.handleChange} />
          </form>
        </div>
      </div>
    )
  }
}

export default Game;