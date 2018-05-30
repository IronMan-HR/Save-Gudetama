const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

//FUNCTIONS TO INTERACT WITH DATABASE GO HERE:

//function to add new user
const addUser = function(user, callback) {
  let queryStr = `INSERT INTO users VALUES (${user.id}, '${user.username}', ${0})`;
  connection.query(queryStr, (err, data) => {
    if(err) console.log('error adding user into DB', err);
    callback(data);
  });
};

//function to retrieve all users
const retrieveUsers = function(callback) {
  let queryStr = `SELECT * FROM users`;
  connection.query(queryStr, (err, data) => {
    if(err) console.log('error retrieving users from DB', err);
    callback(data);
  });
};


//export all database functions here 
module.exports = {
  addUser,
  retrieveUsers
};