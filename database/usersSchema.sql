DROP DATABASE humptydumpty IF EXISTS;

CREATE DATABASE humptydumpty;

CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  username VARCHAR(100),
  high_score INTEGER
);