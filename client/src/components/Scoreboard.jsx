import React from 'react';
import axios from 'axios'

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	highscore:[{username: "Scott", score: 1000}, {username: "Lina", score: 900}, {username: "Koichi", score: 800} ]
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
        <p>Scoreboard</p>
        {this.state.highscore.map((score) => 
        <div>  
          <ul>{score.username}</ul>
          <ul>{score.score}</ul>
        </div>
        )} 
      </div>
  	) 
  	 
  }

} 

export default Scoreboard;