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

// get words from dictionary, send back to client
app.get('/dictionary', (req, res) => {
  get1000Words(results => {
    res.send(results);
  });
});

var port = process.env.PORT || 5000;

var server = app.listen(port, function() {
  console.log('listening on port 5000!');
});

var io = require('socket.io')(server);

var rooms = {};

io.on('connection', (socket) => { 
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('entering room', function(data) {
    socket.join(data.room);
    rooms[data.room] = {};
  });

  socket.on('leaving room', (data) => {
    socket.leave(data.room);
    delete rooms[data.room];
  });

  socket.on('ready', (data) => {
    rooms[data.room][data.username] = true;
    if (Object.keys(rooms[data.room]).length === 2) {
      io.in(data.room).emit('startGame');
    }
  });

  socket.on('i lost', (data) => {
    socket.broadcast.to(data.room).emit('they lost');
    delete rooms[data.room][data.username];
  });

  socket.on('send words to opponent', function(data) {
    socket.broadcast.to(data.room).emit('receive words from opponent', data.newWords);
  });
});
