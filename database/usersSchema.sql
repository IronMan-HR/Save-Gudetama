DROP DATABASE IF EXISTS humptydumpty;

CREATE DATABASE humptydumpty;

USE humptydumpty;

CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  username VARCHAR(100),
  high_score INTEGER
);