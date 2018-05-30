const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'password', 
  database: 'humptydumpty'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//FUNCTIONS TO INTERACT WITH DATABASE GO HERE:

//function to retrieve all users
const retrieveUsers = function(callback) {
  let queryStr = `SELECT * FROM users`;
  connection.query(queryStr, (err, data) => {
    if(err) console.log('DB: error retrieving users', err);
    callback(data);
  });
};

//function to retrieve high score for a certain user
const retrieveHighScore = function(user, callback) {
  let queryStr = `SELECT high_score FROM users WHERE username = '${user.username}'`;
  connection.query(queryStr, (err, data) => {
    if(err) console.log('DB: error retrieving high score for a certain user', err);
    callback(data);
  });
};

//function to update high score for a certain user
const addHighScore = function(userWithScore, callback) {
  let queryStr = `REPLACE INTO users VALUES (${userWithScore.id}, '${userWithScore.username}', ${userWithScore.high_score}) `;
  connection.query(queryStr, (err, data) => {
    if(err) console.log('error adding high score into DB', err);
    callback(data);
  });
};

// addHighScore({id: 10, username: 'egg', high_score: 99}, (data) => {console.log(data)}), 
// addHighScore({id: 11, username: 'gudetama', high_score: 99999}, (data) => {console.log(data)})

//export all database functions here 
module.exports = {
  retrieveUsers,
  retrieveHighScore,
  addHighScore
};