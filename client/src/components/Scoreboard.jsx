import React from 'react';
import axios from 'axios';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highscore: []
    } 
    this.updateScoreboard = this.updateScoreboard.bind(this);
  }
 
  
  componentDidMount() {
    this.updateScoreboard(); 
  }

  updateScoreboard () {
  	axios.get("/wordgame")
  	.then((results) => {
      console.log('what is results', results);
  		this.setState({
  			highscore: results.data
  		});
    }
  	)
  }

  render() {
  	return (
      <div className="scoreboard">
        <h2 className="sbHeader">High Scores</h2>
        {this.state.highscore.map((score, index) => 
          <div key={index}>  
            <ul className="sbColumn">{score.username}</ul>
            <ul className="sbColumn">{score.high_score}</ul>
          </div>
        )} 
      </div>
  	) 
  	 
  }

} 

export default Scoreboard;