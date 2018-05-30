const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
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
const updateHighScore = function(userWithScore) {
  let queryStr = `SELECT * FROM users WHERE username = '${userWithScore.username}'`;
  connection.query(queryStr, (err, result) => {
    if(err) console.log('error')
    else {
      if (!result.length) {
       //this is if it's a new player
       let queryStr2 = `INSERT INTO users (username, high_score) VALUES ('${userWithScore.username}', ${userWithScore.high_score})`;
       connection.query(queryStr2, (err) => {
         if(err) console.log('error inserting high score into DB', err);
       })
      } else {
       //this is if the player has previously played the game 
       let queryStr3 = `UPDATE users SET high_score = ${userWithScore.high_score} WHERE username='${userWithScore.username}' AND high_score < ${userWithScore.high_score}`;
       connection.query(queryStr3, (err) => {
         if(err) console.log('error updating high score', err);
       });
      }
    }
  })  
}

// Below are tests to make sure database is working:
// addHighScore({id: 10, username: 'egg', high_score: 99}, (data) => {console.log(data)}), 
// addHighScore({id: 11, username: 'gudetama', high_score: 99999}, (data) => {console.log(data)})
// updateHighScore({id: 11, username: 'gudetama', high_score: 1000000});
// updateHighScore({username: 'gudetamamama', high_score: 780});


//export all database functions here 
module.exports = {
  retrieveUsers,
  retrieveHighScore,
  updateHighScore
};