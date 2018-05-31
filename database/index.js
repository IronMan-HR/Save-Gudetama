const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'humptydumpty'
});

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected!");
  }
});

//FUNCTIONS TO INTERACT WITH DATABASE GO HERE:

//function to retrieve all users
const retrieveUsers = function(callback) {
  let queryStr = `SELECT * FROM users ORDER BY high_score DESC`;
  connection.query(queryStr, (err, data) => {
    if (err) {
      console.log('DB: error retrieving users', err);
    } else {
      callback(data);
    } 
  });
};

//function to retrieve high score for a certain user
// const retrieveHighScore = function(user, callback) {
//   let queryStr = `SELECT high_score FROM users WHERE username = '${user.username}'`;
//   connection.query(queryStr, (err, data) => {
//     if(err) console.log('DB: error retrieving high score for a certain user', err);
//     callback(data);
//   });
// };

//function to check if a user has played before, and add or update accordingly
const addUserOrUpdateScore = function(userWithScore, callback) {
  let queryStr = `SELECT * FROM users WHERE username = '${userWithScore.username}'`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      console.error('error retrieving user from database', err);
    } else {
      if (result.length === 0) {
        // this is if it's a new player
        let queryStr2 = `INSERT INTO users (username, high_score) VALUES ('${userWithScore.username}', ${userWithScore.high_score})`;
        connection.query(queryStr2, (err) => {
          if (err) {
            console.error('error inserting high score into DB', err);
          } else {
            callback('inserted user into db');
          }
        });
      } else {
        // this is if the player has previously played the game.
        // only update if they beat their personal best
        let queryStr3 = `UPDATE users SET high_score = ${userWithScore.high_score} WHERE username='${userWithScore.username}' AND high_score < ${userWithScore.high_score}`;
        connection.query(queryStr3, (err, result) => {
          console.log('update result is', result);
          if (err) {
            console.error('error updating high score', err);
          } else if (result.changedRows === 0) {
            callback('checked, but didnt beat personal best');
          } else {
            callback('updated high score');
          }
        });
      }
    }
  })  
}

// Below are tests to make sure database is working:
//addUserOrUpdateScore({username: 'scott', high_score: 200});
//addUserOrUpdateScore({username: 'egg', high_score: 99});
//addUserOrUpdateScore({username: 'gudetama', high_score: 1000000});
//retrieveUsers(results => {console.log(results)});

//export all database functions here 
module.exports = {
  retrieveUsers,
  addUserOrUpdateScore,
};