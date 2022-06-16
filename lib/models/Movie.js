const pool = require('../utils/pool');

class Movie {
  id;
  name;
  director;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.id;
    this.director = row.director;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows;
  }
}

module.exports = { Movie };
