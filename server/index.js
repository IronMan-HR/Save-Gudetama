var express = require('express');
var bodyParser = require('body-parser')
var axios = require('axios')
var {retrieveUsers, addHighScore} = require('../database/index.js')

var app = express(); 

app.use(express.static(__dirname + '/../client/dist'));

app.get('/wordgame', (req, res) => {
  //need model for querying data from the database 
  retrieveUsers((data) => {
    console.log('get request :', data);
    res.send(data);
  });
});

app.post('/wordgame', (req,res) => { 
  //need model for adding username and score to the database 
  addHighScore(req.body);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
