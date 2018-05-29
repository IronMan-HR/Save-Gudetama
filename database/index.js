const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

//FUNCTIONS TO INTERACT WITH DATABASE GO HERE:

//function to add new user
const addUser = function(user, callback) {
  
}


//function to retrieve all users





module.exports = {
  //export all database functions here 
  addUser,
  retrieveUsers
};