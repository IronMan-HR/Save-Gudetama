var express = require('express');
var bodyParser = require('body-parser')
var axios = require('axios')

var app = express(); 

app.use(express.static(__dirname + '/../client/dist'));

app.get('/wordgame', (req, res) => {
  //need model for querying data from the database 
  //
  res.send('Obtained!')
});

app.post('/wordgame', (req,res) => { 
  //need model for adding username and score to the database 
  res.send('Updated')

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
