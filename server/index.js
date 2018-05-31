var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var {retrieveUsers, addUserOrUpdateScore, get1000Words} = require('../database/index.js');

var app = express(); 

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

// querying all users from the database 
app.get('/wordgame', (req, res) => { 
  retrieveUsers((data) => {
    res.send(data);
  });
});

// at end of game, get a username and high score, add to or update db
app.post('/wordgame', (req,res) => {
  addUserOrUpdateScore(req.body, function(results) {
    res.status(201).send(results);
  });
});

app.get('/dictionary', (req, res) => {
  get1000Words(results => {
    res.send(results);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
