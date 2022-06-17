-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if exists movies;
DROP TABLE if exists athletes;
DROP TABLE if exists games;
DROP TABLE if exists turtles;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    director VARCHAR NOT NULL,
    genre VARCHAR NOT NULL
);

INSERT INTO movies (name, director, genre) VALUES
('Blade Runner', 'Ridley Scott', 'Science Fiction'),
('Fight Club', 'David Fincher', 'psychological action drama'),
('Remember the Titans', 'Boaz Yakin', 'Sports');

CREATE TABLE athletes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    team VARCHAR NOT NULL,
    sport VARCHAR NOT NULL
);

INSERT INTO athletes (name, team, sport) VALUES
('Ricky Lightfoot', 'Wales', 'man vs horse racing'),
('Chrissy Quaid', 'USA', 'extreme ironing'),
('Morgan Johnson', 'USA', 'chess boxing');

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    players INT NOT NULL,
    genre VARCHAR NOT NULL
);

INSERT INTO games (name, players, genre) VALUES
('tic tac toe', 2, 'paper and pencil'),
('connect four', 2, 'board game'),
('battleship', 2, 'board game');

CREATE TABLE turtles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    weapon VARCHAR NOT NULL,
);

INSERT INTO turtles (name, color, weapon) VALUES
('Leonardo', 'blue', 'two katanas'),
('Donatello', 'purple', 'staff'),
('Michelangelo', 'orange', 'two nunchaks'),
('Raphael', 'red', 'two sais');