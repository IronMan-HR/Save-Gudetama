var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var {retrieveUsers, retrieveHighScore, updateHighScore} = require('../database/index.js');

var app = express(); 

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/wordgame', (req, res) => {
  //need model for querying data from the database 
  retrieveUsers((data) => {
    res.send(data);
  });
});

app.post('/wordgame', (req,res) => { 
  //need model for adding username and score to the database 
  updateHighScore(req.body);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
