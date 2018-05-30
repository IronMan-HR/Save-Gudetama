import React from 'react';
import axios from 'axios'

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  //this.updateScoreboard = this.updateScoreboard.bind(this)
  }
 
  /*
  componentDidMount() {
    this.updateScoreboard(); 
  }*/

  /*
  updateScoreboard () {
  	app.get("/wordgame")
  	.then((results) => 
  		this.setState({
  			highscore: results 
  		})
  	)
  }*/

  render() {
  	return (
      <div className="scoreboard">
        <h2 className="sbHeader">High Scores</h2>
        {this.props.scores.map((score, index) => 
        <div key={index}>  
          <ul className="sbColumn">{score.username}</ul>
          <ul className="sbColumn">{score.score}</ul>
        </div>
        )} 
      </div>
  	) 
  	 
  }

} 

export default Scoreboard;