-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if exists movies;
DROP TABLE if exists athletes;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    director VARCHAR NOT NULL,
    genre VARCHAR NOT NULL
);

INSERT INTO movies (name, director, genre) VALUES
('Blade Runner', 'Ridley Scott', 'Science Fiction'),
('Fight Club', 'David Fincher', 'psychological action drama'),
('Remember the Titans', 'Boaz Yakin', 'Sports')

CREATE TABLE athletes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    team VARCHAR NOT NULL,
    sport VARCHAR NOT NULL
);

INSERT INTO athletes (name, team, sport) VALUES
('Ricky Lightfoot', 'Wales', 'man vs horse racing'),
('Chrissy Quaid', 'USA', 'extreme ironing'),
('Morgan Johnson', 'USA', 'chess boxing')